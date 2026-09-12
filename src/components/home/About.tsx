import Image from "next/image";
import Link from "next/link";

export default function About() {
    return (
        <section className="py-20 md:py-28">
            <div className="eminence-container grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
                <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-eminence-gray-100 order-2 md:order-1">
                    <Image
                        src="/images/about/about-main.jpg"
                        alt="Eminence Cleaning Company team at work"
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="order-1 md:order-2">
                    <span className="eminence-label block mb-4">About Eminence</span>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-eminence-black mb-6 leading-tight">
                        More than cleaning. We create spaces people feel good in.
                    </h2>
                    <p className="text-eminence-gray-600 leading-relaxed mb-8 max-w-md">
                        Eminence Cleaning Company brings a professional, detail-focused
                        approach to every space we clean — from offices and homes to
                        commercial facilities. Our teams are trained to deliver consistent
                        results, so you can trust the space is handled properly every time.
                    </p>
                    <Link href="/about" className="btn-secondary">
                        Know More About Us →
                    </Link>
                </div>
            </div>
        </section>
    );
}