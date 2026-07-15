import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: NextRequest) {
  let body: ContactPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, message } = body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Required fields are missing" }, { status: 422 });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 422 });
  }

  // TODO: integrate an email service here (e.g. Resend, Nodemailer, SendGrid)
  // Example with Resend:
  //   await resend.emails.send({
  //     from: "website@pgpr.tech",
  //     to: "contact@pgpr.tech",
  //     subject: `Contact form from ${name}`,
  //     text: `From: ${name} <${email}>\n\n${message}`,
  //   });

  console.log("[contact form]", {
    name,
    email,
    message,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ success: true });
}
