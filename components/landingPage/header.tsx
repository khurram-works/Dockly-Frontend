'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const navLinks = [
  { href: '#docs', label: 'Docs' },
  { href: '#features', label: 'Features' },
  { href: '#pricing', label: 'Pricing' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  // Track which link is currently active. Initialized to '#docs' per your request.
  const [activeLink, setActiveLink] = useState('#docs');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 transition-all duration-200 ${scrolled ? 'shadow-sm' : ''}`}>
      <div className="max-w-container-max mx-auto px-gutter py-sm flex justify-between items-center">
        
        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Dockly Logo" width={32} height={32} className="h-8 w-auto" />
          <span className="text-headline-md font-black text-on-surface">Dockly</span>
        </Link>

        {/* ── Nav Links ── */}
        <div className="hidden md:flex items-center gap-lg">
          {navLinks.map((link) => {
            const isActive = activeLink === link.href;
            
            return (
              <Link 
                key={link.href} 
                href={link.href}
                onClick={() => {setActiveLink(link.href);
                  
                }}
                className={`text-body-md font-semibold transition-all duration-200 pb-1 border-b-2 hover:bg-surface-container-low ${
                  isActive 
                    ? 'text-blue-600 border-blue-600' // Styling for the active clicked link (Blue text + Blue underline)
                    : 'text-on-surface-variant border-transparent hover:text-secondary' // Styling for inactive links
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* ── CTA Buttons ── */}
        <div className="flex items-center gap-md">
          <Button variant="ghost" className="hidden md:block">Login</Button>
          <Button>Get Started</Button>
        </div>

      </div>
    </nav>
  );
}