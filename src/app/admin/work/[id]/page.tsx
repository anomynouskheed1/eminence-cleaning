import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import WorkForm from "@/components/admin/WorkForm";

export default async function EditWorkPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("work_items")
        .select("*")
        .eq("id", id)
        .single();

    if (error || !data) notFound();

    return (
        <div>
            <h1 className="text-2xl font-heading font-bold text-eminence-black mb-8">
                Edit Project
            </h1>
            <WorkForm existingWork={data} />
        </div>
    );
}