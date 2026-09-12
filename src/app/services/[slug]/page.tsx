import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import BookServiceForm from "@/components/home/BookServiceForm";
import { getServiceBySlug, getRelatedServices, getAllServices } from "@/data/services";

export async function generateStaticParams() {
    const allServices = await getAllServices();
    return allServices.map((s) => ({ slug: s.slug }));
}
const allServices = await getAllServices();
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const service = await getServiceBySlug(slug);

    if (!service) {
        return { title: "Service Not Found" };
    }

    return {
        title: service.title,
        description: service.shortDescription,
    };
}

export default async function ServicePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const service = await getServiceBySlug(slug);

    if (!service) notFound();

    const related = await getRelatedServices(service.slug);

    return (
        <>
            <Header />
            <main>
                {/* 1. SERVICE HERO */}
                <section className="relative h-[500px] md:h-[620px] w-full overflow-hidden">
                    <Image
                        src={service.coverImage}
                        alt={service.title}
                        fill
                        priority
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-eminence-black/85 via-eminence-black/30 to-transparent" />

                    <div className="relative z-10 h-full flex flex-col justify-end eminence-container pb-12 md:pb-16">
                        <Link
                            href="/services"
                            className="text-sm text-white/80 hover:text-white mb-6 inline-flex items-center gap-2 w-fit transition-colors"
                        >
                            ← All Services
                        </Link>
                        <span className="eminence-label text-white/80 mb-3">Eminence Services</span>
                        <h1 className="text-3xl md:text-5xl font-heading font-bold text-white max-w-2xl mb-4">
                            {service.title}
                        </h1>
                        <p className="text-white/85 max-w-xl mb-6">{service.shortDescription}</p>
                        <Link href="#book-service" className="btn-primary bg-eminence-green hover:bg-eminence-green-dark w-fit">
                            Book This Service
                        </Link>
                    </div>
                </section>

                {/* 2. SERVICE INTRODUCTION */}
                <section className="py-16 md:py-24">
                    <div className="eminence-container max-w-3xl">
                        <span className="eminence-label block mb-4">Overview</span>
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-eminence-black mb-6">
                            About This Service
                        </h2>
                        <div className="space-y-4">
                            {service.description.split("\n\n").map((para, i) => (
                                <p key={i} className="text-eminence-gray-600 leading-relaxed">
                                    {para}
                                </p>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 3. WHAT WE COVER */}
                <section className="py-16 md:py-24 bg-eminence-gray-50">
                    <div className="eminence-container">
                        <span className="eminence-label block mb-4">What's Included</span>
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-eminence-black mb-10">
                            What We Cover
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5">
                            {service.includedServices.map((item) => (
                                <div key={item} className="flex items-start gap-3 pb-5 border-b border-eminence-gray-200">
                                    <span className="w-1.5 h-1.5 rounded-full bg-eminence-green mt-2 shrink-0" />
                                    <span className="text-eminence-black">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. SERVICE IMAGE GALLERY */}
                {service.galleryImages.length > 0 && (
                    <section className="py-16 md:py-24">
                        <div className="eminence-container">
                            <span className="eminence-label block mb-4">Gallery</span>
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-eminence-black mb-10">
                                See The Work
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {service.galleryImages.map((img, i) => (
                                    <div
                                        key={img}
                                        className={`relative overflow-hidden bg-eminence-gray-100 ${i === 0 ? "md:col-span-2 aspect-[16/9]" : "aspect-[4/3]"
                                            }`}
                                    >
                                        <Image
                                            src={img}
                                            alt={`${service.title} — photo ${i + 1}`}
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* 5. WHY EMINENCE */}
                <section className="py-16 md:py-24 bg-eminence-black">
                    <div className="eminence-container">
                        <span className="eminence-label block mb-4 text-eminence-green">Why Choose Us</span>
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-10">
                            Why Eminence
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {service.whyEminence.map((point) => (
                                <div key={point}>
                                    <p className="text-white font-heading font-medium">{point}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 6. HOW THE SERVICE WORKS */}
                <section className="py-16 md:py-24">
                    <div className="eminence-container">
                        <span className="eminence-label block mb-4">Process</span>
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-eminence-black mb-10">
                            How It Works
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {service.process.map((step) => (
                                <div key={step.step}>
                                    <span className="text-4xl font-heading font-bold text-eminence-green/30 block mb-3">
                                        {step.step}
                                    </span>
                                    <h3 className="font-heading font-semibold text-eminence-black mb-2">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-eminence-gray-600 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 7. BOOK THIS SERVICE */}
                <section id="book-service" className="py-16 md:py-24 bg-eminence-gray-50">
                    <div className="eminence-container flex flex-col items-center text-center">
                        <span className="eminence-label block mb-4">Get Started</span>
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-eminence-black mb-10 max-w-lg">
                            Ready to book this service?
                        </h2>
                        <BookServiceForm services={allServices} defaultService={service.slug} />
                    </div>
                </section>

                {/* 8. RELATED SERVICES */}
                {related.length > 0 && (
                    <section className="py-16 md:py-24">
                        <div className="eminence-container">
                            <span className="eminence-label block mb-4">Explore More</span>
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-eminence-black mb-10">
                                You May Also Need
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {related.map((r) => (
                                    <Link key={r.slug} href={`/services/${r.slug}`} className="group block">
                                        <div className="relative aspect-[4/3] overflow-hidden mb-4 bg-eminence-gray-100">
                                            <Image
                                                src={r.coverImage}
                                                alt={r.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        </div>
                                        <h3 className="font-heading font-semibold text-eminence-black group-hover:text-eminence-green transition-colors">
                                            {r.title}
                                        </h3>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>
        </>
    );
}