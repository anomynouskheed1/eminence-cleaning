import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhyEminence from "@/components/home/WhyEminence";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata = {
    title: "About Us",
    description:
        "Learn about Eminence Cleaning Company — professional cleaning services delivered with care, consistency and attention to detail across Kenya.",
};

export default function AboutPage() {
    return (
        <>
            <Header />
            <main>
                {/* PAGE HERO */}
                <section className="relative h-[380px] md:h-[460px] w-full overflow-hidden">
                    <Image
                        src="/images/about/about-hero.jpg"
                        alt="Eminence Cleaning Company team at work"
                        fill
                        priority
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-eminence-black/60" />
                    <div className="relative z-10 h-full flex flex-col justify-center eminence-container">
                        <span className="eminence-label text-white/80 mb-4">About Eminence</span>
                        <h1 className="text-3xl md:text-5xl font-heading font-bold text-white max-w-xl">
                            Where Cleanliness Meets Class
                        </h1>
                    </div>
                </section>

                {/* INTRO — editorial split */}
                <section className="py-20 md:py-28">
                    <div className="eminence-container grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
                        <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-eminence-gray-100">
                            <Image
                                src="/images/about/about-main.jpg"
                                alt="Eminence Cleaning Company team member at work"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <span className="eminence-label block mb-4">Who We Are</span>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-eminence-black mb-6 leading-tight">
                                More than cleaning. We create spaces people feel good in.
                            </h2>
                            <div className="space-y-4 text-eminence-gray-600 leading-relaxed">
                                <p>
                                    Eminence Cleaning Company provides professional cleaning
                                    services for homes, offices and commercial spaces. Our
                                    teams are trained to deliver consistent, detail-focused
                                    results on every job, regardless of the size or type of
                                    space.
                                </p>
                                <p>
                                    From daily office upkeep to specialized cleaning like
                                    carpet care, fumigation and post-construction cleanup, we
                                    bring the same level of care and attention to every
                                    service we offer.
                                </p>
                                <p>
                                    We work around your schedule and requirements, so cleaning
                                    fits into your space and routine — not the other way
                                    around.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* WHAT WE STAND FOR */}
                <section className="py-20 md:py-28 bg-eminence-gray-50">
                    <div className="eminence-container max-w-3xl text-center mx-auto">
                        <span className="eminence-label block mb-4">Our Approach</span>
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-eminence-black mb-6">
                            Cleanliness, done with class.
                        </h2>
                        <p className="text-eminence-gray-600 leading-relaxed">
                            Our name reflects how we approach every job — with
                            professionalism, consistency and attention to detail. We
                            believe a clean space should also feel like a well cared-for
                            one, and that shows in how our teams work, from the first walk
                            through to the final check.
                        </p>
                    </div>
                </section>

                {/* WHY EMINENCE — reused component */}
                <WhyEminence />

                {/* FINAL CTA — reused component */}
                <FinalCTA />
            </main>
            <Footer />
        </>
    );
}