import Header from "@/components/landingPage/header";
import HeroSection from "@/components/landingPage/herosection";
import FeaturesSection from "@/components/landingPage/featureSection";
import HowItWorksSection from "@/components/landingPage/howItWorksSection";
import PricingSection from "@/components/landingPage/pricingSection";
import Footer from "@/components/landingPage/footer";

export default function Home() {

  return (
    <>
      <Header  />
      <main className="grow pt-26">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <PricingSection />
      </main>
      <Footer />
    </>
  );
}