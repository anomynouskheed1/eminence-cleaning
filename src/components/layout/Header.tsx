"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Our Work", href: "/#our-work" },
    { label: "Contact", href: "/contact" },
];

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-white border-b border-eminence-gray-200">
            <div className="eminence-container flex items-center justify-between h-20 md:h-24">
                <Link href="/" className="flex items-center gap-2 md:gap-3 min-w-0">
                    <Image
                        src="/images/logo/logo.jpg"
                        alt="Eminence Cleaners Logo"
                        width={40}
                        height={40}
                        className="h-8 w-8 md:h-10 md:w-10 object-contain shrink-0"
                        priority
                    />
                    <span className="font-heading text-lg sm:text-xl md:text-3xl font-bold tracking-tight text-eminence-black truncate">
                        Eminence Cleaners
                    </span>
                </Link>
                <nav className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-semibold text-eminence-black hover:text-eminence-green transition-colors duration-300"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <button
                    className="md:hidden flex flex-col gap-1.5 p-2"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`block w-6 h-0.5 bg-eminence-black transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
                    <span className={`block w-6 h-0.5 bg-eminence-black transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
                    <span className={`block w-6 h-0.5 bg-eminence-black transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                </button>
            </div>

            {menuOpen && (
                <nav className="md:hidden border-t border-eminence-gray-200 bg-white">
                    <div className="eminence-container flex flex-col py-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="py-3 text-sm font-medium text-eminence-black hover:text-eminence-green transition-colors"
                                onClick={() => setMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </nav>
            )}
        </header>
    );
}