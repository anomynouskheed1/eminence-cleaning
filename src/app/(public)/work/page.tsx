import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import VideoCard from "@/components/work/VideoCard";
import { getAllVideos } from "@/data/videos";

import { createClient } from "@/lib/supabase-server";

export const revalidate = 60;
type WorkItem = {
    id: string;
    title: string;
    slug: string;
    category: string;
    cover_image: string;
    description: string;
    location: string | null;
    published: boolean;
};

export default async function WorkPage() {
    const supabase = await createClient();

    const { data: workItems, error } = await supabase
        .from("work_items")
        .select(
            `
        id,
        title,
        slug,
        category,
        cover_image,
        description,
        location,
        published
      `
        )
        .eq("published", true)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error loading work:", error);
    }

    const items: WorkItem[] = workItems ?? [];
    const videos = await getAllVideos();

    return (
        <>
            <Header />
            <main className="min-h-screen bg-[#f7f3ea] text-black">
                {/* HERO */}
                <section className="relative overflow-hidden border-b border-black/10">
                    <div className="eminence-container py-20 md:py-28">
                        <div className="max-w-3xl">
                            <span className="mb-5 inline-flex border border-[#c6a15b]/40 bg-[#c6a15b]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#9a762d]">
                                Our Work
                            </span>

                            <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
                                Work that speaks for itself.
                            </h1>

                            <p className="mt-6 max-w-2xl text-base leading-8 text-black/60 md:text-lg">
                                Explore selected cleaning projects completed by Eminence
                                Cleaning Co. across residential, commercial, and specialized
                                environments.
                            </p>
                        </div>
                    </div>
                </section>

                {/* PROJECTS */}
                <section className="eminence-container py-16 md:py-24">
                    <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
                        <div>
                            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a762d]">
                                Recent Projects
                            </span>

                            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                                Our Work
                            </h2>
                        </div>

                        <p className="max-w-md text-sm leading-7 text-black/55">
                            A look at the spaces our team has cleaned, refreshed, and
                            transformed.
                        </p>
                    </div>

                    {items.length === 0 ? (
                        <div className="border border-black/10 bg-white px-6 py-16 text-center">
                            <h3 className="text-xl font-semibold">
                                Our work is being updated
                            </h3>

                            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-black/55">
                                We are currently preparing our latest cleaning projects for
                                display. Please check back shortly.
                            </p>

                            <Link
                                href="/contact"
                                className="mt-7 inline-flex items-center gap-2 bg-[#c6a15b] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#d6b873]"
                            >
                                Book a Service
                                <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
                            {items.map((item) => (
                                <Link
                                    key={item.id}
                                    href={`/work/${item.slug}`}
                                    className="group overflow-hidden border border-black/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                >
                                    {/* IMAGE */}
                                    <div className="relative aspect-[4/3] overflow-hidden bg-black/5">
                                        <Image
                                            src={item.cover_image}
                                            alt={item.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />

                                        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />

                                        <div className="absolute left-4 top-4">
                                            <span className="bg-black px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-white">
                                                {item.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* CONTENT */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-[#9a762d]">
                                            {item.title}
                                        </h3>

                                        {item.location && (
                                            <div className="mt-3 flex items-center gap-2 text-sm text-black/50">
                                                <span
                                                    aria-hidden="true"
                                                    className="text-[#9a762d]"
                                                >
                                                    •
                                                </span>

                                                <span>{item.location}</span>
                                            </div>
                                        )}

                                        <p className="mt-4 line-clamp-3 text-sm leading-7 text-black/60">
                                            {item.description}
                                        </p>

                                        <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#9a762d]">
                                            <span>View Project</span>

                                            <span
                                                aria-hidden="true"
                                                className="transition-transform duration-300 group-hover:translate-x-1"
                                            >
                                                →
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </section>

                {/* VIDEO SHOWCASE */}
                {videos.length > 0 && (
                    <section className="eminence-container py-16 md:py-24 border-t border-black/10">
                        <div className="mb-10">
                            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a762d]">
                                Video Showcase
                            </span>
                            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                                See Our Work In Action
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {videos.map((video) => (
                                <VideoCard
                                    key={video.id}
                                    title={video.title}
                                    category={video.category}
                                    videoUrl={video.videoUrl}
                                    poster={video.poster}
                                    caption={video.caption}
                                />
                            ))}
                        </div>
                    </section>
                )}

                {/* CTA */}
                <section className="border-t border-black/10 bg-black text-white">
                    <div className="eminence-container py-16 text-center md:py-20">
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c6a15b]">
                            Need a Cleaning Service?
                        </span>

                        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight md:text-5xl">
                            Let us transform your space.
                        </h2>

                        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/60 md:text-base">
                            From homes and offices to specialized cleaning projects, Eminence
                            Cleaning Co. is ready to deliver professional results.
                        </p>

                        <Link
                            href="/contact"
                            className="mt-8 inline-flex items-center gap-2 bg-[#c6a15b] px-7 py-4 text-sm font-semibold text-black transition hover:bg-[#d6b873]"
                        >
                            Book a Service
                            <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}