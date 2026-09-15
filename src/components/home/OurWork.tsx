import Link from "next/link";
import { getFeaturedWorkItems } from "@/data/work";
import BeforeAfterCard from "@/components/work/BeforeAfterCard";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default async function OurWork() {
    const items = await getFeaturedWorkItems(4);

    return (
        <section id="our-work" className="py-20 md:py-28 scroll-mt-24 bg-eminence-ivory">
            <div className="eminence-container">
                <RevealOnScroll>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
                        <div>
                            <span className="eminence-label block mb-3">Our Work</span>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-eminence-black max-w-xl">
                                The difference is visible
                            </h2>
                            <p className="text-eminence-gray-600 mt-3 max-w-lg">
                                Professional cleaning makes a real difference. See the
                                transformation for yourself.
                            </p>
                        </div>
                        <Link href="/work" className="btn-secondary shrink-0">
                            View Full Gallery →
                        </Link>
                    </div>
                </RevealOnScroll>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {items.map((item, i) => (
                        <RevealOnScroll key={item.id} delay={i * 100}>
                            <BeforeAfterCard item={item} />
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
}