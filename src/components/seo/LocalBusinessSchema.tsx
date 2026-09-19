export default function LocalBusinessSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Eminence Cleaning Company",
        alternateName: "Eminence Cleaning Co.",
        description:
            "Premier cleaning services provider in Kenya offering residential, commercial and industrial cleaning solutions.",
        url: "https://eminencecleanin.com",
        telephone: "+254717803558",
        email: "info.eminencecleaning@gmail.com",
        address: {
            "@type": "PostalAddress",
            streetAddress: "Blessed House, 4th Floor, Suite No. 71, Thika Road, opposite Garden City Mall",
            addressLocality: "Nairobi",
            postalCode: "00400",
            addressCountry: "KE",
        },
        sameAs: [
            "https://www.tiktok.com/@eminence.cleaning",
            "https://instagram.com/eminencecleaningco",
        ],
        priceRange: "$$",
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}