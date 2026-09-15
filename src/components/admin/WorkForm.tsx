"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import ImageUpload from "./ImageUpload";
import { workCategories } from "@/data/work";

interface ExistingWork {
    id: string;
    title: string;
    slug: string;
    category: string;
    before_image: string | null;
    after_image: string;
    description: string | null;
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
    const [category, setCategory] = useState(
        existingWork?.category ?? workCategories[1]
    );
    const [beforeImage, setBeforeImage] = useState(
        existingWork?.before_image ?? ""
    );
    const [afterImage, setAfterImage] = useState(
        existingWork?.after_image ?? ""
    );
    const [description, setDescription] = useState(
        existingWork?.description ?? ""
    );
    const [location, setLocation] = useState(
        existingWork?.location ?? ""
    );
    const [published, setPublished] = useState(
        existingWork?.published ?? true
    );

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!title.trim()) {
            setError("Title is required.");
            return;
        }

        if (!slug.trim()) {
            setError("Slug is required.");
            return;
        }

        if (!category) {
            setError("Category is required.");
            return;
        }

        if (!afterImage.trim()) {
            setError("An 'After' image is required.");
            return;
        }

        if (!description.trim()) {
            setError("Description is required.");
            return;
        }

        setSaving(true);

        const payload = {
            title: title.trim(),
            slug: slug
                .trim()
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, ""),
            category,
            // The After image is used as the main cover image
            cover_image: afterImage.trim(),
            before_image:
                beforeImage.trim() === ""
                    ? null
                    : beforeImage.trim(),
            after_image: afterImage.trim(),
            description: description.trim(),
            location:
                location.trim() === ""
                    ? null
                    : location.trim(),
            published,
        };

        const { error } = isEditing
            ? await supabase
                .from("work_items")
                .update(payload)
                .eq("id", existingWork!.id)
            : await supabase
                .from("work_items")
                .insert(payload);

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

        if (
            !confirm(
                `Delete "${existingWork.title}"? This cannot be undone.`
            )
        ) {
            return;
        }

        setError("");

        const { error } = await supabase
            .from("work_items")
            .delete()
            .eq("id", existingWork.id);

        if (error) {
            setError(error.message);
            return;
        }

        router.push("/admin/work");
        router.refresh();
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
            {/* Basic Information */}
            <div className="bg-white border border-eminence-gold/15 p-6 space-y-4">
                <h2 className="font-heading font-semibold text-eminence-black">
                    Basic Info
                </h2>

                {/* Title */}
                <div>
                    <label className="block text-xs font-medium text-eminence-gray-600 mb-1.5">
                        Title
                    </label>

                    <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Office Deep Cleaning"
                        className="w-full border border-eminence-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-eminence-gold"
                    />
                </div>

                {/* Slug */}
                <div>
                    <label className="block text-xs font-medium text-eminence-gray-600 mb-1.5">
                        Slug (used in URL)
                    </label>

                    <input
                        type="text"
                        required
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        placeholder="e.g. office-deep-cleaning"
                        className="w-full border border-eminence-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-eminence-gold"
                    />

                    <p className="mt-1.5 text-[11px] text-eminence-gray-500">
                        Example: /work/office-deep-cleaning
                    </p>
                </div>

                {/* Category */}
                <div>
                    <label className="block text-xs font-medium text-eminence-gray-600 mb-1.5">
                        Category
                    </label>

                    <select
                        required
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border border-eminence-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-eminence-gold bg-white"
                    >
                        {workCategories
                            .filter((c) => c !== "All")
                            .map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                    </select>
                </div>

                {/* Location */}
                <div>
                    <label className="block text-xs font-medium text-eminence-gray-600 mb-1.5">
                        Location (optional)
                    </label>

                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Nairobi, Kenya"
                        className="w-full border border-eminence-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-eminence-gold"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-xs font-medium text-eminence-gray-600 mb-1.5">
                        Description
                    </label>

                    <textarea
                        rows={4}
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe the cleaning work carried out..."
                        className="w-full border border-eminence-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-eminence-gold"
                    />
                </div>
            </div>

            {/* Images */}
            <div className="bg-white border border-eminence-gold/15 p-6 space-y-4">
                <h2 className="font-heading font-semibold text-eminence-black">
                    Before / After Images
                </h2>

                <p className="text-xs text-eminence-gray-600 -mt-2">
                    The After image is required and will also be used as the
                    main cover image for this project. Before is optional.
                </p>

                <ImageUpload
                    label="Before Image (optional)"
                    value={beforeImage}
                    onChange={setBeforeImage}
                />

                <ImageUpload
                    label="After Image (required)"
                    value={afterImage}
                    onChange={setAfterImage}
                />
            </div>

            {/* Publishing */}
            <div className="bg-white border border-eminence-gold/15 p-6">
                <label className="flex items-center gap-2 text-sm text-eminence-black cursor-pointer">
                    <input
                        type="checkbox"
                        checked={published}
                        onChange={(e) =>
                            setPublished(e.target.checked)
                        }
                    />

                    Published (visible on site)
                </label>
            </div>

            {/* Error */}
            {error && (
                <div className="border border-red-200 bg-red-50 px-4 py-3">
                    <p className="text-sm text-red-600">
                        {error}
                    </p>
                </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    disabled={saving}
                    className="btn-gold disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {saving
                        ? "Saving..."
                        : isEditing
                            ? "Save Changes"
                            : "Create Project"}
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