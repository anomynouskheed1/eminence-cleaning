import { supabase } from "@/lib/supabase";
import { VideoItem } from "@/types/video";

function mapRow(row: any): VideoItem {
    return {
        id: row.id,
        title: row.title,
        category: row.category,
        videoUrl: row.video_url,
        poster: row.poster ?? undefined,
        caption: row.caption ?? undefined,
        published: row.published,
    };
}

export async function getAllVideos(): Promise<VideoItem[]> {
    const { data, error } = await supabase
        .from("videos")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: true });

    if (error) {
        console.error("Error fetching videos:", error);
        return [];
    }
    return data.map(mapRow);
}

export async function getFeaturedVideos(count = 3): Promise<VideoItem[]> {
    const { data, error } = await supabase
        .from("videos")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: true })
        .limit(count);

    if (error) {
        console.error("Error fetching featured videos:", error);
        return [];
    }
    return data.map(mapRow);
}