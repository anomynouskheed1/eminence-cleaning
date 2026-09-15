"use client";

import { useState } from "react";
import { Service } from "@/types/service";

interface BookServiceFormProps {
    services: Service[];
    defaultService?: string;
}

const WHATSAPP_NUMBER = "254717803558";

export default function BookServiceForm({
    services,
    defaultService,
}: BookServiceFormProps) {
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [selectedService, setSelectedService] = useState(
        defaultService ?? ""
    );
    const [location, setLocation] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const serviceTitle =
            services.find((s) => s.slug === selectedService)?.title ??
            "Not specified";

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
        <div
            className="
                w-full
                bg-white
                border
                border-eminence-black/10
                shadow-[0_20px_60px_rgba(0,0,0,0.12)]
                p-6
                sm:p-7
                md:p-8
            "
        >
            {/* Header */}
            <div className="mb-6">
                <span className="eminence-label block mb-1.5">
                    Get Started
                </span>

                <h3 className="text-2xl md:text-3xl font-heading font-bold text-eminence-black">
                    Book a Service
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-eminence-gray-500">
                    Tell us what you need and our team will get back to you.
                </p>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>

                {/* Name */}
                <div>
                    <label
                        htmlFor="booking-name"
                        className="block text-xs font-medium text-eminence-gray-600 mb-1.5"
                    >
                        Full Name
                    </label>

                    <input
                        id="booking-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="
                            w-full
                            border
                            border-eminence-gray-200
                            bg-white
                            px-4
                            py-3
                            text-sm
                            text-eminence-black
                            placeholder:text-eminence-gray-400
                            focus:outline-none
                            focus:border-eminence-gold
                            focus:ring-1
                            focus:ring-eminence-gold/20
                            transition-all
                        "
                        placeholder="Your name"
                    />
                </div>

                {/* Contact */}
                <div>
                    <label
                        htmlFor="booking-contact"
                        className="block text-xs font-medium text-eminence-gray-600 mb-1.5"
                    >
                        Phone / Email
                    </label>

                    <input
                        id="booking-contact"
                        type="text"
                        required
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        className="
                            w-full
                            border
                            border-eminence-gray-200
                            bg-white
                            px-4
                            py-3
                            text-sm
                            text-eminence-black
                            placeholder:text-eminence-gray-400
                            focus:outline-none
                            focus:border-eminence-gold
                            focus:ring-1
                            focus:ring-eminence-gold/20
                            transition-all
                        "
                        placeholder="Phone number or email"
                    />
                </div>

                {/* Service */}
                <div>
                    <label
                        htmlFor="booking-service"
                        className="block text-xs font-medium text-eminence-gray-600 mb-1.5"
                    >
                        Service
                    </label>

                    <select
                        id="booking-service"
                        required
                        value={selectedService}
                        onChange={(e) =>
                            setSelectedService(e.target.value)
                        }
                        className="
                            w-full
                            border
                            border-eminence-gray-200
                            bg-white
                            px-4
                            py-3
                            text-sm
                            text-eminence-black
                            focus:outline-none
                            focus:border-eminence-gold
                            focus:ring-1
                            focus:ring-eminence-gold/20
                            transition-all
                        "
                    >
                        <option value="">
                            Select a service
                        </option>

                        {services.map((service) => (
                            <option
                                key={service.slug}
                                value={service.slug}
                            >
                                {service.title}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Location */}
                <div>
                    <label
                        htmlFor="booking-location"
                        className="block text-xs font-medium text-eminence-gray-600 mb-1.5"
                    >
                        Location
                    </label>

                    <input
                        id="booking-location"
                        type="text"
                        required
                        value={location}
                        onChange={(e) =>
                            setLocation(e.target.value)
                        }
                        className="
                            w-full
                            border
                            border-eminence-gray-200
                            bg-white
                            px-4
                            py-3
                            text-sm
                            text-eminence-black
                            placeholder:text-eminence-gray-400
                            focus:outline-none
                            focus:border-eminence-gold
                            focus:ring-1
                            focus:ring-eminence-gold/20
                            transition-all
                        "
                        placeholder="Area / address"
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="
                        btn-gold
                        w-full
                        mt-2
                        justify-center
                    "
                >
                    Book a Service →
                </button>
            </form>
        </div>
    );
}