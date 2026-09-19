import { MetadataRoute } from "next";
import { getAllServices } from "@/data/services";
import { getAllWorkItems } from "@/data/work";

const BASE_URL = "https://your-domain-here.com"; // update to your actual live domain

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const services = await getAllServices();
    const workItems = await getAllWorkItems();

    const staticPages = [
        { url: BASE_URL, priority: 1 },
        { url: `${BASE_URL}/about`, priority: 0.8 },
        { url: `${BASE_URL}/services`, priority: 0.9 },
        { url: `${BASE_URL}/work`, priority: 0.8 },
        { url: `${BASE_URL}/team`, priority: 0.6 },
        { url: `${BASE_URL}/contact`, priority: 0.7 },
    ];

    const servicePages = services.map((s) => ({
        url: `${BASE_URL}/services/${s.slug}`,
        priority: 0.8,
    }));

    const workPages = workItems.map((w) => ({
        url: `${BASE_URL}/work/${w.slug}`,
        priority: 0.6,
    }));

    return [...staticPages, ...servicePages, ...workPages].map((page) => ({
        ...page,
        lastModified: new Date(),
    }));
}