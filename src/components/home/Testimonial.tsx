interface TestimonialProps {
    quote?: string;
    author?: string;
    role?: string;
}

export default function Testimonial({ quote, author, role }: TestimonialProps) {
    if (!quote) return null; // Don't render fake reviews — wait for a real one

    return (
        <section className="py-20 md:py-28 bg-eminence-gray-50">
            <div className="eminence-container max-w-2xl text-center">
                <span className="eminence-label block mb-6">What Clients Say</span>
                <p className="text-xl md:text-2xl font-heading text-eminence-black leading-relaxed mb-8">
                    &ldquo;{quote}&rdquo;
                </p>
                <p className="text-sm font-medium text-eminence-black">{author}</p>
                {role && <p className="text-sm text-eminence-gray-600">{role}</p>}
            </div>
        </section>
    );
}