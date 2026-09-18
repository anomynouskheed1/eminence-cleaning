import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BookServiceForm from "@/components/home/BookServiceForm";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { getAllServices } from "@/data/services";

export const metadata = {
    title: "Contact Us",
    description:
        "Get in touch with Eminence Cleaning Company. Call, email, or book a cleaning service directly online.",
};

export default async function ContactPage() {
    const services = await getAllServices();

    return (
        <>
            <Header />
            <main>
                <section className="py-20 md:py-28">
                    <div className="eminence-container grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
                        <RevealOnScroll>
                            <div>
                                <span className="eminence-label block mb-4">Get In Touch</span>
                                <h1 className="text-3xl md:text-4xl font-heading font-bold text-eminence-black mb-6">
                                    Contact Eminence
                                </h1>
                                <p className="text-eminence-gray-600 leading-relaxed mb-8 max-w-md">
                                    Reach out with any questions, or book a service directly using
                                    the form.
                                </p>
                                <div className="space-y-3 text-sm text-eminence-black">
                                    <p>Phone: +254 717 803 558 / +254 771 808 806</p>
                                    <p>Email: info.eminencecleaning@gmail.com</p>
                                    <p>Address: Blessed House, 4th Floor, Suite No. 71, Thika Road, Nairobi</p>
                                </div>
                            </div>
                        </RevealOnScroll>
                        <RevealOnScroll delay={150}>
                            <div className="flex justify-center md:justify-end">
                                <BookServiceForm services={services} />
                            </div>
                        </RevealOnScroll>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}