// components/featureSection.tsx
// 6 feature cards in a responsive grid: 1 col → 2 col → 3 col.
// We extract the card data into an array so the JSX stays clean and DRY.
// "DRY" = Don't Repeat Yourself — instead of copy-pasting 6 cards, we map over data.

// The feature data array — each object becomes one card.
// Keeping data separate from markup is a good React pattern.
const features = [
  {
    icon: 'upload_file',
    title: 'Upload Documents',
    description: 'Upload your PDFs, FAQs, and policy files in seconds.',
  },
  {
    icon: 'bolt',
    title: 'AI Learns Instantly',
    description: 'Our RAG pipeline extracts and indexes your content automatically.',
  },
  {
    icon: 'share',
    title: 'Share a Chat Link',
    description: 'Get a public URL your customers can use anytime.',
  },
  {
    icon: 'verified',
    title: 'Always Accurate',
    description: 'Answers come only from your documents. No hallucinations.',
  },
  {
    icon: 'analytics',
    title: 'Analytics Dashboard',
    description: 'Track questions, conversations, and popular topics.',
  },
  {
    icon: 'lock',
    title: 'Multi-Tenant Secure',
    description: "Every company's data is fully isolated and private.",
  },
];

export default function FeaturesSection() {
  return (
    // id="features" makes the "Features" nav link scroll here correctly.
    // bg-surface-container-low = light blue-grey tint (#eff4ff) — differentiates
    // this section from the white hero above it.
    <section id="features" className="bg-surface-container-low py-24 px-gutter">
      <div className="max-w-container-max mx-auto">

        {/* Section heading — centered, responsive size */}
        <div className="text-center mb-16">
          <h2 className="text-headline-xl-mobile md:text-headline-xl text-on-surface">
            Everything you need to automate support
          </h2>
        </div>

        {/* 
          Responsive grid: 1 column on mobile, 2 on md, 3 on lg.
          gap-8 = 2rem between cards — matches Stitch HTML.
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              // Each card: white bg, rounded-2xl, border, subtle shadow that deepens on hover.
              // hover:shadow-md with transition-shadow creates the lift effect on hover.
              className="bg-surface-container-lowest rounded-2xl p-8 border border-surface-variant 
                         shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Icon container — soft indigo circle with the Material Symbol inside */}
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-6 text-secondary">
                {/* 
                  Material Symbols icon — the font must be loaded in globals.css.
                  The icon name goes as text content inside the span.
                  No need for style attribute here — default (outline, not filled) looks right for features.
                */}
                <span className="material-symbols-outlined">{feature.icon}</span>
              </div>

              <h3 className="text-headline-md text-on-surface mb-3">{feature.title}</h3>
              <p className="text-body-md text-on-surface-variant">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}