import Image from "next/image";
import { getAllClients } from "@/data/clients";

export default async function TrustedClients() {
    const clients = await getAllClients();

    if (clients.length === 0) return null;

    const loopedClients = [...clients, ...clients];

    return (
        <section className="py-16 md:py-20 bg-eminence-ivory-dark border-y border-eminence-gold/15 overflow-hidden">
            <div className="eminence-container mb-10">
                <p className="eminence-label text-center">
                    Trusted by businesses and institutions
                </p>
            </div>

            <div className="relative w-full overflow-hidden">
                <div className="flex w-max animate-marquee">
                    {loopedClients.map((client, i) => (
                        <div key={`${client.id}-${i}`} className="flex items-center justify-center shrink-0 w-40 md:w-48 h-16 px-4">
                            {client.logo ? (
                                <div className="relative w-full h-full grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
                                    <Image src={client.logo} alt={client.name} fill className="object-contain" />
                                </div>
                            ) : (
                                <span className="text-sm md:text-base font-heading font-semibold text-eminence-black/60 hover:text-eminence-gold transition-colors duration-300 text-center">
                                    {client.name}
                                </span>
                            )}
                        </div>
                    ))}
                </div>

                <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24 bg-gradient-to-r from-eminence-ivory-dark to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24 bg-gradient-to-l from-eminence-ivory-dark to-transparent" />
            </div>
        </section>
    );
}