import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { rateLimit } from "@/lib/rate-limit";
import { devisSchema } from "@/lib/validations/devis";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const headersList = await headers();
    const ip =
      headersList.get("x-forwarded-for") ||
      headersList.get("x-real-ip") ||
      "unknown";

    if (!rateLimit(ip, 3, 3_600_000)) {
      return NextResponse.json(
        { error: "Trop de requêtes. Réessayez dans une heure." },
        { status: 429 },
      );
    }

    const body = await request.json() as Record<string, unknown>;

    // Honeypot : si le champ "website" est rempli, c'est un bot
    if (body.website) {
      return NextResponse.json({ success: true });
    }

    const result = devisSchema.safeParse(body);
    if (!result.success) {
      const messages = result.error.issues.map((i) => i.message).join(", ");
      return NextResponse.json(
        { error: `Validation : ${messages}` },
        { status: 400 },
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("[API /devis] RESEND_API_KEY missing");
      return NextResponse.json(
        { error: "Erreur de configuration serveur." },
        { status: 500 },
      );
    }

    const {
      nom,
      prenom,
      email,
      telephone,
      type_evenement,
      date_souhaitee,
      lieu,
      formule,
      message,
    } = result.data;

    const subject = `[Site Ricoune] Demande de devis — ${lieu || "lieu non précisé"} — ${date_souhaitee || "date non précisée"}`;

    const row = (label: string, value: string) =>
      `<tr><td style="padding:6px 12px;font-weight:bold;color:#555;white-space:nowrap">${label}</td><td style="padding:6px 12px;color:#222">${value}</td></tr>`;

    const optionalRows = [
      telephone ? row("Téléphone", telephone) : "",
      date_souhaitee ? row("Date souhaitée", date_souhaitee) : "",
      lieu ? row("Lieu / Ville", lieu) : "",
    ].join("");

    const emailHtml = `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><title>${subject}</title></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 0">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.08)">
        <tr><td style="background:#111;padding:24px 32px">
          <h1 style="margin:0;color:#f5c518;font-size:20px;font-family:Arial,sans-serif">Site Ricoune — Demande de devis</h1>
        </td></tr>
        <tr><td style="padding:24px 32px">
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
            ${row("Nom", `${prenom} ${nom}`)}
            ${row("Email", `<a href="mailto:${email}" style="color:#f5c518">${email}</a>`)}
            ${row("Type d'événement", type_evenement)}
            ${row("Formule", formule)}
            ${optionalRows}
          </table>
          <hr style="border:none;border-top:1px solid #eee;margin:24px 0">
          <p style="margin:0 0 8px;font-weight:bold;color:#555">Message :</p>
          <p style="margin:0;color:#222;white-space:pre-wrap;line-height:1.6">${message}</p>
        </td></tr>
        <tr><td style="background:#f9f9f9;padding:16px 32px;font-size:12px;color:#999">
          Pour répondre, cliquez sur "Répondre" — votre message partira directement à ${email}
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

    const contactEmail = process.env.CONTACT_EMAIL ?? "ricouneofficiel@gmail.com";

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Site Ricoune <onboarding@resend.dev>",
        to: contactEmail,
        subject,
        html: emailHtml,
        reply_to: email,
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.error("[API /devis] Resend error:", res.status, errBody);
      return NextResponse.json(
        { error: "Erreur d'envoi. Veuillez réessayer." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[API /devis] Unexpected error:", (err as Error).message);
    return NextResponse.json(
      { error: "Erreur serveur. Veuillez réessayer." },
      { status: 500 },
    );
  }
}
