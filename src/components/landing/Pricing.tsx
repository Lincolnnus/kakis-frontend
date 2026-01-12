import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSubscription, plans } from '@/contexts/SubscriptionContext';
import { useAuth } from '@/contexts/AuthContext';

const planMeta = {
  free: { cta: 'Get Started', link: '/signup' },
  pro: { cta: 'Start Free Trial', link: '/checkout?plan=pro' },
  studio: { cta: 'Start Free Trial', link: '/checkout?plan=studio' },
};

export function Pricing() {
  const { currentPlan } = useSubscription();
  const { isAuthenticated } = useAuth();

  return (
    <section className="border-t bg-muted/30 py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="mr-1 h-3 w-3" />
            Pricing
          </Badge>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Start free and scale as you grow. No hidden fees.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          {plans.map((plan) => {
            const isCurrentPlan = plan.id === currentPlan.id;
            const isPro = plan.id === 'pro';
            const meta = planMeta[plan.id];
            
            return (
              <div
                key={plan.id}
                className={`relative rounded-xl border bg-card p-8 transition-all hover:shadow-lg ${
                  isPro
                    ? 'border-primary shadow-lg ring-1 ring-primary'
                    : ''
                }`}
              >
                {isPro && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                  <div className="mt-2 flex items-baseline">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="ml-1 text-muted-foreground">/{plan.period}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {plan.id === 'free' && 'Perfect for trying out the platform'}
                    {plan.id === 'pro' && 'For serious creators and filmmakers'}
                    {plan.id === 'studio' && 'For teams and production studios'}
                  </p>
                </div>

                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {isCurrentPlan && isAuthenticated ? (
                  <Button className="w-full" variant="outline" disabled>
                    Current Plan
                  </Button>
                ) : (
                  <Button
                    className={`w-full ${isPro ? 'gradient-primary' : ''}`}
                    variant={isPro ? 'default' : 'outline'}
                    asChild
                  >
                    <Link to={isAuthenticated ? meta.link : '/signup'}>
                      {meta.cta}
                    </Link>
                  </Button>
                )}
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          All paid plans include a 7-day free trial. Cancel anytime.
        </p>
      </div>
    </section>
  );
}
