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

        await resend.emails.send({
            from: "Eminence Website <onboarding@resend.dev>",
            to: "info@eminencecleanin.com",
            subject: `New Quote Request from ${data.fullName}`,
            text: summary,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Email send failed:", error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}