import Image from "next/image";
import Link from "next/link";

export default function FinalCTA() {
    return (
        <section className="py-16 md:py-20">
            <div className="eminence-container">
                <div className="relative bg-eminence-black overflow-hidden rounded-2xl grid grid-cols-1 md:grid-cols-2 items-center">
                    <div className="p-10 md:p-14">
                        <span className="eminence-label text-eminence-gold block mb-3">
                            Book With Eminence
                        </span>
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-3">
                            Ready for a cleaner space?
                        </h2>
                        <p className="text-white/70 text-sm md:text-base mb-8 max-w-sm">
                            Let Eminence handle the cleaning, so you can focus on what
                            matters.
                        </p>
                        <div className="flex flex-wrap items-center gap-4">
                            <Link
                                href="/#book-a-service"
                                className="inline-flex items-center justify-center px-6 py-3 bg-eminence-gold text-white text-sm font-medium hover:bg-eminence-gold-dark transition-colors"
                            >
                                Book a Service →
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center px-6 py-3 border border-white/30 text-white text-sm font-medium hover:border-eminence-gold hover:text-eminence-gold transition-colors"
                            >
                                Contact Eminence
                            </Link>
                        </div>
                    </div>

                    <div className="relative h-56 md:h-full min-h-[240px]">
                        <Image
                            src="/images/cta/final-cta.jpg"
                            alt="Eminence Cleaning Company"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}