import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import QuoteDetailClient from "@/components/admin/QuoteDetailClient";

export default async function QuoteDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: quote, error } = await supabase
        .from("quote_requests")
        .select("*")
        .eq("id", id)
        .single();

    if (error || !quote) notFound();

    return <QuoteDetailClient quote={quote} />;
}