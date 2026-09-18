import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export const metadata = {
    title: "Our Team",
    description:
        "Meet the Eminence Cleaning Company team — professional people, pristine spaces, lasting impressions.",
};

const services = [
    {
        label: "Cleaning",
        icon: <path d="M7 22h10M12 2v14M8 8l4-4 4 4" />,
    },
    {
        label: "Hygiene",
        icon: <path d="M12 2l7 4v6c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-4z" />,
    },
    {
        label: "Facility Care",
        icon: <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />,
    },
    {
        label: "Fumigation",
        icon: <path d="M12 2c1.5 3 3 5 3 8a3 3 0 11-6 0c0-3 1.5-5 3-8z" />,
    },
    {
        label: "Support Services",
        icon: (
            <path d="M4 15v-3a8 8 0 0116 0v3M4 15a2 2 0 002 2h1v-5H6a2 2 0 00-2 2zm16 0a2 2 0 01-2 2h-1v-5h1a2 2 0 012 2z" />
        ),
    },
];

export default function TeamPage() {
    return (
        <>
            <Header />

            <main className="bg-eminence-ivory">
                <section className="pt-28 md:pt-32 pb-24 md:pb-32">
                    <div className="eminence-container">
                        <RevealOnScroll>
                            <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-10 xl:gap-20 items-center">

                                {/* IMAGE */}
                                <div className="relative w-full aspect-[4/3] overflow-hidden bg-eminence-gray-100">
                                    <Image
                                        src="/images/team/team-hero.jpg"
                                        alt="Eminence Cleaning Company staff in uniform"
                                        fill
                                        priority
                                        sizes="(max-width: 1024px) 100vw, 60vw"
                                        className="object-cover"
                                    />

                                    <div className="absolute inset-0 border border-eminence-gold/20 pointer-events-none" />
                                </div>

                                {/* TEXT */}
                                <div className="min-w-0 py-4 lg:py-8">
                                    <span className="eminence-label block mb-4">
                                        Our Team
                                    </span>

                                    <h1 className="text-3xl md:text-4xl xl:text-5xl font-heading font-bold text-eminence-black leading-[1.12] tracking-tight mb-6">
                                        Professional People.
                                        <br />
                                        Pristine Spaces.
                                        <br />
                                        Lasting Impressions.
                                    </h1>

                                    <div className="w-14 h-[2px] bg-eminence-gold mb-8" />

                                    <p className="text-eminence-gray-600 leading-relaxed mb-10 max-w-md">
                                        Our teams are trained, uniformed and equipped
                                        to deliver consistent, professional results —
                                        across every space we clean.
                                    </p>

                                    <ul className="space-y-5 mb-10">
                                        {services.map((service) => (
                                            <li
                                                key={service.label}
                                                className="flex items-center gap-4"
                                            >
                                                <span className="w-9 h-9 rounded-full bg-eminence-gold flex items-center justify-center shrink-0">
                                                    <svg
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="white"
                                                        strokeWidth="1.8"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="w-4 h-4"
                                                    >
                                                        {service.icon}
                                                    </svg>
                                                </span>

                                                <span className="text-sm font-medium text-eminence-black tracking-wide uppercase">
                                                    {service.label}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Link
                                        href="/#book-a-service"
                                        className="btn-gold inline-flex w-fit"
                                    >
                                        Book a Service →
                                    </Link>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}