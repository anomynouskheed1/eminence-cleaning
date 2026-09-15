import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroAbout from "@/components/home/HeroAbout";
import TrustedClients from "@/components/home/TrustedClients";
import ServicesSection from "@/components/home/ServicesSection";
import WhyEminence from "@/components/home/WhyEminence";
import OurWork from "@/components/home/OurWork";
import VideoShowcase from "@/components/home/VideoShowcase";
import ProcessAndTestimonial from "@/components/home/ProcessAndTestimonial";
import LocationSection from "@/components/home/LocationSection";
import FinalCTA from "@/components/home/FinalCTA";

export default async function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroAbout />
        <TrustedClients />
        <ServicesSection />
        <WhyEminence />
        <OurWork />
        <VideoShowcase />
        <ProcessAndTestimonial />
        <LocationSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}