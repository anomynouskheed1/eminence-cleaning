import BeforeAfterSlider from "./BeforeAfterSlider";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function BeforeAfter() {
    return (
        <section className="py-20 md:py-28 bg-eminence-gray-50">
            <div className="eminence-container grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
                <RevealOnScroll>
                    <BeforeAfterSlider
                        beforeImage="/images/before-after/before.jpg"
                        afterImage="/images/before-after/after.jpg"
                    />
                </RevealOnScroll>

                <RevealOnScroll delay={150}>
                    <div>
                        <span className="eminence-label block mb-4">The Difference</span>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-eminence-black mb-4 leading-tight">
                            The difference is visible.
                        </h2>
                        <p className="text-eminence-gray-600 leading-relaxed max-w-md">
                            Professional cleaning makes a real difference. Drag the slider to
                            see the transformation for yourself.
                        </p>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
}