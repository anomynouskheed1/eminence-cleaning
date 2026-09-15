import Link from "next/link";
import { getAllServices } from "@/data/services";
import { Service } from "@/types/service";

const WHATSAPP_NUMBER = "254717803558";

const socials = [
    { label: "Facebook", href: "#", icon: (<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" /></svg>) },
    { label: "Instagram", href: "https://www.instagram.com/eminencecleaningco?stkn=OHdhdjNhbXdpZXho", icon: (<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.15.55.55.89 1.11 1.15 1.77.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77A4.9 4.9 0 0 1 5.45.53c.64-.25 1.37-.42 2.43-.47C8.94.01 9.28 0 12 0Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Zm5.2-8.4a1.17 1.17 0 1 1 0-2.34 1.17 1.17 0 0 1 0 2.34Z" /></svg>) },
    { label: "TikTok", href: "https://www.tiktok.com/@eminence.cleaning?_r=1&_t=ZS-99fgRHKqKdG", icon: (<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M16.6 5.82c-.9-.98-1.4-2.25-1.4-3.57h-3.03v13.6a3.1 3.1 0 0 1-3.1 3 3.1 3.1 0 0 1 0-6.2c.29 0 .57.04.83.12V9.6a6.14 6.14 0 0 0-.83-.06 6.13 6.13 0 1 0 6.13 6.13V9.4a8.7 8.7 0 0 0 5.15 1.67V8.04a5.4 5.4 0 0 1-3.75-2.22Z" /></svg>) },
    { label: "WhatsApp", href: `https://wa.me/${WHATSAPP_NUMBER}`, icon: (<svg viewBox="0 0 32 32" fill="currentColor" className="w-4 h-4"><path d="M16.004 3C9.376 3 4 8.373 4 15c0 2.386.7 4.607 1.902 6.474L4 29l7.72-1.87A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm.002 21.818a9.78 9.78 0 0 1-4.98-1.363l-.357-.212-4.583 1.11 1.13-4.464-.233-.366A9.77 9.77 0 0 1 5.2 15c0-5.42 4.41-9.818 9.806-9.818S24.8 9.58 24.8 15s-4.4 9.818-9.794 9.818Zm5.37-7.35c-.294-.148-1.74-.858-2.01-.956-.27-.099-.467-.148-.664.148-.196.295-.762.955-.934 1.152-.172.197-.343.222-.637.074-.294-.148-1.243-.457-2.367-1.457-.875-.78-1.466-1.744-1.638-2.039-.172-.295-.018-.454.13-.601.134-.133.294-.345.442-.517.147-.172.196-.295.294-.492.098-.197.05-.369-.024-.517-.074-.148-.664-1.599-.91-2.19-.24-.575-.483-.497-.664-.506-.172-.008-.368-.01-.565-.01-.196 0-.516.074-.786.369-.27.295-1.03 1.007-1.03 2.457 0 1.45 1.055 2.85 1.202 3.047.147.197 2.077 3.17 5.033 4.445.703.304 1.252.485 1.68.62.706.225 1.348.193 1.856.117.566-.084 1.74-.712 1.985-1.4.245-.688.245-1.278.172-1.4-.074-.123-.27-.197-.565-.345Z" /></svg>) },
];

const serviceLinks = [
    "Residential Cleaning",
    "Commercial Cleaning",
    "Industrial Cleaning",
    "Disinfection & Sanitation",
    "Pest Control",
    "Post-Event Cleaning",
];

export default async function Footer() {
    const services: Service[] = await getAllServices();

    // Try to match footer service labels to real slugs where possible
    const findSlug = (label: string) =>
        services.find((s) => s.title.toLowerCase().includes(label.toLowerCase().split(" ")[0]))?.slug;

    return (
        <footer className="bg-eminence-black text-white pt-16 md:pt-20 pb-8">
            <div className="eminence-container grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-14">
                <div className="md:col-span-1">
                    <span className="font-heading text-2xl font-bold block mb-1">Eminence Cleaning Co.</span>
                    <p className="text-xs text-white/50 mb-4">Where Cleanliness Meets Class</p>
                </div>

                <div>
                    <h4 className="text-sm font-semibold text-white mb-5">Quick Links</h4>
                    <ul className="space-y-3 text-sm text-white/60">
                        <li><Link href="/" className="hover:text-eminence-gold transition-colors">Home</Link></li>
                        <li><Link href="/about" className="hover:text-eminence-gold transition-colors">About</Link></li>
                        <li><Link href="/services" className="hover:text-eminence-gold transition-colors">Services</Link></li>
                        <li><Link href="/work" className="hover:text-eminence-gold transition-colors">Our Work</Link></li>
                        <li><Link href="/contact" className="hover:text-eminence-gold transition-colors">Contact</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-sm font-semibold text-white mb-5">Services</h4>
                    <ul className="space-y-3 text-sm text-white/60">
                        {serviceLinks.map((label) => {
                            const slug = findSlug(label);
                            return (
                                <li key={label}>
                                    {slug ? (
                                        <Link href={`/services/${slug}`} className="hover:text-eminence-gold transition-colors">
                                            {label}
                                        </Link>
                                    ) : (
                                        <span>{label}</span>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div>
                    <h4 className="text-sm font-semibold text-white mb-5">Contact</h4>
                    <ul className="space-y-3 text-sm text-white/60">
                        <li>Blessed House, 4th Floor, Suite No. 71</li>
                        <li>Thika Road, opposite Garden City Mall</li>
                        <li>Nairobi, Kenya</li>
                        <li><a href="tel:+254717803558" className="hover:text-eminence-gold transition-colors">+254 717 803 558</a></li>
                        <li><a href="mailto:info.eminencecleaning@gmail.com" className="hover:text-eminence-gold transition-colors">info.eminencecleaning@gmail.com</a></li>
                    </ul>

                    <div className="flex gap-3 mt-6">
                        {socials.map((s) => (

                            <a key={s.label}
                                href={s.href}
                                target={s.href !== "#" ? "_blank" : undefined}
                                rel={s.href !== "#" ? "noopener noreferrer" : undefined}
                                aria-label={s.label}
                                className="w-9 h-9 flex items-center justify-center border border-white/15 hover:border-eminence-gold hover:text-eminence-gold transition-colors"
                            >
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <div className="eminence-container border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
                <p className="text-xs text-white/40">
                    © {new Date().getFullYear()} Eminence Cleaning Company Ltd. All rights reserved.
                </p>
                <p className="text-xs text-white/40">Where Cleanliness Meets Class</p>
            </div>
        </footer >
    );
}