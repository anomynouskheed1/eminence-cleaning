import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
            <WhatsAppFloat />
        </>
    );
}