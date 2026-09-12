export interface ProcessStep {
    step: string; // "01"
    title: string;
    description: string;
}

export interface Service {
    id: string;
    title: string;
    slug: string;
    shortDescription: string;
    description: string; // 2-3 paragraphs, can contain \n\n for breaks
    coverImage: string;
    galleryImages: string[];
    includedServices: string[];
    whyEminence: string[];
    process: ProcessStep[];
    featured: boolean;
    published: boolean;
}