"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const slides = [
    "/images/hero/hero-1.jpg",
    "/images/hero/hero-2.jpg",
    "/images/hero/hero-3.jpg",
];

export default function HeroSlideshow() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute inset-0">
            {slides.map((src, i) => (
                <div
                    key={src}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === current ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <Image
                        src={src}
                        alt="Eminence Cleaning Company team at work"
                        fill
                        priority={i === 0}
                        sizes="100vw"
                        className="object-cover object-center"
                    />
                </div>
            ))}

            {/* Slide indicators */}
            <div className="absolute bottom-24 md:bottom-28 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-white" : "w-1.5 bg-white/40"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}