"use client";

import { useState, useRef } from "react";

interface VideoCardProps {
    title: string;
    category: string;
    videoUrl: string;
    poster?: string;
    caption?: string;
}

export default function VideoCard({ title, category, videoUrl, poster, caption }: VideoCardProps) {
    const [playing, setPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handlePlay = () => {
        setPlaying(true);
        videoRef.current?.play();
    };

    return (
        <div className="group">
            <div className="relative aspect-video w-full overflow-hidden bg-eminence-black">
                <video
                    ref={videoRef}
                    src={videoUrl}
                    poster={poster}
                    controls={playing}
                    playsInline
                    className="w-full h-full object-cover"
                    onPause={() => setPlaying(false)}
                />

                {!playing && (
                    <button
                        onClick={handlePlay}
                        aria-label={`Play ${title}`}
                        className="absolute inset-0 flex items-center justify-center bg-eminence-black/30 hover:bg-eminence-black/40 transition-colors"
                    >
                        <span className="w-16 h-16 rounded-full bg-eminence-gold flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                            <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6 ml-1">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </span>
                    </button>
                )}
            </div>

            <div className="pt-4">
                <span className="text-xs uppercase tracking-widest2 text-eminence-gold font-medium">
                    {category}
                </span>
                <h3 className="font-heading font-semibold text-eminence-black mt-1">{title}</h3>
                {caption && <p className="text-sm text-eminence-gray-600 mt-1">{caption}</p>}
            </div>
        </div>
    );
}