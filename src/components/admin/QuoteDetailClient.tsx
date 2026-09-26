"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase-browser";

const STATUS_OPTIONS = ["New", "Reviewing", "Contacted", "Quoted", "Approved", "Completed", "Cancelled"];

export default function QuoteDetailClient({ quote }: { quote: any }) {
    const router = useRouter();
    const supabase = createClient();
    const [status, setStatus] = useState(quote.status);
    const [saving, setSaving] = useState(false);

    const handleStatusChange = async (newStatus: string) => {
        setStatus(newStatus);
        setSaving(true);
        await supabase.from("quote_requests").update({ status: newStatus }).eq("id", quote.id);
        setSaving(false);
        router.refresh();
    };

    const Row = ({ label, value }: { label: string; value?: string | null }) =>
        value ? (
            <div className="flex gap-2 text-sm py-2 border-b border-eminence-gray-100">
                <span className="font-medium text-eminence-black w-40 shrink-0">{label}</span>
                <span className="text-eminence-gray-600">{value}</span>
            </div>
        ) : null;

    return (
        <div className="max-w-3xl">
            <Link href="/admin/quotes" className="text-sm text-eminence-gray-600 hover:text-eminence-gold mb-6 inline-block">
                ← All Quote Requests
            </Link>

            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-heading font-bold text-eminence-black">{quote.full_name}</h1>
                <select
                    value={status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    disabled={saving}
                    className="border border-eminence-gray-200 px-4 py-2 text-sm focus:outline-none focus:border-eminence-gold bg-white"
                >
                    {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
            </div>

            <div className="bg-white border border-eminence-gold/15 p-6 mb-6">
                <h2 className="font-heading font-semibold text-eminence-black mb-3">Customer</h2>
                <Row label="Name" value={quote.full_name} />
                <Row label="WhatsApp" value={quote.whatsapp} />
                <Row label="Email" value={quote.email} />
                <Row label="Preferred Contact" value={quote.preferred_contact} />
                <Row label="Existing Customer" value={quote.existing_customer} />
                <Row label="Customer Type" value={quote.customer_type} />
            </div>

            <div className="bg-white border border-eminence-gold/15 p-6 mb-6">
                <h2 className="font-heading font-semibold text-eminence-black mb-3">Property</h2>
                <Row label="Type" value={quote.property_type} />
                <Row label="Location" value={quote.location} />
                <Row label="Postal Code" value={quote.postal_code} />
                <Row label="Size" value={quote.property_size} />
                <Row label="Bedrooms" value={quote.bedrooms} />
                <Row label="Bathrooms" value={quote.bathrooms} />
            </div>

            <div className="bg-white border border-eminence-gold/15 p-6 mb-6">
                <h2 className="font-heading font-semibold text-eminence-black mb-3">Service Details</h2>
                <Row label="Services" value={quote.services?.join(", ")} />
                <Row label="Add-ons" value={quote.add_ons?.join(", ")} />
                <Row label="Condition" value={quote.condition} />
                <Row label="Challenges" value={quote.challenges?.join(", ")} />
                <Row label="Frequency" value={quote.frequency} />
            </div>

            <div className="bg-white border border-eminence-gold/15 p-6 mb-6">
                <h2 className="font-heading font-semibold text-eminence-black mb-3">Scheduling</h2>
                <Row label="Preferred Date" value={quote.preferred_date} />
                <Row label="Preferred Time" value={quote.preferred_time} />
                <Row label="Alternative Date" value={quote.alternative_date} />
                <Row label="Flexibility" value={quote.flexibility} />
                <Row label="Urgency" value={quote.urgency} />
            </div>

            <div className="bg-white border border-eminence-gold/15 p-6 mb-6">
                <h2 className="font-heading font-semibold text-eminence-black mb-3">Access</h2>
                <Row label="Contact Person" value={quote.contact_person} />
                <Row label="Access Details" value={quote.access_details} />
                <Row label="Pets" value={quote.pets} />
                <Row label="Notes" value={quote.notes} />
            </div>

            {quote.photos?.length > 0 && (
                <div className="bg-white border border-eminence-gold/15 p-6">
                    <h2 className="font-heading font-semibold text-eminence-black mb-4">Photos</h2>
                    <div className="grid grid-cols-3 gap-3">
                        {quote.photos.map((url: string) => (
                            <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="relative aspect-square bg-eminence-gray-100">
                                <Image src={url} alt="Quote photo" fill className="object-cover" />
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}