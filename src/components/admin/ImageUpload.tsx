"use client";

import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase-browser";

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    label?: string;
}

export default function ImageUpload({ value, onChange, label = "Image" }: ImageUploadProps) {
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
        const filePath = fileName;

        const { error: uploadError } = await supabase.storage
            .from("service-images")
            .upload(filePath, file);

        if (uploadError) {
            setError(uploadError.message);
            setUploading(false);
            return;
        }

        const { data } = supabase.storage.from("service-images").getPublicUrl(filePath);

        onChange(data.publicUrl);
        setUploading(false);
    };

    return (
        <div>
            <label className="block text-xs font-medium text-eminence-gray-600 mb-1.5">{label}</label>

            {value && (
                <div className="relative w-full aspect-video mb-3 bg-eminence-gray-100 overflow-hidden border border-eminence-gray-200">
                    <Image src={value} alt="Preview" fill className="object-cover" />
                </div>
            )}

            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploading}
                className="w-full text-sm text-eminence-gray-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-medium file:bg-eminence-green file:text-white hover:file:bg-eminence-green-dark file:cursor-pointer cursor-pointer disabled:opacity-60"
            />

            {uploading && <p className="text-xs text-eminence-gray-600 mt-2">Uploading...</p>}
            {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
        </div>
    );
}