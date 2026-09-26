"use client";

import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase-browser";

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    label?: string;
    watermark?: boolean;
}

export default function ImageUpload({
    value,
    onChange,
    label = "Image",
    watermark = false,
}: ImageUploadProps) {
    const supabase = createClient();

    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");

    const addWatermark = async (file: File): Promise<File> => {
        return new Promise((resolve, reject) => {
            const image = new window.Image();
            const objectUrl = URL.createObjectURL(file);

            image.onload = async () => {
                try {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");

                    if (!ctx) {
                        URL.revokeObjectURL(objectUrl);
                        reject(new Error("Could not create image canvas."));
                        return;
                    }

                    canvas.width = image.naturalWidth;
                    canvas.height = image.naturalHeight;

                    // Draw original image
                    ctx.drawImage(
                        image,
                        0,
                        0,
                        canvas.width,
                        canvas.height
                    );

                    // Load Eminence watermark
                    const logo = new window.Image();
                    logo.src = "/images/branding/eminence-watermark.png";

                    logo.onload = () => {
                        // Watermark size:
                        // approximately 18% of the image width
                        const maxLogoWidth = canvas.width * 0.18;

                        const logoScale =
                            maxLogoWidth / logo.naturalWidth;

                        const logoWidth =
                            logo.naturalWidth * logoScale;

                        const logoHeight =
                            logo.naturalHeight * logoScale;

                        // Padding from the edges
                        const padding = Math.max(
                            20,
                            canvas.width * 0.025
                        );

                        const x =
                            canvas.width -
                            logoWidth -
                            padding;

                        const y =
                            canvas.height -
                            logoHeight -
                            padding;

                        // Slight transparency so the photo remains visible
                        ctx.globalAlpha = 0.85;

                        ctx.drawImage(
                            logo,
                            x,
                            y,
                            logoWidth,
                            logoHeight
                        );

                        ctx.globalAlpha = 1;

                        canvas.toBlob(
                            (blob) => {
                                URL.revokeObjectURL(objectUrl);

                                if (!blob) {
                                    reject(
                                        new Error(
                                            "Could not create watermarked image."
                                        )
                                    );
                                    return;
                                }

                                const watermarkedFile = new File(
                                    [blob],
                                    file.name.replace(
                                        /\.[^/.]+$/,
                                        ""
                                    ) + "-watermarked.jpg",
                                    {
                                        type: "image/jpeg",
                                        lastModified: Date.now(),
                                    }
                                );

                                resolve(watermarkedFile);
                            },
                            "image/jpeg",
                            0.92
                        );
                    };

                    logo.onerror = () => {
                        URL.revokeObjectURL(objectUrl);
                        reject(
                            new Error(
                                "Could not load the Eminence watermark logo."
                            )
                        );
                    };
                } catch (err) {
                    URL.revokeObjectURL(objectUrl);
                    reject(err);
                }
            };

            image.onerror = () => {
                URL.revokeObjectURL(objectUrl);
                reject(new Error("Could not read the selected image."));
            };

            image.src = objectUrl;
        });
    };

    const handleFileChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const selectedFile = e.target.files?.[0];

        if (!selectedFile) return;

        setError("");
        setUploading(true);

        try {
            let fileToUpload = selectedFile;

            // Only Work images will use this.
            if (watermark) {
                fileToUpload = await addWatermark(selectedFile);
            }

            const fileName = `${Date.now()}-${Math.random()
                .toString(36)
                .slice(2)}.jpg`;

            const filePath = fileName;

            const { error: uploadError } =
                await supabase.storage
                    .from("service-images")
                    .upload(filePath, fileToUpload);

            if (uploadError) {
                setError(uploadError.message);
                setUploading(false);
                return;
            }

            const { data } = supabase.storage
                .from("service-images")
                .getPublicUrl(filePath);

            onChange(data.publicUrl);
        } catch (err) {
            console.error(err);

            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong while processing the image."
            );
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <label className="block text-xs font-medium text-eminence-gray-600 mb-1.5">
                {label}
            </label>

            {value && (
                <div className="relative w-full aspect-video mb-3 bg-eminence-gray-100 overflow-hidden border border-eminence-gray-200">
                    <Image
                        src={value}
                        alt="Preview"
                        fill
                        className="object-cover"
                    />
                </div>
            )}

            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploading}
                className="w-full text-sm text-eminence-gray-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-medium file:bg-eminence-green file:text-white hover:file:bg-eminence-green-dark file:cursor-pointer cursor-pointer disabled:opacity-60"
            />

            {uploading && (
                <p className="text-xs text-eminence-gray-600 mt-2">
                    {watermark
                        ? "Adding watermark and uploading..."
                        : "Uploading..."}
                </p>
            )}

            {error && (
                <p className="text-xs text-red-600 mt-2">
                    {error}
                </p>
            )}
        </div>
    );
}