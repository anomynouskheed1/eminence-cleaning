"use client";

import { useState } from "react";
import { Service } from "@/types/service";

interface BookServiceFormProps {
    services: Service[];
    defaultService?: string;
}

const WHATSAPP_NUMBER = "254717803558";

export default function BookServiceForm({ services, defaultService }: BookServiceFormProps) {
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [selectedService, setSelectedService] = useState(defaultService ?? "");
    const [location, setLocation] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const serviceTitle =
            services.find((s) => s.slug === selectedService)?.title ?? "Not specified";

        const message = `Hello Eminence, I'd like to book a service.

*Name:* ${name}
*Phone/Email:* ${contact}
*Service:* ${serviceTitle}
*Location:* ${location}`;

        const encodedMessage = encodeURIComponent(message);
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

        window.open(url, "_blank");
    };

    return (
        <div className="w-full max-w-sm md:max-w-md bg-white shadow-xl p-7 md:p-9 border border-eminence-gray-200">
            <span className="eminence-label block mb-1">Get Started</span>
            <h3 className="text-xl md:text-2xl font-heading font-bold text-eminence-black mb-6">
                Book a Service
            </h3>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-xs font-medium text-eminence-gray-600 mb-1.5">Full Name</label>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-eminence-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-eminence-green transition-colors"
                        placeholder="Your name"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-eminence-gray-600 mb-1.5">Phone / Email</label>
                    <input
                        type="text"
                        required
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        className="w-full border border-eminence-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-eminence-green transition-colors"
                        placeholder="Phone number or email"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-eminence-gray-600 mb-1.5">Service</label>
                    <select
                        required
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="w-full border border-eminence-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-eminence-green transition-colors bg-white"
                    >
                        <option value="">Select a service</option>
                        {services.map((s) => (
                            <option key={s.slug} value={s.slug}>
                                {s.title}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-medium text-eminence-gray-600 mb-1.5">Location</label>
                    <input
                        type="text"
                        required
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full border border-eminence-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-eminence-green transition-colors"
                        placeholder="Area / address"
                    />
                </div>

                <button type="submit" className="btn-primary w-full bg-eminence-green hover:bg-eminence-green-dark mt-2">
                    Book a Service →
                </button>
            </form>
        </div>
    );
}