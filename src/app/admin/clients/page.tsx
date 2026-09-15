import Link from "next/link";
import { getAllClients } from "@/data/clients";

export default async function AdminClientsPage() {
    const clients = await getAllClients();

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-heading font-bold text-eminence-black">Trusted Clients</h1>
                <Link href="/admin/clients/new" className="btn-gold">+ Add Client</Link>
            </div>

            <div className="bg-white border border-eminence-gold/15">
                {clients.map((client) => (
                    <Link
                        key={client.id}
                        href={`/admin/clients/${client.id}`}
                        className="flex items-center gap-4 p-4 border-b border-eminence-gold/10 last:border-b-0 hover:bg-eminence-ivory transition-colors"
                    >
                        <span className="flex-1 font-medium text-eminence-black">{client.name}</span>
                        <span className="text-xs text-eminence-gray-600">{client.logo ? "Has logo" : "Text only"}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}