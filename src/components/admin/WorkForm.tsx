"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import ImageUpload from "./ImageUpload";

interface ExistingWork {
    id: string;
    title: string;
    slug: string;
    category: string;
    cover_image: string;
    gallery_images: string[];
    description: string;
    location: string | null;
    published: boolean;
}

interface WorkFormProps {
    existingWork?: ExistingWork;
}

export default function WorkForm({ existingWork }: WorkFormProps) {
    const router = useRouter();
    const supabase = createClient();
    const isEditing = !!existingWork;

    const [title, setTitle] = useState(existingWork?.title ?? "");
    const [slug, setSlug] = useState(existingWork?.slug ?? "");
    const [category, setCategory] = useState(existingWork?.category ?? "");
    const [coverImage, setCoverImage] = useState(existingWork?.cover_image ?? "");
    const [galleryImages, setGalleryImages] = useState<string[]>(existingWork?.gallery_images ?? []);
    const [description, setDescription] = useState(existingWork?.description ?? "");
    const [location, setLocation] = useState(existingWork?.location ?? "");
    const [published, setPublished] = useState(existingWork?.published ?? true);

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const updateGalleryItem = (index: number, url: string) => {
        const next = [...galleryImages];
        next[index] = url;
        setGalleryImages(next);
    };

    const removeGalleryItem = (index: number) => {
        setGalleryImages(galleryImages.filter((_, i) => i !== index));
    };

    const addGalleryItem = () => setGalleryImages([...galleryImages, ""]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSaving(true);

        const payload = {
            title,
            slug,
            category,
            cover_image: coverImage,
            gallery_images: galleryImages.filter((g) => g.trim() !== ""),
            description,
            location: location.trim() === "" ? null : location,
            published,
        };

        const { error } = isEditing
            ? await supabase.from("work_items").update(payload).eq("id", existingWork!.id)
            : await supabase.from("work_items").insert(payload);

        setSaving(false);

        if (error) {
            setError(error.message);
            return;
        }

        router.push("/admin/work");
        router.refresh();
    };

    const handleDelete = async () => {
        if (!existingWork) return;
        if (!confirm(`Delete "${existingWork.title}"? This cannot be undone.`)) return;

        const { error } = await supabase.from("work_items").delete().eq("id", existingWork.id);
        if (error) {
            setError(error.message);
            return;
        }
        router.push("/admin/work");
        router.refresh();
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
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
                        Slug (used in URL — e.g. corporate-office-cleaning)
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
                    <label className="block text-xs font-medium text-eminence-gray-600 mb-1.5">
                        Category (e.g. Corporate / Office)
                    </label>
                    <input
                        type="text"
                        required
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border border-eminence-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-eminence-green"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-eminence-gray-600 mb-1.5">
                        Location (optional)
                    </label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full border border-eminence-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-eminence-green"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-eminence-gray-600 mb-1.5">
                        Description (use a blank line between paragraphs)
                    </label>
                    <textarea
                        required
                        rows={6}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border border-eminence-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-eminence-green"
                    />
                </div>

                <ImageUpload label="Cover Image" value={coverImage} onChange={setCoverImage} />
            </div>

            <div className="bg-white border border-eminence-gray-200 p-6 space-y-4">
                <h2 className="font-heading font-semibold text-eminence-black mb-2">Gallery Images</h2>
                {galleryImages.map((img, i) => (
                    <div key={i} className="flex items-start gap-3">
                        <div className="flex-1">
                            <ImageUpload value={img} onChange={(url) => updateGalleryItem(i, url)} />
                        </div>
                        <button
                            type="button"
                            onClick={() => removeGalleryItem(i)}
                            className="text-red-600 hover:text-red-700 text-sm px-2 pt-2"
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addGalleryItem}
                    className="text-sm text-eminence-green hover:text-eminence-green-dark font-medium"
                >
                    + Add Gallery Image
                </button>
            </div>

            <div className="bg-white border border-eminence-gray-200 p-6">
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
                    {saving ? "Saving..." : isEditing ? "Save Changes" : "Create Project"}
                </button>

                {isEditing && (
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="text-sm text-red-600 hover:text-red-700 transition-colors"
                    >
                        Delete Project
                    </button>
                )}
            </div>
        </form>
    );
}