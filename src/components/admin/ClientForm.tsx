"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import ImageUpload from "./ImageUpload";

interface ExistingClient {
    id: string;
    name: string;
    logo: string | null;
    display_order: number;
    published: boolean;
}

export default function ClientForm({ existingClient }: { existingClient?: ExistingClient }) {
    const router = useRouter();
    const supabase = createClient();
    const isEditing = !!existingClient;

    const [name, setName] = useState(existingClient?.name ?? "");
    const [logo, setLogo] = useState(existingClient?.logo ?? "");
    const [displayOrder, setDisplayOrder] = useState(existingClient?.display_order ?? 0);
    const [published, setPublished] = useState(existingClient?.published ?? true);

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSaving(true);

        const payload = {
            name,
            logo: logo.trim() === "" ? null : logo,
            display_order: displayOrder,
            published,
        };

        const { error } = isEditing
            ? await supabase.from("clients").update(payload).eq("id", existingClient!.id)
            : await supabase.from("clients").insert(payload);

        setSaving(false);

        if (error) {
            setError(error.message);
            return;
        }

        router.push("/admin/clients");
        router.refresh();
    };

    const handleDelete = async () => {
        if (!existingClient) return;
        if (!confirm(`Delete "${existingClient.name}"?`)) return;

        const { error } = await supabase.from("clients").delete().eq("id", existingClient.id);
        if (error) {
            setError(error.message);
            return;
        }
        router.push("/admin/clients");
        router.refresh();
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
            <div className="bg-white border border-eminence-gold/15 p-6 space-y-4">
                <div>
                    <label className="block text-xs font-medium text-eminence-gray-600 mb-1.5">Client Name</label>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-eminence-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-eminence-gold"
                    />
                </div>

                <ImageUpload label="Logo (optional — falls back to text if empty)" value={logo} onChange={setLogo} />

                <div>
                    <label className="block text-xs font-medium text-eminence-gray-600 mb-1.5">Display Order</label>
                    <input
                        type="number"
                        value={displayOrder}
                        onChange={(e) => setDisplayOrder(Number(e.target.value))}
                        className="w-full border border-eminence-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-eminence-gold"
                    />
                </div>

                <label className="flex items-center gap-2 text-sm text-eminence-black">
                    <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
                    Published
                </label>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex items-center justify-between">
                <button type="submit" disabled={saving} className="btn-gold disabled:opacity-60">
                    {saving ? "Saving..." : isEditing ? "Save Changes" : "Add Client"}
                </button>
                {isEditing && (
                    <button type="button" onClick={handleDelete} className="text-sm text-red-600 hover:text-red-700 transition-colors">
                        Delete
                    </button>
                )}
            </div>
        </form>
    );
}