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
    if (!rateLimit(ip)) {
      return NextResponse.json(
        { error: "Trop de requêtes. Réessayez dans une minute." },
        { status: 429 },
      );
    }

    const body: unknown = await request.json();

    const result = devisSchema.safeParse(body);
    if (!result.success) {
      const messages = result.error.issues.map((i) => i.message).join(", ");
      return NextResponse.json(
        { error: `Validation : ${messages}` },
        { status: 400 },
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

    const emailBody = `Nouvelle demande de devis sur ricoune.com

Nom: ${nom} ${prenom}
Email: ${email}
Telephone: ${telephone || "Non renseigne"}
Type d'evenement: ${type_evenement || "Non renseigne"}
Date souhaitee: ${date_souhaitee || "Non renseignee"}
Lieu: ${lieu || "Non renseigne"}
Formule: ${formule || "Non renseignee"}

Message:
${message || "Aucun message"}`;

    if (!process.env.RESEND_API_KEY) {
      console.error("[API /devis] RESEND_API_KEY missing");
      return NextResponse.json(
        { error: "Erreur de configuration serveur." },
        { status: 500 },
      );
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Site Ricoune <noreply@ricoune.com>",
        to: "contact@ricoune.fr",
        subject: `[Demande de Devis] ${nom} ${prenom} - ${type_evenement || "Evenement"}`,
        text: emailBody,
        reply_to: email,
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.error("[API /devis] Resend error:", res.status, errBody);
      return NextResponse.json(
        { error: "Erreur d'envoi. Veuillez reessayer." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(
      "[API /devis] Unexpected error:",
      (err as Error).message,
    );
    return NextResponse.json(
      { error: "Erreur serveur. Veuillez reessayer." },
      { status: 500 },
    );
  }
}
