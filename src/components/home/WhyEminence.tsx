import RevealOnScroll from "@/components/ui/RevealOnScroll";

const points = [
    {
        title: "Highly Trained Staff",
        description: "Our cleaning technicians undergo continuous training in hygiene standards and customer service.",
    },
    {
        title: "Green Cleaning Technology",
        description: "We use non-toxic, biodegradable products and adopt sustainable cleaning practices.",
    },
    {
        title: "Quality Assurance & Monitoring",
        description: "Regular supervision and feedback ensure consistent service delivery.",
    },
    {
        title: "24/7 Support & Emergency Response",
        description: "We're always on call to meet urgent or after-hours cleaning needs.",
    },
];

export default function WhyEminence() {
    return (
        <section className="py-20 md:py-28 bg-eminence-ivory">
            <div className="eminence-container">
                <RevealOnScroll>
                    <span className="eminence-label block mb-4">Our Competitive Advantage</span>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-eminence-black mb-14 max-w-xl">
                        Why choose Eminence
                    </h2>
                </RevealOnScroll>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {points.map((point, i) => (
                        <RevealOnScroll key={point.title} delay={i * 100}>
                            <div className="bg-white border border-eminence-gold/15 p-6 h-full">
                                <span className="text-sm text-eminence-gold font-semibold block mb-4">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <h3 className="text-lg font-heading font-semibold text-eminence-black mb-3">
                                    {point.title}
                                </h3>
                                <p className="text-sm text-eminence-gray-600 leading-relaxed">
                                    {point.description}
                                </p>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
}