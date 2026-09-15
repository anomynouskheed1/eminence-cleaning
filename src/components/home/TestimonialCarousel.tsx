import TestimonialCarouselClient from "./TestimonialCarouselClient";
import { getAllTestimonials } from "@/data/testimonials";

export default async function TestimonialCarousel() {
    const testimonials = await getAllTestimonials();

    if (testimonials.length === 0) return null;

    return <TestimonialCarouselClient testimonials={testimonials} />;
}