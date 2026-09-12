"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

export default function AdminSignOutButton() {
    const router = useRouter();
    const supabase = createClient();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/admin/login");
        router.refresh();
    };

    return (
        <button
            onClick={handleSignOut}
            className="text-sm text-eminence-gray-600 hover:text-eminence-green transition-colors"
        >
            Sign Out
        </button>
    );
}