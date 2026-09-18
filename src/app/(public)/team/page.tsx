import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export const metadata = {
    title: "Our Team & Uniforms",
    description:
        "Meet the Eminence Cleaning Company team — professional people, pristine spaces, lasting impressions.",
};

const services = [
    { label: "Cleaning", icon: (<path d="M7 22h10M12 2v14M8 8l4-4 4 4" />) },
    { label: "Hygiene", icon: (<path d="M12 2l7 4v6c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-4z" />) },
    { label: "Facility Care", icon: (<path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />) },
    { label: "Fumigation", icon: (<path d="M12 2c1.5 3 3 5 3 8a3 3 0 11-6 0c0-3 1.5-5 3-8z" />) },
    { label: "Support Services", icon: (<path d="M4 15v-3a8 8 0 0116 0v3M4 15a2 2 0 002 2h1v-5H6a2 2 0 00-2 2zm16 0a2 2 0 01-2 2h-1v-5h1a2 2 0 012 2z" />) },
];

const uniformDetails = [
    { image: "/images/team/detail-polo.jpg", label: "Polo Uniform (Operations)" },
    { image: "/images/team/detail-executive.jpg", label: "Executive Uniform (Management)" },
    { image: "/images/team/detail-ladies.jpg", label: "Ladies Formal Uniform (Client Facing)" },
    { image: "/images/team/detail-jacket.jpg", label: "Jacket (Supervisors & Technical)" },
    { image: "/images/team/detail-cap.jpg", label: "Cap (Operations)" },
];

export default function TeamPage() {
    return (
        <>
            <Header />
            <main className="bg-eminence-ivory">
                {/* HERO ROW — big photo + intro panel */}
                <section className="pt-28 md:pt-32 pb-16 md:pb-20">
                    <div className="eminence-container">
                        <RevealOnScroll>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-stretch">
                                <div className="lg:col-span-2 relative aspect-[4/3] lg:aspect-auto overflow-hidden bg-eminence-gray-100">
                                    <Image
                                        src="/images/team/team-hero.jpg"
                                        alt="Eminence Cleaning Company staff in uniform"
                                        fill
                                        priority
                                        className="object-cover"
                                    />
                                </div>

                                <div className="flex flex-col justify-center py-6">
                                    <span className="eminence-label block mb-4">Our Team</span>
                                    <h1 className="text-2xl md:text-3xl font-heading font-bold text-eminence-black leading-snug mb-4">
                                        Professional People.
                                        <br />
                                        Pristine Spaces.
                                        <br />
                                        Lasting Impressions.
                                    </h1>
                                    <div className="w-14 h-[2px] bg-eminence-gold mb-8" />

                                    <ul className="space-y-5">
                                        {services.map((s) => (
                                            <li key={s.label} className="flex items-center gap-4">
                                                <span className="w-9 h-9 rounded-full bg-eminence-gold flex items-center justify-center shrink-0">
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                                        {s.icon}
                                                    </svg>
                                                </span>
                                                <span className="text-sm font-medium text-eminence-black tracking-wide uppercase">
                                                    {s.label}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>
                </section>

                {/* UNIFORM DETAIL STRIP — individually cropped images */}
                <section className="pb-16 md:pb-20">
                    <div className="eminence-container">
                        <RevealOnScroll>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
                                {uniformDetails.map((item) => (
                                    <div key={item.label}>
                                        <div className="relative aspect-square overflow-hidden bg-eminence-gray-100 mb-3">
                                            <Image src={item.image} alt={item.label} fill className="object-cover" />
                                        </div>
                                        <p className="text-[11px] uppercase tracking-widest2 text-eminence-gray-600 text-center leading-tight">
                                            {item.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </RevealOnScroll>
                    </div>
                </section>

                {/* FULL UNIFORM ROW — single wide screenshot, avoids per-image cropping quality loss */}
                <section className="pb-20 md:pb-28">
                    <div className="eminence-container">
                        <RevealOnScroll>
                            <div className="relative w-full aspect-[1240/560] overflow-hidden bg-eminence-gray-100">
                                <Image
                                    src="/images/team/uniform-full-row.jpg"
                                    alt="Eminence uniform range — operations, executive and technical"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </RevealOnScroll>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}