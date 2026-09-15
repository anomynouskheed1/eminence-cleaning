"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-browser";

interface VideoUploadProps {
    value: string;
    onChange: (url: string) => void;
    label?: string;
}

export default function VideoUpload({ value, onChange, label = "Video File" }: VideoUploadProps) {
    const supabase = createClient();
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setError("");
        setUploading(true);

        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
            .from("videos")
            .upload(fileName, file);

        if (uploadError) {
            setError(uploadError.message);
            setUploading(false);
            return;
        }

        const { data } = supabase.storage.from("videos").getPublicUrl(fileName);
        onChange(data.publicUrl);
        setUploading(false);
    };

    return (
        <div>
            <label className="block text-xs font-medium text-eminence-gray-600 mb-1.5">{label}</label>

            {value && (
                <video src={value} controls className="w-full aspect-video mb-3 bg-eminence-black" />
            )}

            <input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                disabled={uploading}
                className="w-full text-sm text-eminence-gray-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-medium file:bg-eminence-gold file:text-white hover:file:bg-eminence-gold-dark file:cursor-pointer cursor-pointer disabled:opacity-60"
            />

            {uploading && <p className="text-xs text-eminence-gray-600 mt-2">Uploading video, this may take a moment...</p>}
            {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
        </div>
    );
}