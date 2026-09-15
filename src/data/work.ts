import { supabase } from "@/lib/supabase";
import { WorkItem } from "@/types/work";

function mapRow(row: any): WorkItem {
    return {
        id: row.id,
        title: row.title,
        category: row.category,
        slug: row.slug,
        before: row.before_image ?? undefined,
        after: row.after_image,
        description: row.description ?? undefined,
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

export async function getWorkItemBySlug(
    slug: string
): Promise<WorkItem | undefined> {
    const decodedSlug = decodeURIComponent(slug).trim();

    const { data, error } = await supabase
        .from("work_items")
        .select("*")
        .eq("slug", decodedSlug)
        .eq("published", true)
        .single();

    if (error || !data) {
        console.error("Error fetching work item:", error);
        return undefined;
    }

    return mapRow(data);
}

export async function getFeaturedWorkItems(count = 4): Promise<WorkItem[]> {
    const { data, error } = await supabase
        .from("work_items")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: true })
        .limit(count);

    if (error) {
        console.error("Error fetching featured work items:", error);
        return [];
    }
    return data.map(mapRow);
}

export const workCategories = [
    "All",
    "Commercial",
    "Residential",
    "Carpet & Upholstery",
    "Post-Construction",
    "Outdoor / Facility",
    "Specialized",
] as const;