// components/header.tsx
// The fixed top navigation bar.
// 'use client' is required because we use useState + useEffect for scroll detection.
// If you remove the scroll effect, you could make this a Server Component.

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // We listen to scroll events to add a shadow when the user scrolls down.
    // Your Stitch HTML has this behavior via a static class — we make it dynamic.
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    // Cleanup prevents memory leaks when the component unmounts.
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // fixed top-0 w-full z-50: stays at top, above everything (z-50)
    // max-w-container-max mx-auto: caps width at 1280px and centers it
    // The nav in your Stitch HTML is actually full-width but content is capped —
    // we replicate this with an inner div approach below.
    <nav className={`
      fixed top-0 left-0 right-0 z-50
      bg-surface/80 backdrop-blur-md
      border-b border-outline-variant/30
      transition-all duration-200
      ${scrolled ? 'shadow-sm' : ''}
    `}>
      {/* Inner wrapper constrains width and provides the px-gutter py-sm spacing */}
      <div className="max-w-container-max mx-auto px-gutter py-sm flex justify-between items-center">
        
        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Dockly Logo"
            width={32}
            height={32}
            className="h-8 w-auto"
          />
          {/* 
            text-headline-md = 24px/600 weight from your @theme token.
            font-black overrides to 900 weight for the brand name.
          */}
          <span className="text-headline-md font-black text-on-surface">Dockly</span>
        </Link>

        {/* ── Nav Links — hidden on mobile, shown from md breakpoint ── */}
        <div className="hidden md:flex items-center gap-lg">
          {/* 
            Active link (Features) uses text-secondary + bottom border.
            Other links use text-on-surface-variant and become secondary on hover.
            This exactly matches your Stitch HTML styling.
          */}
          <Link
            href="#features"
            className="text-body-md text-secondary font-semibold border-b-2 border-secondary pb-1 
                       hover:bg-surface-container-low transition-all duration-200"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-body-md text-on-surface-variant hover:text-secondary 
                       hover:bg-surface-container-low transition-all duration-200"
          >
            Pricing
          </Link>
          <Link
            href="#docs"
            className="text-body-md text-on-surface-variant hover:text-secondary 
                       hover:bg-surface-container-low transition-all duration-200"
          >
            Docs
          </Link>
        </div>

        {/* ── CTA Buttons ── */}
        <div className="flex items-center gap-md">
          {/* 
            Login uses ghost variant — no background, subtle hover.
            hidden md:block mirrors your Stitch HTML (hidden on mobile).
          */}
          <Button variant="ghost" className="hidden md:block">
            Login
          </Button>
          {/* 
            Get Started is the primary CTA — filled indigo button.
            Uses shadcn Button default variant which maps to your brand indigo.
          */}
          <Button>
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
}