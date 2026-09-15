const steps = [
    {
        step: "01",
        title: "Tell us what you need",
        description:
            "Share what you need cleaned and where the service is required.",
    },
    {
        step: "02",
        title: "We plan the service",
        description:
            "We understand your requirements and prepare the right solution.",
    },
    {
        step: "03",
        title: "Our team gets to work",
        description:
            "Our trained team arrives prepared and handles the cleaning professionally.",
    },
    {
        step: "04",
        title: "Enjoy the result",
        description:
            "Sit back and enjoy a cleaner, fresher and more comfortable space.",
    },
];

export default function HowItWorks() {
    return (
        <section className="bg-eminence-ivory py-20 md:py-28">
            <div className="eminence-container">

                {/* Header */}
                <div className="mx-auto max-w-2xl text-center mb-16 md:mb-20">
                    <span className="eminence-label block mb-3">
                        Our Process
                    </span>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-eminence-black leading-tight">
                        Simple from start to finish
                    </h2>

                    <p className="mt-5 text-sm md:text-base leading-relaxed text-eminence-gray-600">
                        From your first request to the final result, we make
                        the entire cleaning process simple, professional and
                        stress-free.
                    </p>
                </div>

                {/* Desktop timeline */}
                <div className="hidden lg:block max-w-6xl mx-auto">

                    {/* Timeline */}
                    <div className="relative">

                        {/* Connecting line */}
                        <div className="absolute top-8 left-[12.5%] right-[12.5%] h-px bg-eminence-gold/40" />

                        <div className="grid grid-cols-4">

                            {steps.map((item) => (
                                <div
                                    key={item.step}
                                    className="relative text-center px-8"
                                >
                                    {/* Circle */}
                                    <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-eminence-black border-[5px] border-eminence-ivory shadow-sm">
                                        <span className="font-heading text-lg font-bold text-eminence-gold">
                                            {item.step}
                                        </span>
                                    </div>

                                    {/* Step label */}
                                    <span className="mt-8 block text-[10px] uppercase tracking-[0.22em] text-eminence-gold font-medium">
                                        Step {item.step}
                                    </span>

                                    {/* Title */}
                                    <h3 className="mt-3 font-heading text-lg font-semibold text-eminence-black leading-snug">
                                        {item.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="mt-3 text-sm leading-relaxed text-eminence-gray-600">
                                        {item.description}
                                    </p>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>

                {/* Mobile / Tablet */}
                <div className="lg:hidden relative max-w-2xl mx-auto">

                    <div className="absolute left-7 top-8 bottom-8 w-px bg-eminence-gold/30" />

                    <div className="space-y-10">

                        {steps.map((item) => (
                            <div
                                key={item.step}
                                className="relative flex gap-6"
                            >
                                {/* Circle */}
                                <div className="relative z-10 shrink-0 flex h-14 w-14 items-center justify-center rounded-full bg-eminence-black border-4 border-eminence-ivory">
                                    <span className="font-heading text-sm font-bold text-eminence-gold">
                                        {item.step}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="pt-1">
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-eminence-gold">
                                        Step {item.step}
                                    </span>

                                    <h3 className="mt-2 font-heading text-lg font-semibold text-eminence-black">
                                        {item.title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-relaxed text-eminence-gray-600">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>

                {/* Bottom statement */}
                <div className="mt-16 md:mt-20 flex items-center justify-center gap-4">
                    <span className="h-px w-10 bg-eminence-gold/40" />

                    <p className="text-xs md:text-sm text-eminence-gray-500 text-center">
                        Professional service. Reliable team. Exceptional results.
                    </p>

                    <span className="h-px w-10 bg-eminence-gold/40" />
                </div>

            </div>
        </section>
    );
}