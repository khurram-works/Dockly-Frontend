// components/howItWorksSection.tsx
// 4 numbered steps in a horizontal row (desktop) or vertical stack (mobile).
// The connecting line between steps is a CSS trick using absolute positioning.

const steps = [
  { number: 1, label: 'Register your company' },
  { number: 2, label: 'Upload your documents' },
  { number: 3, label: 'Get your public chatbot URL' },
  { number: 4, label: 'Customers get instant AI answers' },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-surface-container-lowest py-24 px-gutter">
      <div className="max-w-container-max mx-auto">

        <div className="text-center mb-16">
          <h2 className="text-headline-xl-mobile md:text-headline-xl text-on-surface">
            Up and running in 4 steps
          </h2>
        </div>

        {/* 
          The outer div is relative so the connecting line can be positioned absolutely.
          On mobile (flex-col) the line is hidden (hidden md:block).
          On desktop (flex-row) the line stretches across behind the step circles.
        */}
        <div className="flex flex-col md:flex-row justify-between items-start relative">
          
          {/* 
            Connecting line — only visible on desktop.
            top-6 aligns it with the center of the step circles (circle is h-12 = 48px, center = 24px ≈ top-6).
            left-12 right-12 adds inset so the line doesn't extend beyond the first/last circles.
            -z-10 puts it behind the numbered circles.
            bg-surface-container-lowest on each step div "cuts" the line visually where the circles are.
          */}
          <div className="hidden md:block absolute top-6 left-12 right-12 h-0.5 bg-outline-variant/30 -z-10" />

          {steps.map((step) => (
            <div
              key={step.number}
              // Each step: centered content, 1/4 width on desktop, full width on mobile.
              // relative z-10 + bg-surface-container-lowest: the white background "covers"
              // the connecting line where the circle sits, making it look like the line
              // passes between the circles but doesn't overlap them.
              className="flex flex-col items-center text-center w-full md:w-1/4 px-4 mb-8 md:mb-0 
                         relative z-10 bg-surface-container-lowest"
            >
              {/* Numbered circle — filled indigo with white number */}
              <div className="w-12 h-12 rounded-full bg-secondary text-white text-headline-md 
                              flex items-center justify-center mb-4 shadow-md">
                {step.number}
              </div>
              <p className="text-label-md text-on-surface font-semibold">{step.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}