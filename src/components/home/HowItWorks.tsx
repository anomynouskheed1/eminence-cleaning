const steps = [
    { step: "01", title: "Tell us what you need" },
    { step: "02", title: "We plan the service" },
    { step: "03", title: "Our team gets to work" },
    { step: "04", title: "Enjoy the result" },
];

export default function HowItWorks() {
    return (
        <section className="py-20 md:py-28">
            <div className="eminence-container">
                <div className="text-center mb-14">
                    <span className="eminence-label block mb-3">Process</span>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-eminence-black">
                        How It Works
                    </h2>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 max-w-4xl mx-auto">
                    {steps.map((s) => (
                        <div key={s.step} className="text-center">
                            <span className="text-4xl font-heading font-bold text-eminence-green/25 block mb-3">
                                {s.step}
                            </span>
                            <h3 className="font-heading font-semibold text-eminence-black text-sm md:text-base">
                                {s.title}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}