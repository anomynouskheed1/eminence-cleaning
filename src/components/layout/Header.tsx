"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Our Work", href: "/work" },
    { label: "Our Team", href: "/team" },
    { label: "Contact", href: "/contact" },
];

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 60);
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 animate-header-in transition-all duration-300 ${scrolled
                    ? "bg-eminence-ivory border-b border-eminence-black/10"
                    : "bg-transparent border-b border-transparent"
                }`}
        >
            <div className="eminence-container h-20 md:h-24 flex items-center justify-between">
                {/* =====================================================
            BRAND
        ====================================================== */}
                <Link
                    href="/"
                    className="flex items-center gap-3 md:gap-4 min-w-0 group"
                    onClick={() => setMenuOpen(false)}
                >
                    <div className="relative h-10 w-10 md:h-12 md:w-12 shrink-0 overflow-hidden">
                        <Image
                            src="/images/logo/logo.jpg"
                            alt="Eminence Cleaning Company"
                            fill
                            priority
                            sizes="48px"
                            className="object-contain"
                        />
                    </div>

                    <div className="min-w-0">
                        <span
                            className={`
                block
                font-heading
                text-lg
                sm:text-xl
                md:text-2xl
                font-bold
                tracking-tight
                leading-none
                whitespace-nowrap
                transition-colors
                duration-300
                ${scrolled ? "text-eminence-black" : "text-white"}
              `}
                        >
                            Eminence Cleaning Co.
                        </span>

                        <span
                            className={`
                hidden
                sm:block
                mt-1.5
                text-[9px]
                md:text-[10px]
                uppercase
                tracking-[0.22em]
                transition-colors
                duration-300
                ${scrolled ? "text-eminence-gray-500" : "text-white/70"}
              `}
                        >
                            Where Cleanliness Meets Class
                        </span>
                    </div>
                </Link>

                {/* =====================================================
            DESKTOP NAVIGATION
        ====================================================== */}
                <nav className="hidden md:flex items-center gap-8 lg:gap-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`
                relative
                py-2
                text-[14px]
                lg:text-[15px]
                font-medium
                transition-colors
                duration-300
                hover:text-eminence-gold
                group
                ${scrolled ? "text-eminence-black" : "text-white"}
              `}
                        >
                            {link.label}

                            {/* Gold underline */}
                            <span
                                className="
                  absolute
                  left-0
                  right-0
                  -bottom-0.5
                  h-px
                  bg-eminence-gold
                  scale-x-0
                  origin-left
                  transition-transform
                  duration-300
                  group-hover:scale-x-100
                "
                            />
                        </Link>
                    ))}
                </nav>

                {/* =====================================================
            MOBILE MENU BUTTON
        ====================================================== */}
                <button
                    type="button"
                    className={`
            md:hidden
            relative
            flex
            h-11
            w-11
            items-center
            justify-center
            border
            bg-transparent
            transition-colors
            duration-300
            hover:border-eminence-gold
            ${scrolled ? "border-eminence-black/10 text-eminence-black" : "border-white/30 text-white"}
          `}
                    onClick={() => setMenuOpen((open) => !open)}
                    aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={menuOpen}
                >
                    <span className="relative block h-5 w-6">
                        {/* Top */}
                        <span
                            className={`
                absolute
                left-0
                top-0
                block
                h-[1.5px]
                w-6
                bg-current
                transition-all
                duration-300
                ${menuOpen ? "top-2 rotate-45" : ""}
              `}
                        />

                        {/* Middle */}
                        <span
                            className={`
                absolute
                left-0
                top-2
                block
                h-[1.5px]
                w-6
                bg-current
                transition-all
                duration-300
                ${menuOpen ? "opacity-0" : "opacity-100"}
              `}
                        />

                        {/* Bottom */}
                        <span
                            className={`
                absolute
                left-0
                top-4
                block
                h-[1.5px]
                w-6
                bg-current
                transition-all
                duration-300
                ${menuOpen ? "top-2 -rotate-45" : ""}
              `}
                        />
                    </span>
                </button>
            </div>

            {/* =====================================================
          MOBILE NAVIGATION
      ====================================================== */}
            <div
                className={`
          md:hidden
          overflow-hidden
          border-t
          border-eminence-black/10
          bg-eminence-ivory
          transition-all
          duration-300
          ease-in-out
          ${menuOpen
                        ? "max-h-[420px] opacity-100"
                        : "max-h-0 opacity-0"
                    }
        `}
            >
                <nav className="eminence-container py-3">
                    {navLinks.map((link, index) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className="
                flex
                items-center
                justify-between
                border-b
                border-eminence-black/8
                py-4
                text-[15px]
                font-medium
                text-eminence-black
                transition-colors
                duration-300
                hover:text-eminence-gold
              "
                        >
                            <span>{link.label}</span>

                            <span className="text-eminence-gold text-sm">
                                →
                            </span>
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}