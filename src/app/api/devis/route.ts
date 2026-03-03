import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nom, prenom, email, telephone, type_evenement, date_souhaitee, lieu, formule, message } = body;

    if (!nom || !prenom || !email) {
      return NextResponse.json(
        { error: "Nom, prénom et email sont requis." },
        { status: 400 }
      );
    }

    // Save to Supabase (if configured)
    if (supabase) {
      const { error: dbError } = await supabase
        .from("devis_requests")
        .insert({
          nom,
          prenom,
          email,
          telephone,
          type_evenement,
          date_souhaitee: date_souhaitee || null,
          lieu,
          formule,
          message,
        });

      if (dbError) {
        console.error("Supabase error:", dbError);
      }
    }

    // Send email notification
    const emailBody = `
Nouvelle demande de devis sur ricoune.com

Nom: ${nom} ${prenom}
Email: ${email}
Telephone: ${telephone || "Non renseigné"}
Type d'événement: ${type_evenement || "Non renseigné"}
Date souhaitée: ${date_souhaitee || "Non renseignée"}
Lieu: ${lieu || "Non renseigné"}
Formule: ${formule || "Non renseignée"}

Message:
${message || "Aucun message"}
    `.trim();

    if (process.env.RESEND_API_KEY) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Site Ricoune <noreply@ricoune.com>",
          to: "contact@ricoune.fr",
          subject: `[Demande de Devis] ${nom} ${prenom} - ${type_evenement || "Événement"}`,
          text: emailBody,
          reply_to: email,
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erreur serveur. Veuillez réessayer." },
      { status: 500 }
    );
  }
}
