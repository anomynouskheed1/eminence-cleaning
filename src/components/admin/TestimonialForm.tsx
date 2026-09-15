"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import ImageUpload from "./ImageUpload";

interface ExistingTestimonial {
    id: string;
    quote: string;
    author: string | null;
    role: string | null;
    avatar: string | null;
    display_order: number;
    published: boolean;
}

export default function TestimonialForm({ existingTestimonial }: { existingTestimonial?: ExistingTestimonial }) {
    const router = useRouter();
    const supabase = createClient();
    const isEditing = !!existingTestimonial;

    const [quote, setQuote] = useState(existingTestimonial?.quote ?? "");
    const [author, setAuthor] = useState(existingTestimonial?.author ?? "");
    const [role, setRole] = useState(existingTestimonial?.role ?? "");
    const [avatar, setAvatar] = useState(existingTestimonial?.avatar ?? "");
    const [displayOrder, setDisplayOrder] = useState(existingTestimonial?.display_order ?? 0);
    const [published, setPublished] = useState(existingTestimonial?.published ?? true);

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSaving(true);

        const payload = {
            quote,
            author: author.trim() === "" ? null : author,
            role: role.trim() === "" ? null : role,
            avatar: avatar.trim() === "" ? null : avatar,
            display_order: displayOrder,
            published,
        };

        const { error } = isEditing
            ? await supabase.from("testimonials").update(payload).eq("id", existingTestimonial!.id)
            : await supabase.from("testimonials").insert(payload);

        setSaving(false);

        if (error) {
            setError(error.message);
            return;
        }

        router.push("/admin/testimonials");
        router.refresh();
    };

    const handleDelete = async () => {
        if (!existingTestimonial) return;
        if (!confirm("Delete this testimonial?")) return;

        const { error } = await supabase.from("testimonials").delete().eq("id", existingTestimonial.id);
        if (error) {
            setError(error.message);
            return;
        }
        router.push("/admin/testimonials");
        router.refresh();
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
            <div className="bg-white border border-eminence-gold/15 p-6 space-y-4">
                <div>
                    <label className="block text-xs font-medium text-eminence-gray-600 mb-1.5">Quote</label>
                    <textarea
                        required
                        rows={4}
                        value={quote}
                        onChange={(e) => setQuote(e.target.value)}
                        className="w-full border border-eminence-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-eminence-gold"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-eminence-gray-600 mb-1.5">
                        Author Name (optional — only include if the client has given permission)
                    </label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="w-full border border-eminence-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-eminence-gold"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-eminence-gray-600 mb-1.5">
                        Role / Company (optional)
                    </label>
                    <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full border border-eminence-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-eminence-gold"
                    />
                </div>

                <ImageUpload label="Avatar (optional)" value={avatar} onChange={setAvatar} />

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
                    {saving ? "Saving..." : isEditing ? "Save Changes" : "Add Testimonial"}
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