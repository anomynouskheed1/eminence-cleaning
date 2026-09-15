export interface WorkItem {
    id: string;
    title: string;
    category: string;
    slug: string;
    before?: string; // optional — not every real photo has a matching "before" shot
    after: string; // the main/showcase image — always required
    description?: string;
    location?: string;
    published: boolean;
}