"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import ImageUpload from "./ImageUpload";
import VideoUpload from "./VideoUpload";
import { workCategories } from "@/data/work";

interface ExistingVideo {
    id: string;
    title: string;
    category: string;
    video_url: string;
    poster: string | null;
    caption: string | null;
    published: boolean;
}

export default function VideoForm({ existingVideo }: { existingVideo?: ExistingVideo }) {
    const router = useRouter();
    const supabase = createClient();
    const isEditing = !!existingVideo;

    const [title, setTitle] = useState(existingVideo?.title ?? "");
    const [category, setCategory] = useState(existingVideo?.category ?? workCategories[1]);
    const [videoUrl, setVideoUrl] = useState(existingVideo?.video_url ?? "");
    const [poster, setPoster] = useState(existingVideo?.poster ?? "");
    const [caption, setCaption] = useState(existingVideo?.caption ?? "");
    const [published, setPublished] = useState(existingVideo?.published ?? true);

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!videoUrl) {
            setError("A video file is required.");
            return;
        }

        setSaving(true);

        const payload = {
            title,
            category,
            video_url: videoUrl,
            poster: poster.trim() === "" ? null : poster,
            caption: caption.trim() === "" ? null : caption,
            published,
        };

        const { error } = isEditing
            ? await supabase.from("videos").update(payload).eq("id", existingVideo!.id)
            : await supabase.from("videos").insert(payload);

        setSaving(false);

        if (error) {
            setError(error.message);
            return;
        }

        router.push("/admin/videos");
        router.refresh();
    };

    const handleDelete = async () => {
        if (!existingVideo) return;
        if (!confirm(`Delete "${existingVideo.title}"? This cannot be undone.`)) return;

        const { error } = await supabase.from("videos").delete().eq("id", existingVideo.id);
        if (error) {
            setError(error.message);
            return;
        }
        router.push("/admin/videos");
        router.refresh();
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
            <div className="bg-white border border-eminence-gold/15 p-6 space-y-4">
                <h2 className="font-heading font-semibold text-eminence-black">Basic Info</h2>

                <div>
                    <label className="block text-xs font-medium text-eminence-gray-600 mb-1.5">Title</label>
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-eminence-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-eminence-gold"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-eminence-gray-600 mb-1.5">Category</label>
                    <select
                        required
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border border-eminence-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-eminence-gold bg-white"
                    >
                        {workCategories.filter((c) => c !== "All").map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-medium text-eminence-gray-600 mb-1.5">
                        Caption (optional)
                    </label>
                    <input
                        type="text"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        className="w-full border border-eminence-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-eminence-gold"
                    />
                </div>
            </div>

            <div className="bg-white border border-eminence-gold/15 p-6 space-y-4">
                <h2 className="font-heading font-semibold text-eminence-black">Media</h2>
                <VideoUpload value={videoUrl} onChange={setVideoUrl} label="Video File (required)" />
                <ImageUpload value={poster} onChange={setPoster} label="Poster/Thumbnail Image (optional)" />
            </div>

            <div className="bg-white border border-eminence-gold/15 p-6">
                <label className="flex items-center gap-2 text-sm text-eminence-black">
                    <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
                    Published (visible on site)
                </label>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex items-center justify-between">
                <button type="submit" disabled={saving} className="btn-gold disabled:opacity-60">
                    {saving ? "Saving..." : isEditing ? "Save Changes" : "Add Video"}
                </button>
                {isEditing && (
                    <button type="button" onClick={handleDelete} className="text-sm text-red-600 hover:text-red-700 transition-colors">
                        Delete Video
                    </button>
                )}
            </div>
        </form>
    );
}