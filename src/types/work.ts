export interface WorkItem {
    id: string;
    title: string;
    slug: string;
    category: string;
    coverImage: string;
    galleryImages: string[];
    description: string;
    location?: string;
    published: boolean;
}