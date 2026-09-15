import Link from "next/link";
import Image from "next/image";
import { getFeaturedServices } from "@/data/services";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default async function ServicesSection() {
    const featured = await getFeaturedServices();

    return (
        <section className="py-20 md:py-28 bg-white">
            <div className="eminence-container">
                <RevealOnScroll>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
                        <div>
                            <span className="eminence-label block mb-3">Our Services</span>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-eminence-black max-w-xl">
                                Residential, Commercial & Industrial Cleaning Solutions
                            </h2>
                        </div>
                        <Link href="/services" className="btn-secondary shrink-0">
                            View All Services →
                        </Link>
                    </div>
                </RevealOnScroll>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featured.map((service, i) => (
                        <RevealOnScroll key={service.slug} delay={i * 100}>
                            <Link
                                href={`/services/${service.slug}`}
                                className="group block border border-eminence-gold/15 hover:border-eminence-gold transition-colors duration-300"
                            >
                                <div className="relative aspect-[4/3] overflow-hidden bg-eminence-gray-100">
                                    <Image
                                        src={service.coverImage}
                                        alt={service.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-5">
                                    <h3 className="font-heading font-semibold text-eminence-black mb-2 group-hover:text-eminence-gold transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-sm text-eminence-gray-600 mb-4 leading-relaxed">
                                        {service.shortDescription}
                                    </p>
                                    <span className="text-sm font-medium text-eminence-gold inline-flex items-center gap-1.5">
                                        View Service
                                        <span className="transition-transform group-hover:translate-x-1">→</span>
                                    </span>
                                </div>
                            </Link>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
}