import Link from "next/link";
import Image from "next/image";
import { getAllServices } from "@/data/services";

export default async function AdminServicesPage() {
    const services = await getAllServices();

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-heading font-bold text-eminence-black">Services</h1>
                <Link href="/admin/services/new" className="btn-primary bg-eminence-green hover:bg-eminence-green-dark">
                    + Add Service
                </Link>
            </div>

            <div className="bg-white border border-eminence-gray-200">
                {services.map((service) => (
                    <Link
                        key={service.id}
                        href={`/admin/services/${service.id}`}
                        className="flex items-center gap-4 p-4 border-b border-eminence-gray-200 last:border-b-0 hover:bg-eminence-gray-50 transition-colors"
                    >
                        <div className="relative w-16 h-16 shrink-0 bg-eminence-gray-100 overflow-hidden">
                            <Image src={service.coverImage} alt={service.title} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-eminence-black truncate">{service.title}</p>
                            <p className="text-sm text-eminence-gray-600 truncate">/{service.slug}</p>
                        </div>
                        {service.featured && (
                            <span className="text-xs bg-eminence-green/10 text-eminence-green px-2 py-1 rounded">
                                Featured
                            </span>
                        )}
                    </Link>
                ))}
            </div>
        </div>
    );
}