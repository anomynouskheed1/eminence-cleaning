import Image from "next/image";
import { getAllClients } from "@/data/clients";

const clientLogos: Record<string, string> = {
    "duma tours": "/images/clients/duma-tours.png",
    chartafai: "/images/clients/Chartafai.png",
    "sancas architects": "/images/clients/sancas-architects.png",
    "mbuzi hq": "/images/clients/mbuzi-hq.png",
    "brainiarchs studios": "/images/clients/brainiarchs-studios.png",
    "thermo expert": "/images/clients/thermo-expert.png",

};

function getClientLogo(
    name: string,
    databaseLogo?: string | null
): string | undefined {
    // Use the Supabase logo first if one exists
    if (databaseLogo?.trim()) {
        return databaseLogo;
    }

    const normalizedName = name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, " ");

    // Match part of the database client name
    // e.g. "Thermo Expert Construction Company"
    // matches "thermo expert"
    const matchingKey = Object.keys(clientLogos).find((key) =>
        normalizedName.includes(key)
    );

    return matchingKey ? clientLogos[matchingKey] : undefined;
}

export default async function TrustedClients() {
    const clients = await getAllClients();

    if (clients.length === 0) {
        return null;
    }

    // Duplicate clients for the continuous marquee
    const loopedClients = [...clients, ...clients];

    return (
        <section className="py-16 md:py-20 bg-eminence-ivory-dark border-y border-eminence-gold/15 overflow-hidden">
            {/* SECTION TITLE */}
            <div className="eminence-container mb-10">
                <p className="eminence-label text-center">
                    Trusted by businesses and institutions
                </p>
            </div>

            {/* MARQUEE */}
            <div className="relative w-full overflow-hidden">
                <div className="flex w-max animate-marquee">
                    {loopedClients.map((client, i) => {
                        const logo = getClientLogo(
                            client.name,
                            client.logo
                        );

                        return (
                            <div
                                key={`${client.id}-${i}`}
                                className="
                                    flex
                                    flex-col
                                    items-center
                                    justify-center
                                    shrink-0
                                    w-56
                                    md:w-64
                                    px-6
                                "
                            >
                                {/* LOGO */}
                                <div className="relative w-40 md:w-48 h-16 md:h-20">
                                    {logo ? (
                                        <Image
                                            src={logo}
                                            alt={`${client.name} logo`}
                                            fill
                                            sizes="192px"
                                            className="
                                                object-contain
                                                transition-all
                                                duration-300
                                                opacity-90
                                                hover:opacity-100
                                            "
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center">
                                            <span className="text-sm font-heading font-semibold text-eminence-black/60 text-center leading-relaxed">
                                                {client.name}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* CLIENT NAME */}
                                <p
                                    className="
                                        mt-4
                                        max-w-[220px]
                                        text-xs
                                        md:text-sm
                                        font-medium
                                        text-eminence-black/70
                                        text-center
                                        leading-relaxed
                                        whitespace-normal
                                    "
                                >
                                    {client.name}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* LEFT FADE */}
                <div
                    className="
                        pointer-events-none
                        absolute
                        inset-y-0
                        left-0
                        w-16
                        md:w-28
                        bg-gradient-to-r
                        from-eminence-ivory-dark
                        to-transparent
                    "
                />

                {/* RIGHT FADE */}
                <div
                    className="
                        pointer-events-none
                        absolute
                        inset-y-0
                        right-0
                        w-16
                        md:w-28
                        bg-gradient-to-l
                        from-eminence-ivory-dark
                        to-transparent
                    "
                />
            </div>
        </section>
    );
}