import ClientForm from "@/components/admin/ClientForm";

export default function NewClientPage() {
    return (
        <div>
            <h1 className="text-2xl font-heading font-bold text-eminence-black mb-8">Add Client</h1>
            <ClientForm />
        </div>
    );
}