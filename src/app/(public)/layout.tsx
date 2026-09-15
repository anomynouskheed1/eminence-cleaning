import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />

            <main className="pt-20 md:pt-24">
                {children}
            </main>

            <Footer />

            <WhatsAppFloat />
        </>
    );
}