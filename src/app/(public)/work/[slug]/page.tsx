import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BeforeAfterCard from "@/components/work/BeforeAfterCard";
import { getWorkItemBySlug, getAllWorkItems } from "@/data/work";

export const revalidate = 60;


type WorkDetailPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export async function generateMetadata({
    params,
}: WorkDetailPageProps) {
    const { slug } = await params;
    const work = await getWorkItemBySlug(slug);

    if (!work) {
        return {
            title: "Project Not Found | Eminence Cleaning Co.",
        };
    }

    return {
        title: `${work.title} | Eminence Cleaning Co.`,
        description:
            work.description ??
            `${work.category} project completed by Eminence Cleaning Co.`,
    };
}

export default async function WorkDetailPage({
    params,
}: WorkDetailPageProps) {
    const { slug } = await params;

    const work = await getWorkItemBySlug(slug);

    if (!work) {
        notFound();
    }

    const allWork = await getAllWorkItems();

    const related = allWork
        .filter((item) => item.slug !== work.slug)
        .slice(0, 3);

    return (
        <>
            <Header />

            <main className="bg-eminence-ivory text-eminence-black pt-20 md:pt-24">

                {/* PROJECT INTRO */}
                <section className="py-16 md:py-24">
                    <div className="eminence-container">

                        <Link
                            href="/work"
                            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-eminence-gray-500 transition-colors hover:text-eminence-gold"
                        >
                            <span aria-hidden="true">←</span>
                            Back to Our Work
                        </Link>

                        <div className="max-w-4xl">

                            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-eminence-gold">
                                {work.category}
                            </span>

                            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
                                {work.title}
                            </h1>

                            {work.location && (
                                <p className="mt-5 text-sm text-eminence-gray-500">
                                    {work.location}
                                </p>
                            )}

                            {work.description && (
                                <p className="mt-6 max-w-3xl text-base leading-8 text-eminence-gray-500 md:text-lg">
                                    {work.description}
                                </p>
                            )}

                        </div>
                    </div>
                </section>

                {/* MAIN PROJECT IMAGE */}
                {work.after && (
                    <section className="pb-16 md:pb-24">
                        <div className="eminence-container">
                            <div className="relative aspect-[16/9] w-full overflow-hidden bg-eminence-gray-100">

                                <Image
                                    src={work.after}
                                    alt={`${work.title} — after`}
                                    fill
                                    priority
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 1200px"
                                />

                            </div>
                        </div>
                    </section>
                )}

                {/* BEFORE & AFTER */}
                {work.before && work.after && (
                    <section className="bg-white py-16 md:py-24">
                        <div className="eminence-container">

                            <div className="mb-10 max-w-2xl">

                                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-eminence-gold">
                                    The Transformation
                                </span>

                                <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                                    Before & After
                                </h2>

                                <p className="mt-4 text-sm leading-7 text-eminence-gray-500">
                                    Drag across the image to see the difference
                                    made by our professional cleaning team.
                                </p>

                            </div>

                            <div className="max-w-4xl">
                                <BeforeAfterCard item={work} />
                            </div>

                        </div>
                    </section>
                )}

                {/* BOOKING CTA */}
                <section className="bg-eminence-black py-16 text-white md:py-20">
                    <div className="eminence-container text-center">

                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-eminence-gold">
                            Need Similar Results?
                        </span>

                        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight md:text-5xl">
                            Let Eminence clean your space.
                        </h2>

                        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/60 md:text-base">
                            Professional cleaning services for homes, offices,
                            commercial spaces and specialized environments.
                        </p>

                        <Link
                            href="/contact"
                            className="mt-8 inline-flex items-center gap-2 bg-eminence-gold px-7 py-4 text-sm font-semibold text-black transition hover:opacity-90"
                        >
                            Book a Service
                            <span aria-hidden="true">→</span>
                        </Link>

                    </div>
                </section>

                {/* RELATED WORK */}
                {related.length > 0 && (
                    <section className="bg-eminence-ivory py-16 md:py-24">
                        <div className="eminence-container">

                            <div className="mb-10">

                                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-eminence-gold">
                                    Explore More
                                </span>

                                <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                                    Related Work
                                </h2>

                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

                                {related.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={`/work/${encodeURIComponent(item.slug)}`}
                                        className="group overflow-hidden border border-black/10 bg-white"
                                    >

                                        <div className="relative aspect-[4/3] overflow-hidden">

                                            <Image
                                                src={item.after}
                                                alt={item.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                            />

                                        </div>

                                        <div className="p-5">

                                            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-eminence-gold">
                                                {item.category}
                                            </span>

                                            <h3 className="mt-2 text-lg font-semibold transition-colors group-hover:text-eminence-gold">
                                                {item.title}
                                            </h3>

                                            {item.location && (
                                                <p className="mt-2 text-sm text-eminence-gray-500">
                                                    {item.location}
                                                </p>
                                            )}

                                        </div>

                                    </Link>
                                ))}

                            </div>

                        </div>
                    </section>
                )}

            </main>

            <Footer />
        </>
    );
}