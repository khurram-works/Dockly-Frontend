// app/page.tsx
// This file is just an orchestrator — it imports and arranges sections.
// No styles, no logic live here. Think of it as a table of contents.

import Header from "@/components/header";
import HeroSection from "@/components/herosection";
import FeaturesSection from "@/components/featureSection";
import HowItWorksSection from "@/components/howItWorksSection";
import PricingSection from "@/components/pricingSection";
import Footer from "@/components/footer";

export default function Home() {
  return (
    // The body already has bg-surface and text-on-surface from layout.tsx.
    // We just need min-h-screen flex flex-col so the footer sticks to the bottom
    // even on short pages. That's handled in layout.tsx's body class.
    <>
      <Header />
      {/* 
        pt-[104px] compensates for the fixed header.
        Your Stitch HTML uses exactly pt-[104px] on <main> — we match it precisely.
        Why 104px? Nav has py-sm (16px top + 16px bottom = 32px) + logo height ~40px 
        + some shadow breathing room = ~104px total.
      */}
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