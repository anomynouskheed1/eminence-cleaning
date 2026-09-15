import TestimonialCarousel from "./TestimonialCarousel";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

const steps = [
    { step: "01", title: "Tell us what you need", description: "Share your requirements with us." },
    { step: "02", title: "We plan the service", description: "We assess and prepare the right solution." },
    { step: "03", title: "Our team gets to work", description: "Skilled professionals handle the job." },
    { step: "04", title: "Enjoy the result", description: "A clean, fresh space for you." },
];

export default function ProcessAndTestimonial() {
    return (
        <section className="py-20 md:py-28 bg-eminence-ivory">
            <div className="eminence-container grid grid-cols-1 lg:grid-cols-2 gap-14">
                <RevealOnScroll>
                    <div>
                        <span className="eminence-label block mb-3">How It Works</span>
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-eminence-black mb-10">
                            Simple steps. A cleaner space.
                        </h2>
                        <div className="grid grid-cols-2 gap-8">
                            {steps.map((s) => (
                                <div key={s.step}>
                                    <span className="w-8 h-8 rounded-full bg-eminence-gold text-white text-xs font-medium flex items-center justify-center mb-4">
                                        {s.step}
                                    </span>
                                    <h3 className="font-heading font-semibold text-eminence-black text-sm mb-1.5">
                                        {s.title}
                                    </h3>
                                    <p className="text-xs text-eminence-gray-600 leading-relaxed">
                                        {s.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </RevealOnScroll>

                <RevealOnScroll delay={150}>
                    <div className="lg:pt-[52px]">
                        <span className="eminence-label block mb-3 lg:hidden">Testimonial</span>
                        <TestimonialCarousel />
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
}