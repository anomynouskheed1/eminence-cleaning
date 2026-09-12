import { supabase } from "@/lib/supabase";
import { WorkItem } from "@/types/work";

function mapRow(row: any): WorkItem {
    return {
        id: row.id,
        title: row.title,
        slug: row.slug,
        category: row.category,
        coverImage: row.cover_image,
        galleryImages: row.gallery_images ?? [],
        description: row.description,
        location: row.location ?? undefined,
        published: row.published,
    };
}

export async function getAllWorkItems(): Promise<WorkItem[]> {
    const { data, error } = await supabase
        .from("work_items")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: true });

    if (error) {
        console.error("Error fetching work items:", error);
        return [];
    }
    return data.map(mapRow);
}

export async function getWorkItemBySlug(slug: string): Promise<WorkItem | undefined> {
    const { data, error } = await supabase
        .from("work_items")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();

    if (error || !data) return undefined;
    return mapRow(data);
}

export async function getRelatedWork(currentSlug: string, count = 2): Promise<WorkItem[]> {
    const { data, error } = await supabase
        .from("work_items")
        .select("*")
        .eq("published", true)
        .neq("slug", currentSlug)
        .limit(count);

    if (error) {
        console.error("Error fetching related work:", error);
        return [];
    }
    return data.map(mapRow);
}