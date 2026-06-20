import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function HeroSection() {
  return (

    <section className="bg-surface-container-lowest py-20 md:py-24 px-gutter overflow-hidden relative">
      <div className="max-w-container-max mx-auto text-center relative z-10">

        <h1 className="text-display-lg-mobile md:text-size-display-lg text-on-surface max-w-4xl mx-auto mb-6 font-bold text-">
          Turn Your Documents Into a 24/7 AI Support Agent
        </h1>

        <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10">
          Upload your PDFs. Get a shareable chatbot link. Let AI handle customer 
          questions automatically.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Button size="lg" className="w-full sm:w-auto">
            Start Free Trial
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            See How It Works
          </Button>
        </div>
        <p className="text-label-sm text-on-surface-variant opacity-80 uppercase tracking-wider">
          No credit card required · Setup in 5 minutes
        </p>

        <div className="mt-16 relative max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-secondary/10 blur-3xl rounded-full -z-10 transform scale-90 translate-y-8" />
          
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