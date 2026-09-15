import { supabase } from "@/lib/supabase";

export interface Testimonial {
    id: string;
    quote: string;
    author?: string;
    role?: string;
    avatar?: string;
}

function mapRow(row: any): Testimonial {
    return {
        id: row.id,
        quote: row.quote,
        author: row.author ?? undefined,
        role: row.role ?? undefined,
        avatar: row.avatar ?? undefined,
    };
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
    const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("published", true)
        .order("display_order", { ascending: true });

    if (error) {
        console.error("Error fetching testimonials:", error);
        return [];
    }
    return data.map(mapRow);
}