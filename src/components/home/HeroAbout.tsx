import Link from "next/link";
import Image from "next/image";
import HeroSlideshow from "./HeroSlideshow";
import BookServiceForm from "./BookServiceForm";
import { getAllServices } from "@/data/services";

export default async function HeroAbout() {
    const services = await getAllServices();

    return (
        <section className="relative isolate w-full overflow-hidden bg-eminence-ivory">

            {/* =========================================================
                HERO
            ========================================================= */}
            <div className="relative h-[560px] md:h-[620px] w-full">
                <HeroSlideshow />

                {/* Dark overlay */}
                <div
                    className="absolute inset-0 z-10"
                    style={{
                        background:
                            "linear-gradient(90deg, rgba(10,10,10,0.94) 0%, rgba(10,10,10,0.86) 28%, rgba(10,10,10,0.55) 52%, rgba(10,10,10,0.15) 75%, transparent 100%)",
                    }}
                />

                {/* Gold tint */}
                <div
                    className="absolute inset-0 z-10"
                    style={{
                        background:
                            "linear-gradient(90deg, rgba(184,147,90,0.22) 0%, rgba(184,147,90,0.08) 45%, transparent 75%)",
                    }}
                />

                {/* Hero content */}
                <div className="relative z-20 eminence-container h-full flex items-center">
                    <div className="max-w-2xl pb-16 md:pb-0">

                        {/* Eyebrow */}
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-10 h-[2px] bg-eminence-gold" />

                            <span className="eminence-label text-white/85">
                                Eminence Cleaning Company
                            </span>
                        </div>

                        {/* Heading */}
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.03] mb-6">
                            <span className="text-white block">
                                Where Cleanliness
                            </span>

                            <span className="text-eminence-gold-light block">
                                Meets Class
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-base md:text-lg text-white/80 mb-9 max-w-xl leading-relaxed">
                            Professional residential, commercial and industrial
                            cleaning solutions — delivered with care, consistency
                            and a team you can rely on.
                        </p>

                        {/* Hero links */}
                        <div className="flex flex-wrap items-center gap-6">
                            <Link href="#book-a-service" className="btn-gold">
                                Book a Service →
                            </Link>

                            <Link
                                href="/services"
                                className="inline-flex items-center gap-2 text-sm font-medium text-white border-b border-white/40 hover:border-white pb-1 transition-colors"
                            >
                                Explore Services →
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Curved hero divider */}
                <div className="absolute bottom-0 left-0 w-full z-10 leading-[0] pointer-events-none">
                    <svg
                        viewBox="0 0 1440 120"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-[65px] md:h-[90px]"
                        preserveAspectRatio="none"
                    >
                        {/* Gold edge */}
                        <path
                            d="M0,65 C240,115 480,15 720,35 C960,55 1200,115 1440,65 L1440,120 L0,120 Z"
                            fill="#8F6E3F"
                        />

                        {/* Ivory */}
                        <path
                            d="M0,72 C240,122 480,22 720,42 C960,62 1200,122 1440,72 L1440,120 L0,120 Z"
                            fill="#FAF7F0"
                        />
                    </svg>
                </div>
            </div>

            {/* =========================================================
                ABOUT + BOOKING TRANSITION
            ========================================================= */}
            <div
                id="book-a-service"
                className="
        relative
        z-30
        eminence-container
    "
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">

                    {/* =================================================
                        ABOUT — LEFT
                    ================================================= */}
                    <div
                        id="about"
                        className="
                            scroll-mt-28
                            pt-4
                            md:pt-12
                            pb-10
                            md:pb-16
                        "
                    >
                        <div className="max-w-xl">

                            {/* Label */}
                            <span className="eminence-label block mb-4">
                                About Eminence
                            </span>

                            {/* Heading */}
                            <h2
                                className="
                                    text-3xl
                                    md:text-4xl
                                    lg:text-5xl
                                    font-heading
                                    font-bold
                                    text-eminence-black
                                    mb-6
                                    leading-[1.08]
                                "
                            >
                                A premier cleaning services provider in Kenya
                            </h2>

                            {/* Description */}
                            <p className="text-eminence-gray-600 leading-relaxed mb-4 max-w-lg">
                                Eminence Cleaning Company provides residential,
                                commercial and industrial cleaning solutions,
                                built on skilled personnel, smart cleaning
                                technology and unmatched customer care.
                            </p>

                            <p className="text-eminence-gray-600 leading-relaxed mb-8 max-w-lg">
                                Eminence operates under the Brainiarchs Group,
                                bringing the same standard of professionalism
                                and reliability to every space we clean.
                            </p>

                            {/* CTA */}
                            <Link href="/about" className="btn-secondary">
                                Know More About Us →
                            </Link>

                            {/* About image */}
                            <div className="relative mt-10 md:mt-14 w-full max-w-lg aspect-[16/10] overflow-hidden bg-eminence-gray-100">
                                <Image
                                    src="/images/about/about-main.jpg"
                                    alt="Eminence Cleaning Company team at work"
                                    fill
                                    className="object-cover"
                                />

                                {/* Gold border */}
                                <div className="absolute inset-0 border border-eminence-gold/25 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* =================================================
                        BOOKING — RIGHT
                    ================================================= */}
                    <div className="flex justify-center md:justify-end md:-mt-20 lg:-mt-24">
                        <div className="w-full max-w-md">
                            <BookServiceForm services={services} />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}