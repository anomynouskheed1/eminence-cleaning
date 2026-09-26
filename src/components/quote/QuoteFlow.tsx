"use client";

import { useState } from "react";
import Image from "next/image";
import { QuoteFormData, initialQuoteData } from "@/types/quote";
import { submitQuoteRequest, uploadQuotePhoto } from "@/lib/quotes";

interface QuoteFlowProps {
    open: boolean;
    onClose: () => void;
}

const TOTAL_STEPS = 10;

function Chip({
    label,
    selected,
    onClick,
}: {
    label: string;
    selected: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`px-4 py-2.5 text-sm text-left border transition-colors duration-200 ${selected
                ? "bg-eminence-black text-white border-eminence-black"
                : "bg-white text-eminence-black border-eminence-gray-200 hover:border-eminence-gold"
                }`}
        >
            {label}
        </button>
    );
}

function Field({
    label,
    required,
    children,
}: {
    label: string;
    required?: boolean;
    children: React.ReactNode;
}) {
    return (
        <div>
            <label className="block text-xs font-medium text-eminence-gray-600 mb-1.5">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            {children}
        </div>
    );
}

const inputClass =
    "w-full border border-eminence-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-eminence-gold bg-white";

export default function QuoteFlow({ open, onClose }: QuoteFlowProps) {
    const [step, setStep] = useState(0);
    const [form, setForm] = useState<QuoteFormData>(initialQuoteData);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [uploading, setUploading] = useState(false);

    const update = (patch: Partial<QuoteFormData>) => setForm((f) => ({ ...f, ...patch }));

    const toggleInArray = (field: "services" | "addOns" | "challenges", value: string) => {
        const current = form[field];
        const next = current.includes(value)
            ? current.filter((v) => v !== value)
            : [...current, value];
        update({ [field]: next } as Partial<QuoteFormData>);
    };

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        setUploading(true);
        const uploaded: string[] = [];
        for (const file of Array.from(files)) {
            const url = await uploadQuotePhoto(file);
            if (url) uploaded.push(url);
        }
        update({ photos: [...form.photos, ...uploaded] });
        setUploading(false);
    };

    const removePhoto = (url: string) => {
        update({ photos: form.photos.filter((p) => p !== url) });
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        const { error } = await submitQuoteRequest(form);

        if (!error) {
            // Fire the email notification — don't block success screen on this
            fetch("/api/send-quote-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            }).catch((err) => console.error("Email notification failed:", err));

            setSubmitted(true);
        }

        setSubmitting(false);
    };

    const reset = () => {
        setForm(initialQuoteData);
        setStep(0);
        setSubmitted(false);
        onClose();
    };

    const isResidential = ["Apartment", "House"].includes(form.propertyType);
    const showFrequency = form.services.includes("Regular Cleaning");

    const canGoNext = () => {
        switch (step) {
            case 0:
                return form.intent !== "";
            case 1:
                return form.fullName && form.whatsapp && form.preferredContact && form.existingCustomer && form.customerType;
            case 2:
                return form.propertyType && form.location;
            case 3:
                return form.services.length > 0;
            default:
                return true;
        }
    };

    if (!open) return null;

    // Non-"get a quote" intents: short redirect screen instead of the full flow
    if (form.intent && form.intent !== "Get a quote" && step === 0) {
        return (
            <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-4">
                <div className="bg-white w-full sm:max-w-md p-8 text-center">
                    <h3 className="text-xl font-heading font-bold text-eminence-black mb-3">
                        Let's get you sorted
                    </h3>
                    <p className="text-sm text-eminence-gray-600 mb-8">
                        For &ldquo;{form.intent}&rdquo;, the fastest way to reach us is directly on WhatsApp
                        or the contact page — our team will help right away.
                    </p>
                    <div className="flex flex-col gap-3">

                        <a href="https://wa.me/254717803558"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-gold"
                        >
                            Message on WhatsApp
                        </a>
                        <button onClick={reset} className="text-sm text-eminence-gray-600 hover:text-eminence-gold">
                            Back
                        </button>
                    </div>
                </div>
            </div >
        );
    }

    return (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-4">
            <div className="bg-eminence-ivory w-full sm:max-w-xl max-h-[92vh] sm:max-h-[85vh] overflow-y-auto">
                {submitted ? (
                    <div className="p-10 text-center">
                        <div className="w-14 h-14 rounded-full bg-eminence-gold/15 flex items-center justify-center mx-auto mb-6">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7 text-eminence-gold">
                                <path d="M20 6L9 17l-5-5" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-heading font-bold text-eminence-black mb-3">
                            Request received.
                        </h3>
                        <p className="text-sm text-eminence-gray-600 mb-8 max-w-sm mx-auto">
                            Thank you. Our team has received your quote request and will review the
                            details. We&rsquo;ll contact you using your preferred contact method.
                        </p>
                        <button onClick={reset} className="btn-gold">
                            Close
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="sticky top-0 bg-eminence-ivory border-b border-eminence-gold/15 px-6 py-4 flex items-center justify-between z-10">
                            <div>
                                <p className="text-xs uppercase tracking-widest2 text-eminence-gold font-medium">
                                    Get a Free Quote
                                </p>
                                <p className="text-xs text-eminence-gray-500 mt-1">
                                    Step {step + 1} of {TOTAL_STEPS}
                                </p>
                            </div>
                            <button onClick={reset} className="text-eminence-gray-500 hover:text-eminence-black text-xl leading-none">
                                ×
                            </button>
                        </div>

                        {/* Progress bar */}
                        <div className="h-1 bg-eminence-gray-100">
                            <div
                                className="h-full bg-eminence-gold transition-all duration-300"
                                style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
                            />
                        </div>

                        <div className="p-6 space-y-5">
                            {/* STEP 0 — Intent */}
                            {step === 0 && (
                                <div className="space-y-3">
                                    <h3 className="text-lg font-heading font-bold text-eminence-black mb-2">
                                        What can we help you with?
                                    </h3>
                                    {[
                                        "Get a quote",
                                        "Request a preferred cleaning slot",
                                        "Book using an existing quote",
                                        "Arrange repeat cleaning",
                                        "Request a commercial/site visit",
                                    ].map((option) => (
                                        <Chip
                                            key={option}
                                            label={option}
                                            selected={form.intent === option}
                                            onClick={() => update({ intent: option })}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* STEP 1 — Customer */}
                            {step === 1 && (
                                <div className="space-y-4">
                                    <h3 className="text-lg font-heading font-bold text-eminence-black">About you</h3>
                                    <Field label="Full Name" required>
                                        <input className={inputClass} value={form.fullName} onChange={(e) => update({ fullName: e.target.value })} />
                                    </Field>
                                    <Field label="WhatsApp Number" required>
                                        <input className={inputClass} value={form.whatsapp} onChange={(e) => update({ whatsapp: e.target.value })} />
                                    </Field>
                                    <Field label="Email Address">
                                        <input type="email" className={inputClass} value={form.email} onChange={(e) => update({ email: e.target.value })} />
                                    </Field>
                                    <Field label="Preferred Contact Method" required>
                                        <select className={inputClass} value={form.preferredContact} onChange={(e) => update({ preferredContact: e.target.value })}>
                                            <option value="">Select</option>
                                            <option>WhatsApp</option>
                                            <option>Phone Call</option>
                                            <option>Email</option>
                                        </select>
                                    </Field>
                                    <Field label="Existing Customer?" required>
                                        <div className="flex gap-3">
                                            {["Yes", "No"].map((v) => (
                                                <Chip key={v} label={v} selected={form.existingCustomer === v} onClick={() => update({ existingCustomer: v })} />
                                            ))}
                                        </div>
                                    </Field>
                                    <Field label="Customer Type" required>
                                        <div className="grid grid-cols-2 gap-2">
                                            {["Residential", "Office / Commercial", "Property Management", "Hospitality", "Other"].map((v) => (
                                                <Chip key={v} label={v} selected={form.customerType === v} onClick={() => update({ customerType: v })} />
                                            ))}
                                        </div>
                                    </Field>
                                </div>
                            )}

                            {/* STEP 2 — Property */}
                            {step === 2 && (
                                <div className="space-y-4">
                                    <h3 className="text-lg font-heading font-bold text-eminence-black">Property details</h3>
                                    <Field label="Property Type" required>
                                        <div className="grid grid-cols-2 gap-2">
                                            {["Apartment", "House", "Office", "Commercial Space", "Retail / Shop", "Hospitality", "Construction / Renovation Site", "Other"].map((v) => (
                                                <Chip key={v} label={v} selected={form.propertyType === v} onClick={() => update({ propertyType: v })} />
                                            ))}
                                        </div>
                                    </Field>
                                    <Field label="Location / Area" required>
                                        <input className={inputClass} value={form.location} onChange={(e) => update({ location: e.target.value })} />
                                    </Field>
                                    <Field label="Postal Code">
                                        <input className={inputClass} value={form.postalCode} onChange={(e) => update({ postalCode: e.target.value })} />
                                    </Field>
                                    <Field label="Approximate Size">
                                        <input className={inputClass} placeholder="e.g. 3 bedroom, 1200 sq ft" value={form.propertySize} onChange={(e) => update({ propertySize: e.target.value })} />
                                    </Field>
                                    {isResidential && (
                                        <div className="grid grid-cols-2 gap-4">
                                            <Field label="Bedrooms">
                                                <input className={inputClass} value={form.bedrooms} onChange={(e) => update({ bedrooms: e.target.value })} />
                                            </Field>
                                            <Field label="Bathrooms">
                                                <input className={inputClass} value={form.bathrooms} onChange={(e) => update({ bathrooms: e.target.value })} />
                                            </Field>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* STEP 3 — Service */}
                            {step === 3 && (
                                <div className="space-y-3">
                                    <h3 className="text-lg font-heading font-bold text-eminence-black">
                                        What would you like us to help with?
                                    </h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        {["Regular Cleaning", "Deep Cleaning", "Move-In / Move-Out", "Post-Construction / Post-Renovation", "Carpet & Upholstery", "Mattress Cleaning", "Office / Commercial Cleaning", "Floor Care", "Specialized Cleaning", "Other"].map((v) => (
                                            <Chip key={v} label={v} selected={form.services.includes(v)} onClick={() => toggleInArray("services", v)} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* STEP 4 — Additional requirements */}
                            {step === 4 && (
                                <div className="space-y-3">
                                    <h3 className="text-lg font-heading font-bold text-eminence-black">
                                        Anything else you&rsquo;d like us to include?
                                    </h3>
                                    <p className="text-xs text-eminence-gray-500">Optional</p>
                                    <div className="grid grid-cols-2 gap-2">
                                        {["Oven Cleaning", "Fridge Cleaning", "Windows", "Floors", "Sofa / Upholstery", "Mattress", "Curtains", "Carpet", "Other"].map((v) => (
                                            <Chip key={v} label={v} selected={form.addOns.includes(v)} onClick={() => toggleInArray("addOns", v)} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* STEP 5 — Cleaning details */}
                            {step === 5 && (
                                <div className="space-y-4">
                                    <h3 className="text-lg font-heading font-bold text-eminence-black">Cleaning details</h3>
                                    <Field label="Overall condition">
                                        <div className="grid grid-cols-2 gap-2">
                                            {["Light", "Moderate", "Heavy", "Not sure"].map((v) => (
                                                <Chip key={v} label={v} selected={form.condition === v} onClick={() => update({ condition: v })} />
                                            ))}
                                        </div>
                                    </Field>
                                    <Field label="Potential challenges">
                                        <div className="grid grid-cols-2 gap-2">
                                            {["Heavy grease", "Pet hair", "Mould", "Cement / paint residue", "Pests / infestation", "Fragile items", "None", "Other"].map((v) => (
                                                <Chip key={v} label={v} selected={form.challenges.includes(v)} onClick={() => toggleInArray("challenges", v)} />
                                            ))}
                                        </div>
                                    </Field>
                                    {showFrequency && (
                                        <Field label="Frequency">
                                            <div className="grid grid-cols-2 gap-2">
                                                {["One-time", "Weekly", "Every 2 weeks", "Monthly", "Not sure"].map((v) => (
                                                    <Chip key={v} label={v} selected={form.frequency === v} onClick={() => update({ frequency: v })} />
                                                ))}
                                            </div>
                                        </Field>
                                    )}
                                </div>
                            )}

                            {/* STEP 6 — Photos */}
                            {step === 6 && (
                                <div className="space-y-4">
                                    <h3 className="text-lg font-heading font-bold text-eminence-black">
                                        Help us understand the space
                                    </h3>
                                    <p className="text-sm text-eminence-gray-600">
                                        Upload a few photos of the area you&rsquo;d like cleaned. This helps our
                                        team understand the scope before preparing your quote.
                                    </p>
                                    <p className="text-xs text-eminence-gray-500">Optional</p>
                                    <input type="file" accept="image/*" multiple onChange={handlePhotoUpload} disabled={uploading}
                                        className="w-full text-sm text-eminence-gray-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-medium file:bg-eminence-gold file:text-white hover:file:bg-eminence-gold-dark file:cursor-pointer cursor-pointer disabled:opacity-60" />
                                    {uploading && <p className="text-xs text-eminence-gray-600">Uploading...</p>}
                                    {form.photos.length > 0 && (
                                        <div className="grid grid-cols-3 gap-2">
                                            {form.photos.map((url) => (
                                                <div key={url} className="relative aspect-square bg-eminence-gray-100">
                                                    <Image src={url} alt="Uploaded" fill className="object-cover" />
                                                    <button onClick={() => removePhoto(url)} className="absolute top-1 right-1 w-5 h-5 bg-black/70 text-white text-xs flex items-center justify-center rounded-full">×</button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* STEP 7 — Scheduling */}
                            {step === 7 && (
                                <div className="space-y-4">
                                    <h3 className="text-lg font-heading font-bold text-eminence-black">Scheduling</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Field label="Preferred Date">
                                            <input type="date" className={inputClass} value={form.preferredDate} onChange={(e) => update({ preferredDate: e.target.value })} />
                                        </Field>
                                        <Field label="Preferred Time">
                                            <input type="time" className={inputClass} value={form.preferredTime} onChange={(e) => update({ preferredTime: e.target.value })} />
                                        </Field>
                                    </div>
                                    <Field label="Alternative Date">
                                        <input type="date" className={inputClass} value={form.alternativeDate} onChange={(e) => update({ alternativeDate: e.target.value })} />
                                    </Field>
                                    <Field label="How flexible are you?">
                                        <div className="grid grid-cols-1 gap-2">
                                            {["Flexible", "Somewhat flexible", "Specific date required"].map((v) => (
                                                <Chip key={v} label={v} selected={form.flexibility === v} onClick={() => update({ flexibility: v })} />
                                            ))}
                                        </div>
                                    </Field>
                                    <Field label="Urgency">
                                        <div className="grid grid-cols-1 gap-2">
                                            {["Flexible", "Within the next few days", "As soon as possible"].map((v) => (
                                                <Chip key={v} label={v} selected={form.urgency === v} onClick={() => update({ urgency: v })} />
                                            ))}
                                        </div>
                                    </Field>
                                </div>
                            )}

                            {/* STEP 8 — Access */}
                            {step === 8 && (
                                <div className="space-y-4">
                                    <h3 className="text-lg font-heading font-bold text-eminence-black">Access details</h3>
                                    <Field label="Contact person on site">
                                        <input className={inputClass} value={form.contactPerson} onChange={(e) => update({ contactPerson: e.target.value })} />
                                    </Field>
                                    <Field label="Access / Parking / Lift information">
                                        <textarea rows={2} className={inputClass} value={form.accessDetails} onChange={(e) => update({ accessDetails: e.target.value })} />
                                    </Field>
                                    <Field label="Pets?">
                                        <div className="flex gap-3">
                                            {["Yes", "No"].map((v) => (
                                                <Chip key={v} label={v} selected={form.pets === v} onClick={() => update({ pets: v })} />
                                            ))}
                                        </div>
                                    </Field>
                                    <Field label="Additional notes">
                                        <textarea rows={2} className={inputClass} value={form.notes} onChange={(e) => update({ notes: e.target.value })} />
                                    </Field>
                                </div>
                            )}

                            {/* STEP 9 — Review */}
                            {step === 9 && (
                                <div className="space-y-5">
                                    <h3 className="text-lg font-heading font-bold text-eminence-black">Review your request</h3>
                                    <div className="bg-white border border-eminence-gold/15 p-4 text-sm space-y-2 text-eminence-gray-600">
                                        <p><span className="text-eminence-black font-medium">Name:</span> {form.fullName}</p>
                                        <p><span className="text-eminence-black font-medium">Contact:</span> {form.whatsapp} · {form.preferredContact}</p>
                                        <p><span className="text-eminence-black font-medium">Property:</span> {form.propertyType}, {form.location}</p>
                                        <p><span className="text-eminence-black font-medium">Services:</span> {form.services.join(", ") || "—"}</p>
                                        {form.addOns.length > 0 && <p><span className="text-eminence-black font-medium">Add-ons:</span> {form.addOns.join(", ")}</p>}
                                        <p><span className="text-eminence-black font-medium">Schedule:</span> {form.preferredDate || "Not specified"} {form.preferredTime}</p>
                                        {form.photos.length > 0 && <p><span className="text-eminence-black font-medium">Photos:</span> {form.photos.length} uploaded</p>}
                                        {form.notes && <p><span className="text-eminence-black font-medium">Notes:</span> {form.notes}</p>}
                                    </div>

                                    <div className="bg-eminence-gold/5 border border-eminence-gold/20 p-4 text-xs text-eminence-gray-600 leading-relaxed">
                                        <p className="font-medium text-eminence-black mb-1">Before you submit</p>
                                        This is a quote request, not a confirmed booking. Our team will review the
                                        information provided and contact you to discuss your requirements and
                                        pricing. Final pricing may vary depending on the actual condition, size and
                                        scope of work.
                                    </div>

                                    <label className="flex items-start gap-2 text-xs text-eminence-gray-600">
                                        <input type="checkbox" checked={form.agreedToTerms} onChange={(e) => update({ agreedToTerms: e.target.checked })} className="mt-0.5" />
                                        I agree to the{" "}
                                        <a href="/terms" className="text-eminence-gold underline">Terms & Conditions</a> and{" "}
                                        <a href="/privacy" className="text-eminence-gold underline">Privacy Policy</a>.
                                    </label>
                                    <p className="text-[11px] text-eminence-gray-400">
                                        Your information is used only to review and respond to your service request.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Footer nav */}
                        <div className="sticky bottom-0 bg-eminence-ivory border-t border-eminence-gold/15 px-6 py-4 flex items-center justify-between">
                            <button
                                onClick={() => (step === 0 ? reset() : setStep(step - 1))}
                                className="text-sm text-eminence-gray-600 hover:text-eminence-black"
                            >
                                {step === 0 ? "Cancel" : "Back"}
                            </button>

                            {step < TOTAL_STEPS - 1 ? (
                                <button
                                    onClick={() => canGoNext() && setStep(step + 1)}
                                    disabled={!canGoNext()}
                                    className="btn-gold disabled:opacity-40"
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    disabled={!form.agreedToTerms || submitting}
                                    className="btn-gold disabled:opacity-40"
                                >
                                    {submitting ? "Submitting..." : "Submit Quote Request"}
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}