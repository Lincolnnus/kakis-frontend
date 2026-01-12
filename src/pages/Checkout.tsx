import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useSubscription, plans, PlanType } from '@/contexts/SubscriptionContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Check, CreditCard, Lock, ArrowLeft, Loader2, Shield } from 'lucide-react';

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { subscribe, isLoading } = useSubscription();
  const { isAuthenticated } = useAuth();
  
  const planId = (searchParams.get('plan') || 'pro') as PlanType;
  const selectedPlan = plans.find(p => p.id === planId) || plans[1];
  
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/checkout?plan=' + planId);
    }
  }, [isAuthenticated, navigate, planId]);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await subscribe(planId);
      toast({
        title: 'Subscription activated!',
        description: `Welcome to ${selectedPlan.name}. Your trial starts now.`,
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Payment failed',
        description: 'Please check your card details and try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <Link 
          to="/#pricing"
          className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to pricing
        </Link>

        <div className="grid gap-8 md:grid-cols-5">
          {/* Payment Form */}
          <div className="md:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Details
                </CardTitle>
                <CardDescription>
                  Enter your card information to start your subscription
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Cardholder Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="number">Card Number</Label>
                    <Input
                      id="number"
                      placeholder="4242 4242 4242 4242"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({ 
                        ...cardDetails, 
                        number: formatCardNumber(e.target.value) 
                      })}
                      maxLength={19}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({ 
                          ...cardDetails, 
                          expiry: formatExpiry(e.target.value) 
                        })}
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input
                        id="cvc"
                        placeholder="123"
                        value={cardDetails.cvc}
                        onChange={(e) => setCardDetails({ 
                          ...cardDetails, 
                          cvc: e.target.value.replace(/\D/g, '').slice(0, 4) 
                        })}
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>

                  <Separator />

                  <Button 
                    type="submit" 
                    className="w-full gradient-primary"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="mr-2 h-4 w-4" />
                        Start {selectedPlan.name} Plan — ${selectedPlan.price}/mo
                      </>
                    )}
                  </Button>

                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Shield className="h-3 w-3" />
                    Secured by Stripe. Cancel anytime.
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border bg-muted/50 p-4">
                  <div className="flex items-baseline justify-between">
                    <span className="font-semibold">{selectedPlan.name} Plan</span>
                    <span className="text-2xl font-bold">${selectedPlan.price}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">per month</span>
                </div>

                <Separator />

                <ul className="space-y-2">
                  {selectedPlan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${selectedPlan.price}.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>$0.00</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total today</span>
                    <span>${selectedPlan.price}.00</span>
                  </div>
                </div>

                {selectedPlan.id !== 'free' && (
                  <div className="rounded-lg bg-primary/10 p-3 text-center text-sm">
                    <span className="font-medium text-primary">7-day free trial</span>
                    <p className="text-xs text-muted-foreground mt-1">
                      You won't be charged until trial ends
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
