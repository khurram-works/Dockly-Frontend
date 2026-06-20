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
    <section id="features" className="bg-surface-container-low py-24 px-gutter">
      <div className="max-w-container-max mx-auto">

        <div className="text-center mb-16">
          <h2 className="text-headline-xl-mobile md:text-headline-xl text-on-surface">
            Everything you need to automate support
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-surface-container-lowest rounded-2xl p-8 border border-surface-variant 
                         shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-6 text-secondary">
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