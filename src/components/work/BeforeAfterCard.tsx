"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { WorkItem } from "@/types/work";

export default function BeforeAfterCard({ item }: { item: WorkItem }) {
    const [position, setPosition] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);
    const dragging = useRef(false);

    const updatePosition = useCallback((clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const pct = ((clientX - rect.left) / rect.width) * 100;
        setPosition(Math.min(100, Math.max(0, pct)));
    }, []);

    const hasBeforeAfter = !!item.before;

    return (
        <div className="group">
            <div
                ref={containerRef}
                className={`relative aspect-[4/3] w-full overflow-hidden bg-eminence-gray-100 ${hasBeforeAfter ? "cursor-ew-resize select-none" : ""
                    }`}
                onMouseDown={() => hasBeforeAfter && (dragging.current = true)}
                onMouseUp={() => (dragging.current = false)}
                onMouseLeave={() => (dragging.current = false)}
                onMouseMove={(e) => dragging.current && updatePosition(e.clientX)}
                onTouchMove={(e) => hasBeforeAfter && updatePosition(e.touches[0].clientX)}
            >
                <Image src={item.after} alt={`${item.title} — after`} fill className="object-cover" />

                {hasBeforeAfter && (
                    <>
                        <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
                            <div className="relative h-full" style={{ width: containerRef.current?.offsetWidth ?? "100%" }}>
                                <Image src={item.before!} alt={`${item.title} — before`} fill className="object-cover" />
                            </div>
                        </div>

                        <div className="absolute top-0 bottom-0 w-0.5 bg-white z-20" style={{ left: `${position}%` }}>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
                                <span className="text-eminence-black text-xs">↔</span>
                            </div>
                        </div>

                        <span className="absolute top-3 left-3 bg-eminence-black/80 text-white text-[10px] uppercase tracking-widest2 px-2.5 py-1 z-10">
                            Before
                        </span>
                        <span className="absolute top-3 right-3 bg-eminence-gold text-white text-[10px] uppercase tracking-widest2 px-2.5 py-1 z-10">
                            After
                        </span>
                    </>
                )}
            </div>

            <div className="pt-4">
                <span className="text-xs uppercase tracking-widest2 text-eminence-gold font-medium">
                    {item.category}
                </span>
                <Link href={`/work/${item.slug}`}>
                    <h3 className="font-heading font-semibold text-eminence-black mt-1 hover:text-eminence-gold transition-colors">
                        {item.title}
                    </h3>
                </Link>
                {item.location && (
                    <p className="text-xs text-eminence-gray-600 mt-1">{item.location}</p>
                )}
            </div>
        </div>
    );
}