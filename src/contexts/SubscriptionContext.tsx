import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type PlanType = 'free' | 'pro' | 'studio';

export interface Plan {
  id: PlanType;
  name: string;
  price: number;
  priceId: string; // Stripe price ID (mock)
  period: 'month' | 'year';
  features: string[];
  limits: {
    projects: number;
    aiGenerations: number;
    teamMembers: number;
  };
}

export interface Subscription {
  planId: PlanType;
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
}

interface SubscriptionContextType {
  subscription: Subscription | null;
  plans: Plan[];
  currentPlan: Plan;
  isLoading: boolean;
  subscribe: (planId: PlanType) => Promise<void>;
  cancelSubscription: () => Promise<void>;
  resumeSubscription: () => Promise<void>;
  changePlan: (planId: PlanType) => Promise<void>;
  canAccessFeature: (feature: string) => boolean;
  getRemainingGenerations: () => number;
}

export const plans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    priceId: 'price_free',
    period: 'month',
    features: [
      '3 projects',
      '50 AI generations/month',
      'Basic export options',
      'Community support',
    ],
    limits: {
      projects: 3,
      aiGenerations: 50,
      teamMembers: 1,
    },
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 29,
    priceId: 'price_pro_monthly',
    period: 'month',
    features: [
      'Unlimited projects',
      '500 AI generations/month',
      'All export formats',
      'Animatic creation',
      'Priority support',
      'Custom styles',
    ],
    limits: {
      projects: -1, // unlimited
      aiGenerations: 500,
      teamMembers: 1,
    },
  },
  {
    id: 'studio',
    name: 'Studio',
    price: 99,
    priceId: 'price_studio_monthly',
    period: 'month',
    features: [
      'Everything in Pro',
      'Unlimited AI generations',
      'Team collaboration',
      'Custom branding',
      'API access',
      'Dedicated support',
    ],
    limits: {
      projects: -1,
      aiGenerations: -1, // unlimited
      teamMembers: 10,
    },
  },
];

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [usedGenerations, setUsedGenerations] = useState(12); // Mock usage

  const currentPlan = subscription 
    ? plans.find(p => p.id === subscription.planId) || plans[0]
    : plans[0];

  const subscribe = useCallback(async (planId: PlanType) => {
    setIsLoading(true);
    // Mock Stripe checkout - simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubscription({
      planId,
      status: planId === 'free' ? 'active' : 'trialing',
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      cancelAtPeriodEnd: false,
    });
    setIsLoading(false);
  }, []);

  const cancelSubscription = useCallback(async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (subscription) {
      setSubscription({
        ...subscription,
        cancelAtPeriodEnd: true,
      });
    }
    setIsLoading(false);
  }, [subscription]);

  const resumeSubscription = useCallback(async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (subscription) {
      setSubscription({
        ...subscription,
        cancelAtPeriodEnd: false,
      });
    }
    setIsLoading(false);
  }, [subscription]);

  const changePlan = useCallback(async (planId: PlanType) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubscription(prev => prev ? {
      ...prev,
      planId,
      cancelAtPeriodEnd: false,
    } : {
      planId,
      status: 'active',
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      cancelAtPeriodEnd: false,
    });
    setIsLoading(false);
  }, []);

  const canAccessFeature = useCallback((feature: string) => {
    const planIndex = plans.findIndex(p => p.id === currentPlan.id);
    
    const featureRequirements: Record<string, number> = {
      'unlimited-projects': 1, // Pro+
      'all-exports': 1,
      'animatic': 1,
      'custom-styles': 1,
      'team': 2, // Studio only
      'api': 2,
      'branding': 2,
    };
    
    const requiredPlan = featureRequirements[feature] ?? 0;
    return planIndex >= requiredPlan;
  }, [currentPlan]);

  const getRemainingGenerations = useCallback(() => {
    if (currentPlan.limits.aiGenerations === -1) return -1;
    return Math.max(0, currentPlan.limits.aiGenerations - usedGenerations);
  }, [currentPlan, usedGenerations]);

  return (
    <SubscriptionContext.Provider
      value={{
        subscription,
        plans,
        currentPlan,
        isLoading,
        subscribe,
        cancelSubscription,
        resumeSubscription,
        changePlan,
        canAccessFeature,
        getRemainingGenerations,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}
