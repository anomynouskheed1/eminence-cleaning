import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getWorkItemBySlug, getRelatedWork, getAllWorkItems } from "@/data/work";

export async function generateStaticParams() {
    const allWork = await getAllWorkItems();
    return allWork.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const work = await getWorkItemBySlug(slug);

    if (!work) {
        return { title: "Project Not Found" };
    }

    return {
        title: work.title,
        description: work.description.split("\n\n")[0],
    };
}

export default async function WorkDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const work = await getWorkItemBySlug(slug);

    if (!work) notFound();

    const related = await getRelatedWork(work.slug);

    return (
        <>
            <Header />
            <main>
                {/* HERO */}
                <section className="relative h-[420px] md:h-[520px] w-full overflow-hidden">
                    <Image
                        src={work.coverImage}
                        alt={work.title}
                        fill
                        priority
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-eminence-black/85 via-eminence-black/25 to-transparent" />

                    <div className="relative z-10 h-full flex flex-col justify-end eminence-container pb-12 md:pb-16">
                        <Link
                            href="/#our-work"
                            className="text-sm text-white/80 hover:text-white mb-6 inline-flex items-center gap-2 w-fit transition-colors"
                        >
                            ← All Work
                        </Link>
                        <span className="eminence-label text-white/80 mb-3">{work.category}</span>
                        <h1 className="text-3xl md:text-5xl font-heading font-bold text-white max-w-2xl">
                            {work.title}
                        </h1>
                        {work.location && (
                            <p className="text-white/70 text-sm mt-3">{work.location}</p>
                        )}
                    </div>
                </section>

                {/* DESCRIPTION */}
                <section className="py-16 md:py-24">
                    <div className="eminence-container max-w-3xl">
                        <span className="eminence-label block mb-4">Overview</span>
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-eminence-black mb-6">
                            About This Project
                        </h2>
                        <div className="space-y-4">
                            {work.description.split("\n\n").map((para: string, i: number) => (
                                <p key={i} className="text-eminence-gray-600 leading-relaxed">
                                    {para}
                                </p>
                            ))}
                        </div>
                    </div>
                </section>

                {/* GALLERY */}
                {work.galleryImages.length > 0 && (
                    <section className="py-16 md:py-24 bg-eminence-gray-50">
                        <div className="eminence-container">
                            <span className="eminence-label block mb-4">Gallery</span>
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-eminence-black mb-10">
                                A Closer Look
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {work.galleryImages.map((img: string, i: number) => (
                                    <div
                                        key={img}
                                        className={`relative overflow-hidden bg-eminence-gray-100 ${i === 0 ? "md:col-span-2 aspect-[16/9]" : "aspect-[4/3]"
                                            }`}
                                    >
                                        <Image
                                            src={img}
                                            alt={`${work.title} — photo ${i + 1}`}
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* RELATED WORK */}
                {related.length > 0 && (
                    <section className="py-16 md:py-24">
                        <div className="eminence-container">
                            <span className="eminence-label block mb-4">More Work</span>
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-eminence-black mb-10">
                                Other Projects
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {related.map((r) => (
                                    <Link key={r.slug} href={`/work/${r.slug}`} className="group relative block aspect-[16/9] overflow-hidden bg-eminence-gray-100">
                                        <Image
                                            src={r.coverImage}
                                            alt={r.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-eminence-black/80 via-eminence-black/10 to-transparent" />
                                        <div className="absolute bottom-0 left-0 p-5">
                                            <h3 className="font-heading font-semibold text-white mb-1">{r.title}</h3>
                                            <span className="text-xs text-white/70">{r.category}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* CTA back to booking */}
                <section className="py-16 md:py-24 bg-eminence-gray-50 text-center">
                    <div className="eminence-container">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-eminence-black mb-6">
                            Interested in a service like this?
                        </h2>
                        <Link href="/#book-a-service" className="btn-primary bg-eminence-green hover:bg-eminence-green-dark">
                            Book a Service →
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}