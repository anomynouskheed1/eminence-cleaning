import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import VideoForm from "@/components/admin/VideoForm";

export default async function EditVideoPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("videos")
        .select("*")
        .eq("id", id)
        .single();

    if (error || !data) notFound();

    return (
        <div>
            <h1 className="text-2xl font-heading font-bold text-eminence-black mb-8">
                Edit Video
            </h1>
            <VideoForm existingVideo={data} />
        </div>
    );
}