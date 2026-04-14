import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { rateLimit } from "@/lib/rate-limit";
import { contactSchema } from "@/lib/validations/contact";

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

    const result = contactSchema.safeParse(body);
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
      ville,
      message,
    } = result.data;

    const subject = `[Contact] ${nom} ${prenom} - ${type_evenement || "General"}`;

    const emailLines = [
      "Nouveau message de contact sur ricoune.com",
      "",
      `Nom : ${nom} ${prenom}`,
      `Email : ${email}`,
    ];
    if (telephone) emailLines.push(`Telephone : ${telephone}`);
    if (type_evenement)
      emailLines.push(`Type d'evenement : ${type_evenement}`);
    if (date_souhaitee) emailLines.push(`Date souhaitee : ${date_souhaitee}`);
    if (ville) emailLines.push(`Ville / Lieu : ${ville}`);
    emailLines.push("", "Message :", message);

    const emailBody = emailLines.join("\n");

    if (!process.env.RESEND_API_KEY) {
      console.error("[API /contact] RESEND_API_KEY missing");
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
        to: "ricouneofficiel@gmail.com",
        subject,
        text: emailBody,
        reply_to: email,
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.error("[API /contact] Resend error:", res.status, errBody);
      return NextResponse.json(
        { error: "Erreur d'envoi. Veuillez reessayer." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(
      "[API /contact] Unexpected error:",
      (err as Error).message,
    );
    return NextResponse.json(
      { error: "Erreur serveur. Veuillez reessayer." },
      { status: 500 },
    );
  }
}
