export interface VideoItem {
    id: string;
    title: string;
    category: string;
    videoUrl: string;
    poster?: string;
    caption?: string;
    published: boolean;
}