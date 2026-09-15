import Link from "next/link";
import { getAllTestimonials } from "@/data/testimonials";

export default async function AdminTestimonialsPage() {
    const testimonials = await getAllTestimonials();

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-heading font-bold text-eminence-black">Testimonials</h1>
                <Link href="/admin/testimonials/new" className="btn-gold">+ Add Testimonial</Link>
            </div>

            <div className="bg-white border border-eminence-gold/15">
                {testimonials.length === 0 && (
                    <p className="p-6 text-sm text-eminence-gray-600">No testimonials yet.</p>
                )}
                {testimonials.map((t) => (
                    <Link
                        key={t.id}
                        href={`/admin/testimonials/${t.id}`}
                        className="block p-4 border-b border-eminence-gold/10 last:border-b-0 hover:bg-eminence-ivory transition-colors"
                    >
                        <p className="text-sm text-eminence-black truncate">{t.quote}</p>
                        <p className="text-xs text-eminence-gray-600 mt-1">{t.author ?? "No name given"}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}