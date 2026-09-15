import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import ClientForm from "@/components/admin/ClientForm";

export default async function EditClientPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const supabase = await createClient();

    const { data, error } = await supabase.from("clients").select("*").eq("id", id).single();

    if (error || !data) notFound();

    return (
        <div>
            <h1 className="text-2xl font-heading font-bold text-eminence-black mb-8">Edit Client</h1>
            <ClientForm existingClient={data} />
        </div>
    );
}