import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO) {
      return NextResponse.json(
        {
          ok: false,
          error: "Missing server env vars (RESEND_API_KEY, CONTACT_TO).",
        },
        { status: 500 }
      );
    }

    const data = await req.json();
    const {
      honeypot,
      name,
      email,
      phone,
      address,
      addressLine1,
      placeCity,
      placeRegion,
      placePostcode,
      placeCountry,
      lat,
      lng,
      projectType,
      startDate,
      budget,
      source,
      message,
    } = data || {};

    if (honeypot) return NextResponse.json({ ok: true });

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields: name, email, message." },
        { status: 400 }
      );
    }

    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial;line-height:1.6;">
        <h2>New Cabinetry Quote Request</h2>

        <h3>Contact</h3>
        <p><strong>Name:</strong> ${esc(name)}</p>
        <p><strong>Email:</strong> ${esc(email)}</p>
        <p><strong>Phone:</strong> ${esc(phone || "(not provided)")}</p>

        <h3>Project</h3>
        <p><strong>Address (formatted):</strong> ${esc(
          address || "(not provided)"
        )}</p>
        ${
          addressLine1 ||
          placeCity ||
          placeRegion ||
          placePostcode ||
          placeCountry
            ? `<p><strong>Street:</strong> ${esc(addressLine1 || "")}<br/>
               <strong>City/State/ZIP:</strong> ${esc(placeCity || "")}, ${esc(
                placeRegion || ""
              )} ${esc(placePostcode || "")}<br/>
               <strong>Country:</strong> ${esc(placeCountry || "")}</p>`
            : ""
        }
        ${
          lat || lng
            ? `<p><strong>Coords:</strong> ${esc(lat || "")}, ${esc(
                lng || ""
              )}</p>`
            : ""
        }
        <p><strong>Type:</strong> ${esc(projectType || "(not set)")}</p>
        <p><strong>Desired Start:</strong> ${esc(startDate || "(not set)")}</p>
        <p><strong>Budget:</strong> ${esc(budget || "(not set)")}</p>
        <p><strong>Heard Via:</strong> ${esc(source || "(not set)")}</p>

        <h3>Details</h3>
        <p>${esc(message || "").replace(/\n/g, "<br/>")}</p>
      </div>
    `;

    const subject = ["Quote Request", name, projectType, placeCity]
      .filter(Boolean)
      .join(" – ");

    const { data: sendData, error } = await resend.emails.send({
      from: "Dezenio Cabinetry <info@dezeniocabinetry.com>",
      to: process.env.CONTACT_TO as string,
      replyTo: email,
      subject,
      html,
      text: strip(html),
    });

    // 📜 Debug logs
    console.log("---- RESEND RESPONSE ----");
    console.log("Send Data:", sendData);
    console.log("Error:", error);
    console.log("-------------------------");

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        {
          ok: false,
          error: `Email provider error: ${error.message || "Unknown"}`,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Quote form error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to send email." },
      { status: 500 }
    );
  }
}

// Helpers
function esc(s: string) {
  return String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      }[c]!)
  );
}

function strip(html: string) {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/\s+\n/g, "\n")
    .trim();
}

// 🔍 DEBUG ROUTE — visit /api/quote in browser
export async function GET() {
  const key = process.env.RESEND_API_KEY || "";
  return NextResponse.json({
    ok: true,
    hasKey: !!key,
    keyPrefix: key.slice(0, 3), // should be "re_"
    keyLen: key.length,
    to: process.env.CONTACT_TO || null,
  });
}
