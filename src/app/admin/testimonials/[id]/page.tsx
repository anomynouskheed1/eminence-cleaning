import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import TestimonialForm from "@/components/admin/TestimonialForm";

export default async function EditTestimonialPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const supabase = await createClient();

    const { data, error } = await supabase.from("testimonials").select("*").eq("id", id).single();

    if (error || !data) notFound();

    return (
        <div>
            <h1 className="text-2xl font-heading font-bold text-eminence-black mb-8">Edit Testimonial</h1>
            <TestimonialForm existingTestimonial={data} />
        </div>
    );
}