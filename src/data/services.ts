import { supabase } from "@/lib/supabase";
import { Service } from "@/types/service";

// Maps a raw Supabase row (snake_case) to our app's Service type (camelCase)
function mapRow(row: any): Service {
    return {
        id: row.id,
        title: row.title,
        slug: row.slug,
        shortDescription: row.short_description,
        description: row.description,
        coverImage: row.cover_image,
        galleryImages: row.gallery_images ?? [],
        includedServices: row.included_services ?? [],
        whyEminence: row.why_eminence ?? [],
        process: row.process_steps ?? [],
        featured: row.featured,
        published: row.published,
    };
}

export async function getFeaturedServices(): Promise<Service[]> {
    const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("featured", true)
        .eq("published", true)
        .order("created_at", { ascending: true });

    if (error) {
        console.error("Error fetching featured services:", error);
        return [];
    }
    return data.map(mapRow);
}

export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
    const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();

    if (error || !data) return undefined;
    return mapRow(data);
}

export async function getAllServices(): Promise<Service[]> {
    const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: true });

    if (error) {
        console.error("Error fetching services:", error);
        return [];
    }
    return data.map(mapRow);
}

export async function getRelatedServices(currentSlug: string, count = 3): Promise<Service[]> {
    const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("published", true)
        .neq("slug", currentSlug)
        .limit(count);

    if (error) {
        console.error("Error fetching related services:", error);
        return [];
    }
    return data.map(mapRow);
}