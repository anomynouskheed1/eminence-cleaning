import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata = {
    title: "About Us",
    description:
        "Eminence Cleaning Co. is a premier cleaning services provider in Kenya, operating under the Brainiarchs Group umbrella.",
};

const coreValues = [
    { title: "Professionalism", description: "We uphold the highest standards in every job we undertake." },
    { title: "Reliability", description: "We deliver on our promises, every time." },
    { title: "Innovation", description: "We adopt the latest cleaning methods and eco-friendly products." },
    { title: "Excellence", description: "We aim for perfection in every cleaning detail." },
    { title: "Customer Focus", description: "We tailor services to meet unique client needs." },
    { title: "Integrity", description: "Transparency and honesty guide all our operations." },
];

const sustainability = [
    "Use of eco-certified products",
    "Water and energy-efficient cleaning tools",
    "Waste segregation and recycling programs",
    "Community awareness on sustainable cleaning habits",
];

const healthSafety = [
    "Kenya Bureau of Standards (KEBS)",
    "National Environmental Management Authority (NEMA) guidelines",
    "Ministry of Health sanitation protocols",
    "ISO 9001:2015 quality benchmarks (targeted)",
];

export default function AboutPage() {
    return (
        <>
            <Header />
            <main>
                {/* INTRO */}
                <section className="py-20 md:py-28 bg-eminence-ivory">
                    <div className="eminence-container max-w-3xl">
                        <span className="eminence-label block mb-4">About Eminence</span>
                        <h1 className="text-3xl md:text-5xl font-heading font-bold text-eminence-black mb-8">
                            A premier cleaning services provider in Kenya
                        </h1>
                        <p className="text-eminence-gray-600 leading-relaxed mb-4">
                            Eminence Cleaning Co. is a premier cleaning services provider in
                            Kenya, operating under the reputable Brainiarchs Group umbrella.
                            Founded to address the growing demand for high-quality,
                            professional, and reliable cleaning services, Eminence is built
                            on the values of integrity, innovation, and excellence.
                        </p>
                        <p className="text-eminence-gray-600 leading-relaxed">
                            Our company specializes in delivering tailored residential,
                            commercial, and industrial cleaning solutions to individuals,
                            corporate institutions, real estate developers, and government
                            agencies. With a focus on modern cleaning technologies and
                            sustainable practices, we aim to transform spaces while
                            promoting health, hygiene, and customer satisfaction.
                        </p>
                    </div>
                </section>

                {/* VISION & MISSION */}
                <section className="py-20 md:py-28 bg-white">
                    <div className="eminence-container grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                        <div className="border-t border-eminence-gold/20 pt-6">
                            <span className="eminence-label block mb-4">Our Vision</span>
                            <p className="text-xl md:text-2xl font-heading text-eminence-black leading-relaxed">
                                To be the most trusted and technologically advanced cleaning
                                service provider — setting the gold standard in cleanliness,
                                professionalism, and innovation.
                            </p>
                        </div>
                        <div className="border-t border-eminence-gold/20 pt-6">
                            <span className="eminence-label block mb-4">Our Mission</span>
                            <p className="text-xl md:text-2xl font-heading text-eminence-black leading-relaxed">
                                To provide premium, eco-friendly cleaning services that
                                enhance living and working environments for our clients
                                through skilled personnel, smart cleaning technology, and
                                unmatched customer care.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CORE VALUES */}
                <section className="py-20 md:py-28 bg-eminence-ivory">
                    <div className="eminence-container">
                        <span className="eminence-label block mb-4">Core Values</span>
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-eminence-black mb-12">
                            What guides our work
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {coreValues.map((value) => (
                                <div key={value.title} className="bg-white border border-eminence-gold/15 p-6">
                                    <h3 className="font-heading font-semibold text-eminence-black mb-2">
                                        {value.title}
                                    </h3>
                                    <p className="text-sm text-eminence-gray-600 leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SUSTAINABILITY */}
                <section className="py-16 md:py-20 bg-white">
                    <div className="eminence-container max-w-3xl">
                        <span className="eminence-label block mb-4">Sustainability</span>
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-eminence-black mb-6">
                            Committed to reducing our environmental impact
                        </h2>
                        <ul className="space-y-3">
                            {sustainability.map((item) => (
                                <li key={item} className="flex items-start gap-3 text-eminence-gray-600">
                                    <span className="w-1.5 h-1.5 rounded-full bg-eminence-gold mt-2 shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* HEALTH & SAFETY */}
                <section className="py-16 md:py-20 bg-eminence-ivory">
                    <div className="eminence-container max-w-3xl">
                        <span className="eminence-label block mb-4">Health & Safety</span>
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-eminence-black mb-6">
                            Our services are compliant with
                        </h2>
                        <ul className="space-y-3">
                            {healthSafety.map((item) => (
                                <li key={item} className="flex items-start gap-3 text-eminence-gray-600">
                                    <span className="w-1.5 h-1.5 rounded-full bg-eminence-gold mt-2 shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* BRAINIARCHS CONNECTION */}
                <section className="py-16 md:py-20 bg-white">
                    <div className="eminence-container max-w-3xl">
                        <span className="eminence-label block mb-4">Part of Brainiarchs Group</span>
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-eminence-black mb-6">
                            Backed by a recognized brand
                        </h2>
                        <p className="text-eminence-gray-600 leading-relaxed">
                            Eminence Cleaning Co. operates under the Brainiarchs Group, a
                            recognized brand in design, construction, and smart home
                            systems — bringing the same standard of professionalism and
                            reliability to every space we clean.
                        </p>
                    </div>
                </section>

                <FinalCTA />
            </main>
            <Footer />
        </>
    );
}