import FloatingActions from "@/components/quote/FloatingActions";
export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
            <FloatingActions />
        </>
    );
}