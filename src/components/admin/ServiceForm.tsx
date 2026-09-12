"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import ImageUpload from "./ImageUpload";

interface ProcessStep {
    step: string;
    title: string;
    description: string;
}

interface ExistingService {
    id: string;
    title: string;
    slug: string;
    short_description: string;
    description: string;
    cover_image: string;
    gallery_images: string[];
    included_services: string[];
    why_eminence: string[];
    process_steps: ProcessStep[];
    featured: boolean;
    published: boolean;
}

interface ServiceFormProps {
    existingService?: ExistingService;
}

export default function ServiceForm({ existingService }: ServiceFormProps) {
    const router = useRouter();
    const supabase = createClient();
    const isEditing = !!existingService;

    const [title, setTitle] = useState(existingService?.title ?? "");
    const [slug, setSlug] = useState(existingService?.slug ?? "");
    const [shortDescription, setShortDescription] = useState(existingService?.short_description ?? "");
    const [description, setDescription] = useState(existingService?.description ?? "");
    const [coverImage, setCoverImage] = useState(existingService?.cover_image ?? "");
    const [galleryImages, setGalleryImages] = useState<string[]>(existingService?.gallery_images ?? []);
    const [includedServices, setIncludedServices] = useState<string[]>(existingService?.included_services ?? []);
    const [whyEminence, setWhyEminence] = useState<string[]>(existingService?.why_eminence ?? []);
    const [processSteps, setProcessSteps] = useState<ProcessStep[]>(
        existingService?.process_steps ?? [
            { step: "01", title: "", description: "" },
            { step: "02", title: "", description: "" },
            { step: "03", title: "", description: "" },
            { step: "04", title: "", description: "" },
        ]
    );
    const [featured, setFeatured] = useState(existingService?.featured ?? false);
    const [published, setPublished] = useState(existingService?.published ?? true);

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    // --- List field helpers (gallery, included services, why eminence) ---
    const addListItem = (list: string[], setList: (v: string[]) => void) => setList([...list, ""]);
    const updateListItem = (list: string[], setList: (v: string[]) => void, index: number, value: string) => {
        const next = [...list];
        next[index] = value;
        setList(next);
    };
    const removeListItem = (list: string[], setList: (v: string[]) => void, index: number) => {
        setList(list.filter((_, i) => i !== index));
    };

    // --- Process step helpers ---
    const updateStep = (index: number, field: keyof ProcessStep, value: string) => {
        const next = [...processSteps];
        next[index] = { ...next[index], [field]: value };
        setProcessSteps(next);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSaving(true);

        const payload = {
            title,
            slug,
            short_description: shortDescription,
            description,
            cover_image: coverImage,
            gallery_images: galleryImages.filter((g) => g.trim() !== ""),
            included_services: includedServices.filter((s) => s.trim() !== ""),
            why_eminence: whyEminence.filter((w) => w.trim() !== ""),
            process_steps: processSteps,
            featured,
            published,
        };

        const { error } = isEditing
            ? await supabase.from("services").update(payload).eq("id", existingService!.id)
            : await supabase.from("services").insert(payload);

        setSaving(false);

        if (error) {
            setError(error.message);
            return;
        }

        router.push("/admin");
        router.refresh();
    };

    const handleDelete = async () => {
        if (!existingService) return;
        if (!confirm(`Delete "${existingService.title}"? This cannot be undone.`)) return;

        const { error } = await supabase.from("services").delete().eq("id", existingService.id);
        if (error) {
            setError(error.message);
            return;
        }
        router.push("/admin");
        router.refresh();
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
            {/* BASIC INFO */}
            <div className="bg-white border border-eminence-gray-200 p-6 space-y-4">
                <h2 className="font-heading font-semibold text-eminence-black">Basic Info</h2>

                <div>
                    <label className="block text-xs font-medium text-eminence-gray-600 mb-1.5">Title</label>
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-eminence-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-eminence-green"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-eminence-gray-600 mb-1.5">
                        Slug (used in URL — e.g. commercial-cleaning)
                    </label>
                    <input
                        type="text"
                        required
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="w-full border border-eminence-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-eminence-green"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-eminence-gray-600 mb-1.5">Short Description (for cards)</label>
                    <input
                        type="text"
                        required
                        value={shortDescription}
                        onChange={(e) => setShortDescription(e.target.value)}
                        className="w-full border border-eminence-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-eminence-green"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-eminence-gray-600 mb-1.5">
                        Full Description (use a blank line between paragraphs)
                    </label>
                    <textarea
                        required
                        rows={6}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border border-eminence-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-eminence-green"
                    />
                </div>

                <ImageUpload
                    label="Cover Image"
                    value={coverImage}
                    onChange={setCoverImage}
                />
            </div>

            {/* GALLERY IMAGES */}
            <div className="bg-white border border-eminence-gray-200 p-6 space-y-4">
                <h2 className="font-heading font-semibold text-eminence-black mb-2">Gallery Images</h2>
                {galleryImages.map((img, i) => (
                    <div key={i} className="flex items-start gap-3">
                        <div className="flex-1">
                            <ImageUpload
                                value={img}
                                onChange={(url) => updateListItem(galleryImages, setGalleryImages, i, url)}
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => removeListItem(galleryImages, setGalleryImages, i)}
                            className="text-red-600 hover:text-red-700 text-sm px-2 pt-2"
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => addListItem(galleryImages, setGalleryImages)}
                    className="text-sm text-eminence-green hover:text-eminence-green-dark font-medium"
                >
                    + Add Gallery Image
                </button>
            </div>

            {/* INCLUDED SERVICES */}
            <ListEditor
                label="What's Included"
                items={includedServices}
                onAdd={() => addListItem(includedServices, setIncludedServices)}
                onUpdate={(i, v) => updateListItem(includedServices, setIncludedServices, i, v)}
                onRemove={(i) => removeListItem(includedServices, setIncludedServices, i)}
                placeholder="e.g. Floor care and mopping"
            />

            {/* WHY EMINENCE */}
            <ListEditor
                label="Why Eminence Points"
                items={whyEminence}
                onAdd={() => addListItem(whyEminence, setWhyEminence)}
                onUpdate={(i, v) => updateListItem(whyEminence, setWhyEminence, i, v)}
                onRemove={(i) => removeListItem(whyEminence, setWhyEminence, i)}
                placeholder="e.g. Professional Teams"
            />

            {/* PROCESS STEPS */}
            <div className="bg-white border border-eminence-gray-200 p-6 space-y-4">
                <h2 className="font-heading font-semibold text-eminence-black">How It Works (4 steps)</h2>
                {processSteps.map((step, i) => (
                    <div key={i} className="grid grid-cols-[auto_1fr] gap-3 items-start border-t border-eminence-gray-100 pt-4 first:border-t-0 first:pt-0">
                        <span className="text-sm font-medium text-eminence-green pt-2.5">{step.step}</span>
                        <div className="space-y-2">
                            <input
                                type="text"
                                placeholder="Step title"
                                value={step.title}
                                onChange={(e) => updateStep(i, "title", e.target.value)}
                                className="w-full border border-eminence-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-eminence-green"
                            />
                            <input
                                type="text"
                                placeholder="Step description"
                                value={step.description}
                                onChange={(e) => updateStep(i, "description", e.target.value)}
                                className="w-full border border-eminence-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-eminence-green"
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* SETTINGS */}
            <div className="bg-white border border-eminence-gray-200 p-6 space-y-3">
                <h2 className="font-heading font-semibold text-eminence-black mb-2">Settings</h2>
                <label className="flex items-center gap-2 text-sm text-eminence-black">
                    <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
                    Featured on homepage
                </label>
                <label className="flex items-center gap-2 text-sm text-eminence-black">
                    <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
                    Published (visible on site)
                </label>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    disabled={saving}
                    className="btn-primary bg-eminence-green hover:bg-eminence-green-dark disabled:opacity-60"
                >
                    {saving ? "Saving..." : isEditing ? "Save Changes" : "Create Service"}
                </button>

                {isEditing && (
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="text-sm text-red-600 hover:text-red-700 transition-colors"
                    >
                        Delete Service
                    </button>
                )}
            </div>
        </form>
    );
}

// --- Reusable dynamic list editor for simple string arrays ---
function ListEditor({
    label,
    items,
    onAdd,
    onUpdate,
    onRemove,
    placeholder,
}: {
    label: string;
    items: string[];
    onAdd: () => void;
    onUpdate: (index: number, value: string) => void;
    onRemove: (index: number) => void;
    placeholder: string;
}) {
    return (
        <div className="bg-white border border-eminence-gray-200 p-6 space-y-3">
            <h2 className="font-heading font-semibold text-eminence-black mb-2">{label}</h2>
            {items.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                    <input
                        type="text"
                        value={item}
                        placeholder={placeholder}
                        onChange={(e) => onUpdate(i, e.target.value)}
                        className="flex-1 border border-eminence-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-eminence-green"
                    />
                    <button
                        type="button"
                        onClick={() => onRemove(i)}
                        className="text-red-600 hover:text-red-700 text-sm px-2"
                    >
                        Remove
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={onAdd}
                className="text-sm text-eminence-green hover:text-eminence-green-dark font-medium"
            >
                + Add Item
            </button>
        </div>
    );
}