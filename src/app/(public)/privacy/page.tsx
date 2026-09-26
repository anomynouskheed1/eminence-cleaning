import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata = {
    title: "Privacy Policy",
    description: "How Eminence Cleaning Company collects, uses, and protects your information.",
};

export default function PrivacyPage() {
    return (
        <>
            <Header />
            <main className="bg-eminence-ivory">
                <section className="py-20 md:py-28">
                    <div className="eminence-container max-w-3xl">
                        <span className="eminence-label block mb-4">Legal</span>
                        <h1 className="text-3xl md:text-4xl font-heading font-bold text-eminence-black mb-4">
                            Privacy Policy
                        </h1>
                        <p className="text-sm text-eminence-gray-500 mb-10">
                            Last updated: {new Date().toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" })}
                        </p>

                        <div className="space-y-8 text-eminence-gray-600 leading-relaxed">
                            <div>
                                <h2 className="font-heading font-semibold text-eminence-black text-lg mb-2">1. Information We Collect</h2>
                                <p>
                                    When you submit a quote request or booking enquiry, we collect
                                    information you provide directly, including your name, phone
                                    number, email address, property details, service preferences,
                                    scheduling preferences, and any photos you choose to upload.
                                </p>
                            </div>

                            <div>
                                <h2 className="font-heading font-semibold text-eminence-black text-lg mb-2">2. How We Use Your Information</h2>
                                <p>
                                    Your information is used only to review and respond to your
                                    service request. Specifically, we use it to:
                                </p>
                                <ul className="list-disc pl-5 mt-2 space-y-1">
                                    <li>Understand the scope and location of the requested service</li>
                                    <li>Prepare and communicate a quote</li>
                                    <li>Contact you regarding scheduling and service delivery</li>
                                    <li>Maintain records of past enquiries and bookings</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="font-heading font-semibold text-eminence-black text-lg mb-2">3. How We Store Your Information</h2>
                                <p>
                                    Information submitted through this website is stored securely
                                    using Supabase, a cloud database provider. Access to this
                                    information is restricted to authorized Eminence Cleaning
                                    Company staff.
                                </p>
                            </div>

                            <div>
                                <h2 className="font-heading font-semibold text-eminence-black text-lg mb-2">4. Photos</h2>
                                <p>
                                    Any photos you upload as part of a quote request are used
                                    solely for internal assessment purposes and are not shared
                                    with third parties or used publicly without your separate,
                                    explicit consent.
                                </p>
                            </div>

                            <div>
                                <h2 className="font-heading font-semibold text-eminence-black text-lg mb-2">5. Sharing of Information</h2>
                                <p>
                                    We do not sell, rent, or share your personal information with
                                    third parties for marketing purposes. Information may only be
                                    shared with service providers who help us operate this website
                                    (such as our hosting and database providers), solely for the
                                    purpose of delivering our services to you.
                                </p>
                            </div>

                            <div>
                                <h2 className="font-heading font-semibold text-eminence-black text-lg mb-2">6. Data Retention</h2>
                                <p>
                                    We retain quote request and booking information for as long as
                                    necessary to respond to your enquiry, deliver services, and
                                    maintain business records, unless you request deletion sooner.
                                </p>
                            </div>

                            <div>
                                <h2 className="font-heading font-semibold text-eminence-black text-lg mb-2">7. Your Rights</h2>
                                <p>
                                    You may request access to, correction of, or deletion of your
                                    personal information at any time by contacting us using the
                                    details below.
                                </p>
                            </div>

                            <div>
                                <h2 className="font-heading font-semibold text-eminence-black text-lg mb-2">8. Contact</h2>
                                <p>
                                    For any questions about this Privacy Policy or your personal
                                    information, contact us at{" "}
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