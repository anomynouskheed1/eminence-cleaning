import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getAllServices } from "@/data/services";

export const revalidate = 60;
export const metadata = {
    title: "Our Services",
    description:
        "Explore Eminence Cleaning Company's full range of services — office, residential, carpet, fumigation, sanitary, disinfection and specialized cleaning.",
};

export default async function ServicesPage() {
    const allServices = await getAllServices();

    return (
        <>
            <Header />
            <main>
                <section className="py-20 md:py-28">
                    <div className="eminence-container">
                        <div className="max-w-2xl mb-14">
                            <span className="eminence-label block mb-4">Our Services</span>
                            <h1 className="text-3xl md:text-5xl font-heading font-bold text-eminence-black mb-6">
                                Professional Cleaning for Every Space
                            </h1>
                            <p className="text-eminence-gray-600 leading-relaxed">
                                From offices and homes to specialized cleaning needs, Eminence
                                delivers consistent, professional results across every
                                service.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {allServices.map((service) => (
                                <Link
                                    key={service.slug}
                                    href={`/services/${service.slug}`}
                                    className="group block border border-eminence-gray-200 hover:border-eminence-green transition-colors duration-300"
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
                                        <h3 className="font-heading font-semibold text-eminence-black mb-2 group-hover:text-eminence-green transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-sm text-eminence-gray-600 mb-4 leading-relaxed">
                                            {service.shortDescription}
                                        </p>
                                        <span className="text-sm font-medium text-eminence-green inline-flex items-center gap-1.5">
                                            View Service
                                            <span className="transition-transform group-hover:translate-x-1">→</span>
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}