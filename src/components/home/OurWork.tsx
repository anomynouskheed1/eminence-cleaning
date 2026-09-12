import Image from "next/image";
import Link from "next/link";
import { getAllWorkItems } from "@/data/work";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default async function OurWork() {
    const workItems = await getAllWorkItems();
    return (
        <section id="our-work" className="py-20 md:py-28 scroll-mt-24">
            <div className="eminence-container">
                <RevealOnScroll>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
                        <div>
                            <span className="eminence-label block mb-3">Our Work</span>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-eminence-black max-w-xl">
                                A Look at What We Do
                            </h2>
                        </div>
                    </div>
                </RevealOnScroll>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {workItems.map((item, i) => (
                        <RevealOnScroll key={item.slug} delay={i * 100}>
                            <Link
                                href={`/work/${item.slug}`}
                                className="group relative block aspect-[4/3] overflow-hidden bg-eminence-gray-100"
                            >
                                <Image
                                    src={item.coverImage}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-eminence-black/80 via-eminence-black/10 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-5">
                                    <h3 className="font-heading font-semibold text-white mb-1">
                                        {item.title}
                                    </h3>
                                    <span className="text-xs text-white/70">{item.category}</span>
                                </div>
                            </Link>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
}