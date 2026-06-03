// components/herosection.tsx
// The first section visitors see. Contains: headline, subtext, 2 CTAs, product image.
// This is a Server Component (no 'use client') — no interactivity needed here.

import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function HeroSection() {
  return (
    // bg-surface-container-lowest = pure white (#ffffff) — your token.
    // py-24 md:py-32 matches Stitch's padding.
    // overflow-hidden stops the glow div from causing horizontal scroll.
    <section className="bg-surface-container-lowest py-20 md:py-24 px-gutter overflow-hidden relative">
      <div className="max-w-container-max mx-auto text-center relative z-10">

        {/* 
          Headline — two responsive sizes.
          On mobile: text-display-lg-mobile = 40px/800 weight (from your @theme)
          On md+: text-display-lg = 64px/800 weight (from your @theme)
          Your Stitch HTML uses both font- and text- prefixes for the same token.
          In Tailwind v4, text-display-lg already sets the font-size, line-height,
          and letter-spacing — you only need the text- class.
        */}
        <h1 className="text-display-lg-mobile md:text-size-display-lg text-on-surface max-w-4xl mx-auto mb-6 font-bold text-">
          Turn Your Documents Into a 24/7 AI Support Agent
        </h1>

        {/* Subheadline — text-body-lg = 18px, muted grey color */}
        <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10">
          Upload your PDFs. Get a shareable chatbot link. Let AI handle customer 
          questions automatically.
        </p>

        {/* 
          Button group — stacks vertically on mobile, horizontal on sm+.
          gap-4 matches your Stitch HTML (it uses gap-4, not gap-sm here).
        */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          {/* 
            Primary CTA — filled indigo. 
            w-full sm:w-auto: full width on mobile, natural width on desktop.
          */}
          <Button size="lg" className="w-full sm:w-auto">
            Start Free Trial
          </Button>
          {/* Secondary CTA — outlined style */}
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            See How It Works
          </Button>
        </div>

        {/* Trust line — small, uppercase, slightly transparent */}
        <p className="text-label-sm text-on-surface-variant opacity-80 uppercase tracking-wider">
          No credit card required · Setup in 5 minutes
        </p>

        {/* 
          Product screenshot area.
          The relative div + absolute glow creates the "aura" effect behind the image.
          The glow div uses -z-10 so it sits behind the image.
          scale-90 + translate-y-8 shifts the glow blob slightly down and smaller
          than the image, making it look like a soft shadow glow.
        */}
        <div className="mt-16 relative max-w-5xl mx-auto">
          {/* Ambient glow behind the image */}
          <div className="absolute inset-0 bg-secondary/10 blur-3xl rounded-full -z-10 transform scale-90 translate-y-8" />
          
          {/* 
            Next.js Image component — always use this instead of <img>.
            priority tells Next.js to preload this image since it's above the fold.
            Replace src with your actual screenshot path in /public.
          */}
          <Image
            src="/screen.png"
            alt="Dockly Chat Interface Mockup"
            width={1200}
            height={750}
            priority
            className="w-full h-auto rounded-xl shadow-2xl border border-surface-variant"
          />
        </div>
      </div>
    </section>
  );
}