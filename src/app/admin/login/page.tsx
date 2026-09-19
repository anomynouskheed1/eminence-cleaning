"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase-browser";

export default function AdminLoginPage() {
    const router = useRouter();
    const supabase = createClient();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        setLoading(false);

        if (error) {
            setError("Invalid email or password.");
            return;
        }

        router.push("/admin");
        router.refresh();
    };

    return (
        <main className="relative min-h-screen overflow-hidden flex items-center justify-center px-4">

            {/* =====================================================
                BACKGROUND IMAGE
            ===================================================== */}
            <div className="absolute inset-0">

                <Image
                    src="/images/team/team-hero.jpg"
                    alt=""
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center"
                />

                {/* Single controlled overlay */}
                <div className="absolute inset-0 bg-black/45" />

                {/* Slight bottom darkening for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

            </div>

            {/* =====================================================
                LOGIN CONTENT
            ===================================================== */}
            <div className="relative z-10 w-full max-w-sm">

                {/* LOGO */}
                <div className="flex flex-col items-center justify-center mb-8">

                    <div className="relative h-16 w-16 mb-3">
                        <Image
                            src="/images/logo/logo.jpg"
                            alt="Eminence Cleaning Company"
                            fill
                            priority
                            sizes="64px"
                            className="object-contain"
                        />
                    </div>

                    <h2 className="font-heading text-2xl font-bold text-white">
                        Eminence
                    </h2>

                    <p className="text-xs uppercase tracking-[0.25em] text-white/60 mt-1">
                        Cleaning Company
                    </p>

                </div>

                {/* =================================================
                    LOGIN CARD
                ================================================= */}
                <div className="bg-eminence-ivory p-7 md:p-8 shadow-2xl">

                    <div className="mb-6">

                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-eminence-gold">
                            Administration
                        </span>

                        <h1 className="text-2xl font-heading font-bold text-eminence-black mt-2">
                            Admin Sign In
                        </h1>

                        <p className="text-sm text-eminence-gray-600 mt-2">
                            Sign in to manage your website.
                        </p>

                    </div>

                    <form
                        onSubmit={handleLogin}
                        className="space-y-5"
                    >

                        {/* EMAIL */}
                        <div>

                            <label
                                htmlFor="email"
                                className="block text-xs font-medium text-eminence-gray-600 mb-1.5"
                            >
                                Email
                            </label>

                            <input
                                id="email"
                                type="email"
                                required
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="
                                    w-full
                                    border
                                    border-eminence-gray-200
                                    bg-white
                                    px-4
                                    py-3
                                    text-sm
                                    text-eminence-black
                                    placeholder:text-eminence-gray-400
                                    focus:outline-none
                                    focus:border-eminence-gold
                                    focus:ring-1
                                    focus:ring-eminence-gold
                                    transition
                                "
                                placeholder="admin@example.com"
                            />

                        </div>

                        {/* PASSWORD */}
                        <div>

                            <label
                                htmlFor="password"
                                className="block text-xs font-medium text-eminence-gray-600 mb-1.5"
                            >
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="
                                    w-full
                                    border
                                    border-eminence-gray-200
                                    bg-white
                                    px-4
                                    py-3
                                    text-sm
                                    text-eminence-black
                                    focus:outline-none
                                    focus:border-eminence-gold
                                    focus:ring-1
                                    focus:ring-eminence-gold
                                    transition
                                "
                                placeholder="Enter your password"
                            />

                        </div>

                        {/* ERROR */}
                        {error && (
                            <div className="border border-red-200 bg-red-50 px-4 py-3">
                                <p className="text-sm text-red-600">
                                    {error}
                                </p>
                            </div>
                        )}

                        {/* BUTTON */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                btn-gold
                                w-full
                                py-3
                                disabled:opacity-60
                                disabled:cursor-not-allowed
                            "
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>

                    </form>

                </div>

                {/* FOOTER */}
                <p className="text-center text-xs text-white/50 mt-6">
                    Eminence Cleaning Company · Admin Panel
                </p>

            </div>

        </main>
    );
}