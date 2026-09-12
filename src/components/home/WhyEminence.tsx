import RevealOnScroll from "@/components/ui/RevealOnScroll";

const points = [
    { title: "Professional Teams", description: "Trained staff who handle every space with care and consistency." },
    { title: "Consistent Standards", description: "The same quality of service, every time you book us." },
    { title: "Flexible Scheduling", description: "We work around your availability, not the other way around." },
    { title: "Client Focused", description: "Your requirements shape how we approach every job." },
];

export default function WhyEminence() {
    return (
        <section className="py-20 md:py-28 bg-eminence-black">
            <div className="eminence-container">
                <RevealOnScroll>
                    <span className="eminence-label block mb-4 text-eminence-green">Why Eminence</span>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-14 max-w-xl">
                        Why choose Eminence
                    </h2>
                </RevealOnScroll>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {points.map((point, i) => (
                        <RevealOnScroll key={point.title} delay={i * 100}>
                            <div className="border-t border-white/15 pt-6">
                                <span className="text-sm text-eminence-green font-medium block mb-4">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <h3 className="text-lg font-heading font-semibold text-white mb-3">
                                    {point.title}
                                </h3>
                                <p className="text-sm text-white/60 leading-relaxed">
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