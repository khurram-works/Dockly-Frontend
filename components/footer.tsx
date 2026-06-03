// components/footer.tsx
// Dark navy footer with logo, tagline, copyright, and 3 link columns.
// bg-primary-container = #131b2e (your dark navy token).
// All text uses on-primary-container (#7c839b) — the muted grey that's readable on dark.

import Link from "next/link";
import Image from "next/image";

// Link column data — DRY pattern again. Adding a new column is one array entry.
const footerLinks = [
  {
    heading: "Product",
    links: ["Features", "Pricing", "Docs"],
  },
  {
    heading: "Company",
    links: ["About", "Careers", "Blog"],
  },
  {
    heading: "Legal",
    links: ["Privacy", "Terms", "Security"],
  },
];

export default function Footer() {
  return (
    // bg-primary-container = #131b2e — matches your Stitch HTML footer exactly.
    // text-on-primary-container = #7c839b — muted text readable on dark bg.
    // py-xl = 4rem top/bottom padding (your spacing token).
    <footer
      className="bg-primary-container text-on-primary-container text-body-md 
                       w-full px-gutter py-xl flex flex-col md:flex-row 
                       justify-between items-start gap-lg"
    >
      {/* ── Left column: Logo + tagline + copyright ── */}
      <div className="flex flex-col gap-4 max-w-auto">
        <Link href="/" className="flex items-center gap-2">
          {/* 
            brightness-0 invert: turns the logo image pure white.
            This is a CSS filter trick — instead of having a separate white logo file,
            we take the dark logo and invert it with CSS.
          */}
          {/* <Image
            src="/logo.png"
            alt="Dockly Logo"
            width={32}
            height={32}
            className="h-8 w-auto brightness-0 invert"
          /> */}
          <Image
            src="/logo.png"
            alt="Dockly Logo"
            width={32}
            height={32}
            className="h-8 w-auto"
          />
          {/* text-on-primary = white (#ffffff) for the brand name on dark bg */}
          <span className="text-headline-md font-bold text-on-primary">
            Dockly
          </span>
        </Link>
        <div className="w-full">
          <p className="opacity-80">
            AI-powered support, powered by your docs.
          </p>
        </div>

        <p className="text-label-sm opacity-60">
          © 2025 Dockly. All rights reserved.
        </p>
      </div>

      {/* ── Right columns: Link groups ── */}
      {/* 
        flex-wrap allows columns to wrap on small screens.
        gap-xl md:gap-24 matches the spacing in your Stitch HTML.
      */}
      <div className="flex flex-wrap gap-xl md:gap-24">
        {footerLinks.map((group) => (
          <div key={group.heading} className="flex flex-col gap-3">
            {/* Column heading — slightly brighter than body text */}
            <h4 className="text-label-md text-on-primary font-semibold mb-2">
              {group.heading}
            </h4>
            {group.links.map((link) => (
              <Link
                key={link}
                href="#"
                // opacity-80 at rest, opacity-100 on hover — subtle reveal effect.
                // hover:text-secondary-fixed = the lighter indigo for dark backgrounds.
                className="text-on-primary-container opacity-80 hover:opacity-100 
                           hover:text-secondary-fixed transition-opacity"
              >
                {link}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </footer>
  );
}
