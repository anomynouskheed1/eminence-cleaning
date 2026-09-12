"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

        const { error } = await supabase.auth.signInWithPassword({ email, password });

        setLoading(false);

        if (error) {
            setError("Invalid email or password.");
            return;
        }

        router.push("/admin");
        router.refresh();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-eminence-gray-50 px-4">
            <div className="w-full max-w-sm bg-white border border-eminence-gray-200 p-8">
                <h1 className="text-xl font-heading font-bold text-eminence-black mb-1">
                    Eminence Admin
                </h1>
                <p className="text-sm text-eminence-gray-600 mb-6">Sign in to manage your site.</p>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-eminence-gray-600 mb-1.5">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-eminence-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-eminence-green"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-eminence-gray-600 mb-1.5">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-eminence-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-eminence-green"
                        />
                    </div>

                    {error && <p className="text-sm text-red-600">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full bg-eminence-green hover:bg-eminence-green-dark disabled:opacity-60"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
}