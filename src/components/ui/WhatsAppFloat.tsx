"use client";

const WHATSAPP_NUMBER = "254717803558";
const DEFAULT_MESSAGE = "Hello Eminence, I'd like to enquire about your cleaning services.";

export default function WhatsAppFloat() {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Eminence on WhatsApp"
            className="fixed bottom-6 right-6 z-50 group"
        >
            {/* Bouncing wave rings behind the button */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping-slow" />
            <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping-slower" />

            {/* Button */}
            <span className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] shadow-lg group-hover:scale-105 transition-transform duration-300">
                <svg
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7 md:w-8 md:h-8 fill-white"
                >
                    <path d="M16.004 3C9.376 3 4 8.373 4 15c0 2.386.7 4.607 1.902 6.474L4 29l7.72-1.87A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm.002 21.818a9.78 9.78 0 0 1-4.98-1.363l-.357-.212-4.583 1.11 1.13-4.464-.233-.366A9.77 9.77 0 0 1 5.2 15c0-5.42 4.41-9.818 9.806-9.818S24.8 9.58 24.8 15s-4.4 9.818-9.794 9.818Zm5.37-7.35c-.294-.148-1.74-.858-2.01-.956-.27-.099-.467-.148-.664.148-.196.295-.762.955-.934 1.152-.172.197-.343.222-.637.074-.294-.148-1.243-.457-2.367-1.457-.875-.78-1.466-1.744-1.638-2.039-.172-.295-.018-.454.13-.601.134-.133.294-.345.442-.517.147-.172.196-.295.294-.492.098-.197.05-.369-.024-.517-.074-.148-.664-1.599-.91-2.19-.24-.575-.483-.497-.664-.506-.172-.008-.368-.01-.565-.01-.196 0-.516.074-.786.369-.27.295-1.03 1.007-1.03 2.457 0 1.45 1.055 2.85 1.202 3.047.147.197 2.077 3.17 5.033 4.445.703.304 1.252.485 1.68.62.706.225 1.348.193 1.856.117.566-.084 1.74-.712 1.985-1.4.245-.688.245-1.278.172-1.4-.074-.123-.27-.197-.565-.345Z" />
                </svg>
            </span>
        </a>
    );
}