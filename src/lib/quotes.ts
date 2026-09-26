import { supabase } from "@/lib/supabase";
import { QuoteFormData } from "@/types/quote";

export async function submitQuoteRequest(data: QuoteFormData) {
    const payload = {
        full_name: data.fullName,
        whatsapp: data.whatsapp,
        email: data.email || null,
        preferred_contact: data.preferredContact,
        existing_customer: data.existingCustomer,
        customer_type: data.customerType,
        property_type: data.propertyType,
        location: data.location,
        postal_code: data.postalCode || null,
        property_size: data.propertySize || null,
        bedrooms: data.bedrooms || null,
        bathrooms: data.bathrooms || null,
        services: data.services,
        add_ons: data.addOns,
        frequency: data.frequency || null,
        condition: data.condition || null,
        challenges: data.challenges,
        photos: data.photos,
        preferred_date: data.preferredDate || null,
        preferred_time: data.preferredTime || null,
        alternative_date: data.alternativeDate || null,
        flexibility: data.flexibility || null,
        urgency: data.urgency || null,
        contact_person: data.contactPerson || null,
        access_details: data.accessDetails || null,
        pets: data.pets || null,
        notes: data.notes || null,
    };

    return supabase.from("quote_requests").insert(payload);
}

export async function uploadQuotePhoto(file: File): Promise<string | null> {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

    const { error } = await supabase.storage.from("quote-photos").upload(fileName, file);
    if (error) {
        console.error("Photo upload failed:", error.message);
        return null;
    }

    const { data } = supabase.storage.from("quote-photos").getPublicUrl(fileName);
    return data.publicUrl;
}