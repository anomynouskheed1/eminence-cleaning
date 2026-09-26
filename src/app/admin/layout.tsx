import { createClient } from "@/lib/supabase-server";
import Link from "next/link";
import Image from "next/image";
import AdminSignOutButton from "@/components/admin/AdminSignOutButton";

const navItems = [
    {
        label: "Services",
        href: "/admin",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
            >
                <path d="M4 20h16" />
                <path d="M6 17l4-4 3 3 5-6" />
                <path d="M15 10h3v3" />
            </svg>
        ),
    },
    {
        label: "Our Work",
        href: "/admin/work",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
            >
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <circle cx="8.5" cy="9" r="1.5" />
                <path d="M21 15l-5-5L5 20" />
            </svg>
        ),
    },
    {
        label: "Videos",
        href: "/admin/videos",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
            >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M10 9l5 3-5 3V9z" />
            </svg>
        ),
    },
    {
        label: "Clients",
        href: "/admin/clients",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
            >
                <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 00-3-3.87" />
                <path d="M16 3.13a4 4 0 010 7.75" />
            </svg>
        ),
    },
    {
        label: "Testimonials",
        href: "/admin/testimonials",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
            >
                <path d="M21 11.5a8.38 8.38 0 01-9 8.5 9.7 9.7 0 01-4-.8L3 21l1.8-4A8.3 8.3 0 013 11.5 8.5 8.5 0 0112 3a8.5 8.5 0 019 8.5z" />
            </svg>
        ),
    },
    {
        label: "Quotes",
        href: "/admin/quotes",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                <path d="M9 12h6M9 16h6M9 8h6M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16l-3-2-2 2-2-2-2 2-2-2-3 2z" />
            </svg>
        ),
    },
];

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    // Login page manages its own full-bleed layout — skip the dashboard chrome entirely
    if (!user) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-eminence-ivory">

            {/* =====================================================
                DESKTOP SIDEBAR
            ===================================================== */}
            <aside className="hidden lg:flex fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-black/10 flex-col">

                {/* LOGO */}
                <div className="h-20 px-6 flex items-center border-b border-black/10">
                    <Link
                        href="/admin"
                        className="flex items-center gap-3"
                    >
                        <div className="relative h-11 w-11 shrink-0">
                            <Image
                                src="/images/logo/logo.jpg"
                                alt="Eminence Cleaning Company"
                                fill
                                sizes="44px"
                                className="object-contain"
                            />
                        </div>

                        <div>
                            <p className="font-heading font-bold text-base text-eminence-black">
                                Eminence
                            </p>

                            <p className="text-[9px] uppercase tracking-[0.2em] text-eminence-gold">
                                Admin Panel
                            </p>
                        </div>
                    </Link>
                </div>

                {/* NAVIGATION */}
                <div className="flex-1 px-4 py-8">

                    <p className="px-3 mb-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-eminence-gray-400">
                        Manage Website
                    </p>

                    <nav className="space-y-1">

                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="
                                    group
                                    flex
                                    items-center
                                    gap-3
                                    px-3
                                    py-3
                                    text-sm
                                    text-eminence-gray-600
                                    transition-all
                                    duration-200
                                    hover:bg-eminence-ivory
                                    hover:text-eminence-black
                                "
                            >
                                <span className="text-eminence-gray-400 group-hover:text-eminence-gold transition-colors">
                                    {item.icon}
                                </span>

                                <span className="font-medium">
                                    {item.label}
                                </span>
                            </Link>
                        ))}

                    </nav>
                </div>

                {/* USER / SIGN OUT */}
                <div className="border-t border-black/10 p-5">

                    {user && (
                        <div className="mb-4">
                            <p className="text-[9px] uppercase tracking-[0.18em] text-eminence-gray-400 mb-1">
                                Signed in as
                            </p>

                            <p className="text-xs text-eminence-gray-600 truncate">
                                {user.email}
                            </p>
                        </div>
                    )}

                    <AdminSignOutButton />
                </div>
            </aside>

            {/* =====================================================
                MOBILE TOP BAR
            ===================================================== */}
            <header className="lg:hidden sticky top-0 z-50 bg-white border-b border-black/10">

                {/* Brand */}
                <div className="h-16 px-5 flex items-center justify-between">

                    <Link
                        href="/admin"
                        className="flex items-center gap-3"
                    >
                        <div className="relative h-9 w-9 shrink-0">
                            <Image
                                src="/images/logo/logo.jpg"
                                alt="Eminence Cleaning Company"
                                fill
                                sizes="36px"
                                className="object-contain"
                            />
                        </div>

                        <div>
                            <p className="font-heading font-bold text-sm text-eminence-black">
                                Eminence
                            </p>

                            <p className="text-[8px] uppercase tracking-[0.18em] text-eminence-gold">
                                Admin Panel
                            </p>
                        </div>
                    </Link>

                </div>

                {/* Mobile Navigation */}
                <div className="overflow-x-auto border-t border-black/5">
                    <nav className="flex min-w-max px-3">

                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    px-4
                                    py-3
                                    text-xs
                                    text-eminence-gray-600
                                    hover:text-eminence-black
                                    transition-colors
                                "
                            >
                                <span className="h-4 w-4">
                                    {item.icon}
                                </span>

                                {item.label}
                            </Link>
                        ))}

                    </nav>
                </div>
            </header>

            {/* =====================================================
                MAIN AREA
            ===================================================== */}
            <div className="lg:pl-64 min-h-screen">

                {/* DESKTOP TOP BAR */}
                <header className="hidden lg:flex h-20 bg-white border-b border-black/10 items-center px-8">

                    <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-eminence-gold font-semibold">
                            Eminence Cleaning Company
                        </p>

                        <p className="text-sm text-eminence-gray-500 mt-1">
                            Website Management
                        </p>
                    </div>

                </header>

                {/* PAGE CONTENT */}
                <main className="px-5 py-8 md:px-8 md:py-10 lg:px-10">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>

            </div>
        </div>
    );
}