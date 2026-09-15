"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Testimonial } from "@/data/testimonials";

export default function TestimonialCarouselClient({ testimonials }: { testimonials: Testimonial[] }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (testimonials.length <= 1) return;
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    const current = testimonials[index];
    const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
    const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    return (
        <div className="bg-white border border-eminence-gold/15 p-8 h-full flex flex-col justify-between">
            <div>
                <span className="text-4xl text-eminence-gold/30 font-heading block mb-4">"</span>
                <p className="text-eminence-black leading-relaxed mb-6">{current.quote}</p>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {current.avatar && (
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-eminence-gray-200">
                            <Image src={current.avatar} alt={current.author ?? "Client"} fill className="object-cover" />
                        </div>
                    )}
                    {(current.author || current.role) && (
                        <div>
                            {current.author && <p className="text-sm font-medium text-eminence-black">{current.author}</p>}
                            {current.role && <p className="text-xs text-eminence-gray-600">{current.role}</p>}
                        </div>
                    )}
                </div>
                {testimonials.length > 1 && (
                    <div className="flex gap-2">
                        <button onClick={prev} aria-label="Previous testimonial" className="w-8 h-8 flex items-center justify-center border border-eminence-gray-200 hover:border-eminence-gold transition-colors">←</button>
                        <button onClick={next} aria-label="Next testimonial" className="w-8 h-8 flex items-center justify-center border border-eminence-gray-200 hover:border-eminence-gold transition-colors">→</button>
                    </div>
                )}
            </div>
        </div>
    );
}