import Link from "next/link";
import Image from "next/image";

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
    <footer
      className="bg-primary-container text-on-primary-container text-body-md 
                       w-full px-gutter py-xl flex flex-col md:flex-row 
                       justify-between items-start gap-lg"
    >
      <div className="flex flex-col gap-4 max-w-auto">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Dockly Logo"
            width={32}
            height={32}
            className="h-8 w-auto"
          />
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

      <div className="flex flex-wrap gap-xl md:gap-24">
        {footerLinks.map((group) => (
          <div key={group.heading} className="flex flex-col gap-3">
            <h4 className="text-label-md text-on-primary font-semibold mb-2">
              {group.heading}
            </h4>
            {group.links.map((link) => (
              <span
                key={link}
                // href=""
                className="text-on-primary-container opacity-80 hover:opacity-100 
                           hover:text-secondary-fixed transition-opacity"
              >
                {link}
              </span>
            ))}
          </div>
        ))}
      </div>
    </footer>
  );
}
