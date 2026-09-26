import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata = {
    title: "Terms & Conditions",
    description: "Terms and conditions for using Eminence Cleaning Company's services and website.",
};

export default function TermsPage() {
    return (
        <>
            <Header />
            <main className="bg-eminence-ivory">
                <section className="py-20 md:py-28">
                    <div className="eminence-container max-w-3xl">
                        <span className="eminence-label block mb-4">Legal</span>
                        <h1 className="text-3xl md:text-4xl font-heading font-bold text-eminence-black mb-4">
                            Terms & Conditions
                        </h1>
                        <p className="text-sm text-eminence-gray-500 mb-10">
                            Last updated: {new Date().toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" })}
                        </p>

                        <div className="space-y-8 text-eminence-gray-600 leading-relaxed">
                            <div>
                                <h2 className="font-heading font-semibold text-eminence-black text-lg mb-2">1. Introduction</h2>
                                <p>
                                    These Terms & Conditions govern your use of the Eminence Cleaning
                                    Company website and any quote requests, bookings, or enquiries
                                    submitted through it. By using this website, you agree to these
                                    terms.
                                </p>
                            </div>

                            <div>
                                <h2 className="font-heading font-semibold text-eminence-black text-lg mb-2">2. Quote Requests</h2>
                                <p>
                                    Submitting a quote request through this website does not
                                    constitute a confirmed booking. All quote requests are reviewed
                                    by our team, who will contact you to discuss your requirements
                                    and provide pricing. Final pricing may vary depending on the
                                    actual condition, size, and scope of work at the time of
                                    service.
                                </p>
                            </div>

                            <div>
                                <h2 className="font-heading font-semibold text-eminence-black text-lg mb-2">3. Bookings & Scheduling</h2>
                                <p>
                                    Preferred dates and times submitted through a quote request are
                                    indicative only and are not automatically confirmed. Eminence
                                    Cleaning Company will confirm actual scheduling directly with
                                    you based on availability.
                                </p>
                            </div>

                            <div>
                                <h2 className="font-heading font-semibold text-eminence-black text-lg mb-2">4. Cancellations</h2>
                                <p>
                                    Should you need to cancel or reschedule a confirmed service,
                                    please contact us as early as possible via WhatsApp, phone, or
                                    email so we can adjust our schedule accordingly.
                                </p>
                            </div>

                            <div>
                                <h2 className="font-heading font-semibold text-eminence-black text-lg mb-2">5. Photos & Uploaded Content</h2>
                                <p>
                                    Photos submitted as part of a quote request are used solely to
                                    help our team assess the scope of work and prepare an accurate
                                    quote. They are not shared publicly or used for marketing
                                    without your separate consent.
                                </p>
                            </div>

                            <div>
                                <h2 className="font-heading font-semibold text-eminence-black text-lg mb-2">6. Limitation of Liability</h2>
                                <p>
                                    While Eminence Cleaning Company takes care to deliver
                                    professional service, we are not liable for pre-existing damage,
                                    wear, or conditions present at a property prior to our team's
                                    arrival. Any concerns about the condition of a property should
                                    be raised with our team before work begins.
                                </p>
                            </div>

                            <div>
                                <h2 className="font-heading font-semibold text-eminence-black text-lg mb-2">7. Changes to These Terms</h2>
                                <p>
                                    We may update these Terms & Conditions from time to time. Any
                                    changes will be posted on this page.
                                </p>
                            </div>

                            <div>
                                <h2 className="font-heading font-semibold text-eminence-black text-lg mb-2">8. Contact</h2>
                                <p>
                                    If you have questions about these terms, please contact us at{" "}
                                    <a href="mailto:info@eminencecleanin.com" className="text-eminence-gold hover:underline">
                                        info@eminencecleanin.com
                                    </a>{" "}
                                    or via WhatsApp at +254 717 803 558.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}