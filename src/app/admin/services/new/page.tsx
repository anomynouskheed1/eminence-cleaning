import ServiceForm from "@/components/admin/ServiceForm";

export default function NewServicePage() {
    return (
        <div>
            <h1 className="text-2xl font-heading font-bold text-eminence-black mb-8">
                Add New Service
            </h1>
            <ServiceForm />
        </div>
    );
}