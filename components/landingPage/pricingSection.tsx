import { Button } from '@/components/ui/button';


interface PricingTier {
  name: string;
  price: string;
  features: string[];
  isPopular?: boolean;  
}

const tiers: PricingTier[] = [
  {
    name: 'Starter',
    price: '$29',
    features: ['5 documents', '500 questions', '1 chatbot'],
  },
  {
    name: 'Pro',
    price: '$79',
    features: ['50 documents', '5000 questions', '3 chatbots', 'Analytics'],
    isPopular: true,
  },
  {
    name: 'Enterprise',
    price: '$199',
    features: [
      'Unlimited documents',
      'Unlimited questions',
      'Custom chatbots',
      'Priority support',
    ],
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-surface-container-low py-24 px-gutter">
      <div className="max-w-container-max mx-auto">

        <div className="text-center mb-16">
          <h2 className="text-headline-xl-mobile md:text-headline-xl text-on-surface">
            Simple, transparent pricing
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`
                bg-surface-container-lowest rounded-2xl p-8 shadow-sm relative
                ${tier.isPopular
                  ? 'border-2 border-secondary shadow-xl scale-105 z-10'
                  : 'border border-surface-variant'
                }
              `}
            >
              {tier.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 
                                bg-secondary text-white text-label-sm px-4 py-1 
                                rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              <h3 className="text-headline-md text-on-surface mb-2">{tier.name}</h3>
              <div className="mb-6">
                <span className="text-display-lg-mobile text-on-surface">{tier.price}</span>
                <span className="text-body-md text-on-surface-variant">/mo</span>
              </div>
              <ul className="space-y-4 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-body-md text-on-surface-variant">
                    <span className="material-symbols-outlined text-secondary text-[20px]">check</span>
                    {feature}
                  </li>
                ))}
              </ul>
              {tier.isPopular ? (
                <Button className="w-full">Get Started</Button>
              ) : (
                <Button variant="outline" className="w-full text-secondary">
                  Get Started
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}