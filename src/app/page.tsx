import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import AboutBookingRow from "@/components/home/AboutBookingRow";
import ServicesSection from "@/components/home/ServicesSection";
import WhyEminence from "@/components/home/WhyEminence";
import OurWork from "@/components/home/OurWork";
import BeforeAfter from "@/components/home/BeforeAfter";
import ProcessAndTestimonial from "@/components/home/ProcessAndTestimonial";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AboutBookingRow />
        <ServicesSection />
        <WhyEminence />
        <OurWork />
        <BeforeAfter />
        <ProcessAndTestimonial />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}