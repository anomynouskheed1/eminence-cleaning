export default function LocationSection() {
    const address =
        "Blessed House, 4th Floor, Suite No. 71, Thika Road, opposite Garden City Mall, Nairobi, Kenya";

    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        address
    )}`;

    return (
        <section className="bg-white py-20 md:py-28">
            <div className="eminence-container">

                {/* Section heading */}
                <div className="max-w-2xl mb-12 md:mb-16">
                    <span className="eminence-label block mb-3">
                        Where to Find Us
                    </span>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-eminence-black leading-tight">
                        Visit our head office
                    </h2>

                    <p className="mt-4 text-sm md:text-base leading-relaxed text-eminence-gray-600 max-w-xl">
                        Whether you would like to speak with our team, discuss
                        your cleaning requirements or simply learn more about
                        our services, we are ready to assist.
                    </p>
                </div>

                {/* Main contact + map */}
                <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 items-stretch">

                    {/* Contact information */}
                    <div className="bg-eminence-ivory border border-eminence-black/8 p-7 sm:p-9 md:p-10 flex flex-col">

                        <div className="flex items-center gap-3 mb-8">
                            <span className="flex h-10 w-10 items-center justify-center bg-eminence-black text-eminence-gold text-sm">
                                01
                            </span>

                            <div>
                                <span className="block text-[10px] uppercase tracking-[0.2em] text-eminence-gold">
                                    Head Office
                                </span>

                                <span className="block mt-1 text-sm font-medium text-eminence-black">
                                    Eminence Cleaning Company
                                </span>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="pb-7 border-b border-eminence-black/10">
                            <span className="block text-[10px] uppercase tracking-[0.2em] text-eminence-gold mb-3">
                                Address
                            </span>

                            <p className="text-base md:text-lg text-eminence-black leading-relaxed">
                                Blessed House, 4th Floor,
                                <br />
                                Suite No. 71, Thika Road,
                                <br />
                                opposite Garden City Mall,
                                <br />
                                Nairobi, Kenya.
                            </p>
                        </div>

                        {/* Contact details */}
                        <div className="grid sm:grid-cols-2 gap-6 py-7 border-b border-eminence-black/10">

                            <div>
                                <span className="block text-[10px] uppercase tracking-[0.2em] text-eminence-gold mb-2">
                                    Call Us
                                </span>

                                <div className="space-y-1 text-sm">
                                    <a
                                        href="tel:+254717803558"
                                        className="block text-eminence-black hover:text-eminence-gold transition-colors"
                                    >
                                        +254 717 803 558
                                    </a>

                                    <a
                                        href="tel:+254771808806"
                                        className="block text-eminence-black hover:text-eminence-gold transition-colors"
                                    >
                                        +254 771 808 806
                                    </a>
                                </div>
                            </div>

                            <div>
                                <span className="block text-[10px] uppercase tracking-[0.2em] text-eminence-gold mb-2">
                                    Email
                                </span>

                                <a

                                    href="mailto:info@eminencecleanin.com"
                                    className="text-eminence-black hover:text-eminence-gold transition-colors"
                                >
                                    info@eminencecleanin.com
                                </a>
                            </div>

                        </div>

                        {/* Instagram */}
                        <div className="pt-7">
                            <span className="block text-[10px] uppercase tracking-[0.2em] text-eminence-gold mb-2">
                                Instagram
                            </span>

                            <a
                                href="https://instagram.com/eminencecleaningco"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-eminence-black hover:text-eminence-gold transition-colors"
                            >
                                @eminencecleaningco
                            </a>
                        </div>

                        {/* CTA */}
                        <div className="mt-auto pt-9">
                            <a
                                href={mapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-gold inline-flex"
                            >
                                Get Directions →
                            </a>
                        </div>
                    </div>

                    {/* Map */}
                    <div className="relative min-h-[380px] lg:min-h-[520px] overflow-hidden border border-eminence-black/10">

                        <iframe
                            src={`https://www.google.com/maps?q=${encodeURIComponent(
                                address
                            )}&output=embed`}
                            width="100%"
                            height="100%"
                            style={{
                                border: 0,
                                minHeight: "380px",
                            }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Eminence Cleaning Company location"
                        />

                        {/* Map label */}
                        <div className="absolute top-5 left-5 bg-white px-5 py-4 shadow-lg border border-eminence-black/10">
                            <span className="block text-[9px] uppercase tracking-[0.2em] text-eminence-gold mb-1">
                                Location
                            </span>

                            <span className="block text-sm font-semibold text-eminence-black">
                                Nairobi, Kenya
                            </span>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}