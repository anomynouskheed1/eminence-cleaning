import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        const summary = `
New Quote Request

Name: ${data.fullName}
WhatsApp: ${data.whatsapp}
Email: ${data.email || "Not provided"}
Preferred Contact: ${data.preferredContact}
Existing Customer: ${data.existingCustomer}
Customer Type: ${data.customerType}

Property: ${data.propertyType} in ${data.location}
Size: ${data.propertySize || "Not specified"}
${data.bedrooms ? `Bedrooms: ${data.bedrooms}, Bathrooms: ${data.bathrooms}` : ""}

Services: ${data.services.join(", ") || "None specified"}
Add-ons: ${data.addOns.join(", ") || "None"}
Condition: ${data.condition || "Not specified"}
Challenges: ${data.challenges.join(", ") || "None"}
${data.frequency ? `Frequency: ${data.frequency}` : ""}

Preferred Date: ${data.preferredDate || "Not specified"} ${data.preferredTime || ""}
Alternative Date: ${data.alternativeDate || "None"}
Flexibility: ${data.flexibility || "Not specified"}
Urgency: ${data.urgency || "Not specified"}

Contact Person On Site: ${data.contactPerson || "Not specified"}
Access Details: ${data.accessDetails || "None"}
Pets: ${data.pets || "Not specified"}
Notes: ${data.notes || "None"}

Photos uploaded: ${data.photos.length}
${data.photos.length > 0 ? data.photos.join("\n") : ""}
    `.trim();

        // 1. Notify Eminence's team — always sent
        await resend.emails.send({
            from: "Eminence Website <quotes@eminencecleanin.com>",
            to: "info@eminencecleanin.com",
            subject: `New Quote Request from ${data.fullName}`,
            text: summary,
        });

        // 2. Auto-confirmation to the customer — only if they provided an email
        if (data.email) {
            await resend.emails.send({
                from: "Eminence Cleaning Company <quotes@eminencecleanin.com>",
                to: data.email,
                subject: "We've received your quote request",
                html: `
          <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; color: #0A0A0A;">
            <h2 style="color: #0A0A0A;">Hi ${data.fullName.split(" ")[0]},</h2>
            <p style="line-height: 1.6; color: #5C5C58;">
              Thank you for reaching out to <strong>Eminence Cleaning Company</strong>.
              We've received your quote request for <strong>${data.services.join(", ") || "your cleaning service"}</strong>
              at <strong>${data.location}</strong>.
            </p>
            <p style="line-height: 1.6; color: #5C5C58;">
              This is a quote request, not a confirmed booking. Our team will review the
              details you provided and get in touch with you via
              <strong>${data.preferredContact}</strong> to discuss pricing and scheduling.
            </p>
            <p style="line-height: 1.6; color: #5C5C58;">
              If you need to reach us sooner, feel free to message us directly on
              WhatsApp at <a href="https://wa.me/254717803558" style="color: #B8935A;">+254 717 803 558</a>.
            </p>
            <p style="margin-top: 32px; color: #5C5C58;">
              Warm regards,<br/>
              <strong style="color: #0A0A0A;">Eminence Cleaning Company</strong><br/>
              <span style="font-size: 12px; color: #8F6E3F;">Where Cleanliness Meets Class</span>
            </p>
          </div>
        `,
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Email send failed:", error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}