import Link from "next/link";
import { createClient } from "@/lib/supabase-server";

const statusColors: Record<string, string> = {
    New: "bg-eminence-gold/15 text-eminence-gold",
    Reviewing: "bg-blue-100 text-blue-700",
    Contacted: "bg-purple-100 text-purple-700",
    Quoted: "bg-amber-100 text-amber-700",
    Approved: "bg-green-100 text-green-700",
    Completed: "bg-eminence-gray-100 text-eminence-gray-600",
    Cancelled: "bg-red-100 text-red-700",
};

export default async function AdminQuotesPage() {
    const supabase = await createClient();
    const { data: quotes } = await supabase
        .from("quote_requests")
        .select("*")
        .order("created_at", { ascending: false });

    const items = quotes ?? [];

    return (
        <div>
            <h1 className="text-2xl font-heading font-bold text-eminence-black mb-8">
                Quote Requests
            </h1>

            <div className="bg-white border border-eminence-gold/15">
                {items.length === 0 && (
                    <p className="p-6 text-sm text-eminence-gray-600">No quote requests yet.</p>
                )}
                {items.map((q) => (
                    <Link
                        key={q.id}
                        href={`/admin/quotes/${q.id}`}
                        className="flex items-center justify-between gap-4 p-4 border-b border-eminence-gold/10 last:border-b-0 hover:bg-eminence-ivory transition-colors"
                    >
                        <div className="min-w-0">
                            <p className="font-medium text-eminence-black truncate">{q.full_name}</p>
                            <p className="text-sm text-eminence-gray-600 truncate">
                                {q.property_type} · {q.location} · {q.services?.join(", ")}
                            </p>
                            <p className="text-xs text-eminence-gray-400 mt-1">
                                {new Date(q.created_at).toLocaleDateString()}
                            </p>
                        </div>
                        <span className={`text-xs px-2.5 py-1 rounded shrink-0 ${statusColors[q.status] ?? "bg-eminence-gray-100 text-eminence-gray-600"}`}>
                            {q.status}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}