"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

interface VideoUploadProps {
    value: string;
    onChange: (url: string) => void;
    label?: string;
}

export default function VideoUpload({
    value,
    onChange,
    label = "Video File",
}: VideoUploadProps) {
    const supabase = createClient();

    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");
    const [progress, setProgress] = useState(0);

    const handleFileChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setError("");
        setUploading(true);
        setProgress(0);

        try {
            /*
             * Load FFmpeg in the browser.
             */
            const ffmpeg = new FFmpeg();

            ffmpeg.on("progress", ({ progress }) => {
                setProgress(Math.round(progress * 100));
            });

            await ffmpeg.load({
                coreURL: "/ffmpeg/ffmpeg-core.js",
                wasmURL: "/ffmpeg/ffmpeg-core.wasm",
            });

            /*
             * Write the original video into FFmpeg.
             */
            const inputExtension =
                file.name.split(".").pop()?.toLowerCase() || "mp4";

            const inputName = `input.${inputExtension}`;
            const outputName = "watermarked.mp4";

            await ffmpeg.writeFile(inputName, await fetchFile(file));

            /*
             * Load the transparent Eminence watermark.
             */
            const watermarkResponse = await fetch(
                "/images/branding/eminence-watermark.png"
            );

            if (!watermarkResponse.ok) {
                throw new Error(
                    "Could not load the Eminence watermark image."
                );
            }

            const watermarkBlob = await watermarkResponse.blob();

            await ffmpeg.writeFile(
                "watermark.png",
                await fetchFile(watermarkBlob)
            );

            /*
             * Add the logo to the bottom-right corner.
             *
             * The watermark is approximately 18% of the
             * video's width and has a 40px margin.
             */
            await ffmpeg.exec([
                "-i",
                inputName,
                "-i",
                "watermark.png",
                "-filter_complex",
                "[1:v]scale=iw*0.18:-1[wm];[0:v][wm]overlay=W-w-40:H-h-40",
                "-map",
                "0:v:0",
                "-map",
                "0:a?",
                "-c:v",
                "libx264",
                "-preset",
                "veryfast",
                "-crf",
                "23",
                "-pix_fmt",
                "yuv420p",
                "-c:a",
                "aac",
                "-b:a",
                "128k",
                "-movflags",
                "+faststart",
                outputName,
            ]);

            /*
             * Read the finished watermarked video.
             */
            const outputData = await ffmpeg.readFile(outputName);

            const outputBytes =
                outputData instanceof Uint8Array
                    ? outputData
                    : new TextEncoder().encode(outputData as string);

            const watermarkedFile = new File(
                [outputBytes.buffer as ArrayBuffer],
                `eminence-${Date.now()}.mp4`,
                {
                    type: "video/mp4",
                }
            );

            /*
             * Upload the ACTUAL watermarked video
             * to the existing Supabase videos bucket.
             */
            const fileName = `${Date.now()}-${Math.random()
                .toString(36)
                .slice(2)}.mp4`;

            const { error: uploadError } = await supabase.storage
                .from("videos")
                .upload(fileName, watermarkedFile, {
                    contentType: "video/mp4",
                    upsert: false,
                });

            if (uploadError) {
                throw new Error(uploadError.message);
            }

            const { data } = supabase.storage
                .from("videos")
                .getPublicUrl(fileName);

            onChange(data.publicUrl);

            /*
             * Clean up FFmpeg files.
             */
            try {
                await ffmpeg.deleteFile(inputName);
                await ffmpeg.deleteFile("watermark.png");
                await ffmpeg.deleteFile(outputName);
            } catch {
                // Ignore cleanup errors.
            }

            setProgress(100);
        } catch (err) {
            console.error("Video watermarking error:", err);

            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to process and upload the video."
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
                <video
                    src={value}
                    controls
                    className="w-full aspect-video mb-3 bg-eminence-black"
                />
            )}

            <input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                disabled={uploading}
                className="w-full text-sm text-eminence-gray-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm font-medium file:bg-eminence-gold file:text-white hover:file:bg-eminence-gold-dark file:cursor-pointer cursor-pointer disabled:opacity-60"
            />

            {uploading && (
                <div className="mt-3">
                    <p className="text-xs text-eminence-gray-600">
                        Processing video and adding watermark...
                    </p>

                    <div className="mt-2 h-1.5 w-full bg-eminence-gray-200 overflow-hidden">
                        <div
                            className="h-full bg-eminence-gold transition-all duration-200"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <p className="text-[11px] text-eminence-gray-500 mt-1">
                        {progress}% complete
                    </p>
                </div>
            )}

            {error && (
                <p className="text-xs text-red-600 mt-2">
                    {error}
                </p>
            )}
        </div>
    );
}