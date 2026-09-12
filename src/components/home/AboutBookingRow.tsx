import Link from "next/link";
import BookServiceForm from "./BookServiceForm";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { getAllServices } from "@/data/services";

export default async function AboutBookingRow() {
    const services = await getAllServices();

    return (
        <section id="book-a-service" className="relative">
            <div className="eminence-container">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
                    <RevealOnScroll>
                        <div id="about" className="pt-16 md:pt-24 scroll-mt-28">
                            <span className="eminence-label block mb-4">About Eminence</span>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-eminence-black mb-6 leading-tight">
                                More than cleaning. We create spaces people feel good in.
                            </h2>
                            <p className="text-eminence-gray-600 leading-relaxed mb-8 max-w-md">
                                Eminence Cleaning Company brings a professional, detail-focused
                                approach to every space we clean — from offices and homes to
                                commercial facilities. Our teams are trained to deliver
                                consistent results, so you can trust the space is handled
                                properly every time.
                            </p>
                            <Link href="/about" className="btn-secondary">
                                Know More About Us →
                            </Link>
                        </div>
                    </RevealOnScroll>

                    <RevealOnScroll delay={200}>
                        <div className="-mt-16 sm:-mt-20 md:-mt-40 relative z-20 flex justify-center md:justify-end">
                            <BookServiceForm services={services} />
                        </div>
                    </RevealOnScroll>
                </div>
            </div>
        </section>
    );
}