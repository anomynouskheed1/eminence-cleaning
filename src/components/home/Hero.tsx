import Link from "next/link";
import HeroSlideshow from "./HeroSlideshow";

export default function Hero() {
    return (
        <section className="relative isolate h-[calc(100vh-96px)] min-h-[600px] max-h-[820px] w-full overflow-hidden">

            {/* SLIDING HERO IMAGES */}
            <HeroSlideshow />

            {/* DARK LEFT SIDE */}
            <div
                className="absolute inset-0 z-10"
                style={{
                    background:
                        "linear-gradient(90deg, rgba(4,30,20,0.94) 0%, rgba(4,30,20,0.86) 28%, rgba(4,30,20,0.55) 52%, rgba(4,30,20,0.15) 75%, transparent 100%)",
                }}
            />

            {/* SUBTLE GREEN TINT */}
            <div
                className="absolute inset-0 z-10"
                style={{
                    background:
                        "linear-gradient(90deg, rgba(10,61,40,0.30) 0%, rgba(10,61,40,0.12) 45%, transparent 75%)",
                }}
            />

            {/* CONTENT CONTAINER */}
            <div className="relative z-20 eminence-container h-full flex items-center">
                <div className="max-w-2xl">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="w-10 h-[2px] bg-eminence-green" />
                        <span className="eminence-label text-white/85">
                            Eminence Cleaning Company
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.03] mb-6">
                        <span className="text-white block">Where Cleanliness</span>
                        <span className="text-eminence-green-light block">Meets Class</span>
                    </h1>

                    <p className="text-base md:text-lg text-white/80 mb-9 max-w-xl leading-relaxed">
                        Professional cleaning for homes, offices and commercial spaces —
                        delivered with care, consistency and a team you can rely on.
                    </p>

                    <div className="flex flex-wrap items-center gap-6">
                        <Link
                            href="#book-a-service"
                            className="btn-primary bg-eminence-green hover:bg-eminence-green-dark"
                        >
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

            {/* CURVED BOTTOM */}
            <div className="absolute bottom-0 left-0 w-full z-10 leading-[0] pointer-events-none">
                <svg
                    viewBox="0 0 1440 120"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-[65px] md:h-[90px]"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,65 C240,115 480,15 720,35 C960,55 1200,115 1440,65 L1440,120 L0,120 Z"
                        fill="#0A3D28"
                    />
                    <path
                        d="M0,72 C240,122 480,22 720,42 C960,62 1200,122 1440,72 L1440,120 L0,120 Z"
                        fill="#FFFFFF"
                    />
                </svg>
            </div>
        </section>
    );
}