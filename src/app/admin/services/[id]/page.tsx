import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import ServiceForm from "@/components/admin/ServiceForm";

export default async function EditServicePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("id", id)
        .single();

    if (error || !data) notFound();

    return (
        <div>
            <h1 className="text-2xl font-heading font-bold text-eminence-black mb-8">
                Edit Service
            </h1>
            <ServiceForm existingService={data} />
        </div>
    );
}   