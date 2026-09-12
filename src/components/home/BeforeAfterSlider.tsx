// src/components/home/BeforeAfterSlider.tsx
"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";

interface BeforeAfterSliderProps {
    beforeImage: string;
    afterImage: string;
}

export default function BeforeAfterSlider({ beforeImage, afterImage }: BeforeAfterSliderProps) {
    const [position, setPosition] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);
    const dragging = useRef(false);

    const updatePosition = useCallback((clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const pct = ((clientX - rect.left) / rect.width) * 100;
        setPosition(Math.min(100, Math.max(0, pct)));
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative aspect-[16/10] w-full overflow-hidden select-none cursor-ew-resize"
            onMouseDown={() => (dragging.current = true)}
            onMouseUp={() => (dragging.current = false)}
            onMouseLeave={() => (dragging.current = false)}
            onMouseMove={(e) => dragging.current && updatePosition(e.clientX)}
            onTouchMove={(e) => updatePosition(e.touches[0].clientX)}
        >
            <div className="absolute inset-0">
                <Image src={afterImage} alt="After cleaning" fill className="object-cover" />
                <span className="absolute top-4 right-4 bg-eminence-green text-white text-xs uppercase tracking-widest2 px-3 py-1.5 z-10">
                    After
                </span>
            </div>

            <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${position}%` }}
            >
                <div className="relative h-full" style={{ width: containerRef.current?.offsetWidth ?? "100%" }}>
                    <Image src={beforeImage} alt="Before cleaning" fill className="object-cover" />
                </div>
                <span className="absolute top-4 left-4 bg-eminence-black text-white text-xs uppercase tracking-widest2 px-3 py-1.5 z-10">
                    Before
                </span>
            </div>

            <div
                className="absolute top-0 bottom-0 w-0.5 bg-white z-20"
                style={{ left: `${position}%` }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center">
                    <span className="text-eminence-black text-xs">↔</span>
                </div>
            </div>
        </div>
    );
}