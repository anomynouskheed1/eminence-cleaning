"use client";

import { useState } from "react";
import QuoteFlow from "./QuoteFlow";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

export default function FloatingActions() {
    const [quoteOpen, setQuoteOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setQuoteOpen(true)}
                className="fixed bottom-[92px] md:bottom-[104px] right-6 z-50 flex items-center gap-2 bg-eminence-gold hover:bg-eminence-gold-dark text-white text-sm font-medium px-5 py-3.5 shadow-lg transition-colors"
                aria-label="Get a free quote"
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <path d="M9 12h6M9 16h6M9 8h6M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16l-3-2-2 2-2-2-2 2-2-2-3 2z" />
                </svg>
                Get a Free Quote
            </button>

            <WhatsAppFloat />

            <QuoteFlow open={quoteOpen} onClose={() => setQuoteOpen(false)} />
        </>
    );
}