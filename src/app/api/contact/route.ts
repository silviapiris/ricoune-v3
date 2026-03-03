import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Tous les champs sont requis." },
        { status: 400 }
      );
    }

    // Save to Supabase (if configured)
    if (supabase) {
      const { error: dbError } = await supabase
        .from("contact_messages")
        .insert({ name, email, subject, message });

      if (dbError) {
        console.error("Supabase error:", dbError);
      }
    }

    // Send notification email via Supabase Edge Function or external service
    // For now, we use a simple fetch to a webhook or email API
    const emailBody = `
Nouveau message de contact sur ricoune.com

Nom: ${name}
Email: ${email}
Sujet: ${subject}

Message:
${message}
    `.trim();

    // Send email notification using Resend, SendGrid, or similar
    // This will work when RESEND_API_KEY is configured
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
          subject: `[Contact Site] ${subject}`,
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
