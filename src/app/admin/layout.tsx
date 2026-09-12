import { createClient } from "@/lib/supabase-server";
import Link from "next/link";
import AdminSignOutButton from "@/components/admin/AdminSignOutButton";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <div className="min-h-screen bg-eminence-gray-50">
            <header className="bg-white border-b border-eminence-gray-200">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/admin" className="font-heading font-bold text-eminence-black">
                        Eminence Admin
                    </Link>
                    <nav className="flex items-center gap-6 text-sm">
                        <Link href="/admin" className="text-eminence-black hover:text-eminence-green transition-colors">
                            Services
                        </Link>
                        <Link href="/admin/work" className="text-eminence-black hover:text-eminence-green transition-colors">
                            Our Work
                        </Link>
                        {user && <span className="text-eminence-gray-600 text-xs">{user.email}</span>}
                        {user && <AdminSignOutButton />}
                    </nav>
                </div>
            </header>
            <main className="max-w-6xl mx-auto px-6 py-10">{children}</main>
        </div>
    );
}