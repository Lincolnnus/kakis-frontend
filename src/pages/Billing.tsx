import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useSubscription, plans, PlanType } from '@/contexts/SubscriptionContext';
import { useToast } from '@/hooks/use-toast';
import { 
  CreditCard, 
  Check, 
  ArrowLeft, 
  Loader2,
  Zap,
  Calendar,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { format } from 'date-fns';

export default function Billing() {
  const { toast } = useToast();
  const { 
    subscription, 
    currentPlan, 
    isLoading,
    cancelSubscription,
    resumeSubscription,
    changePlan,
    getRemainingGenerations
  } = useSubscription();
  
  const [selectedUpgrade, setSelectedUpgrade] = useState<PlanType | null>(null);

  const handleCancelSubscription = async () => {
    await cancelSubscription();
    toast({
      title: 'Subscription canceled',
      description: 'Your subscription will end at the current billing period.',
    });
  };

  const handleResumeSubscription = async () => {
    await resumeSubscription();
    toast({
      title: 'Subscription resumed',
      description: 'Your subscription will continue as normal.',
    });
  };

  const handleChangePlan = async (planId: PlanType) => {
    await changePlan(planId);
    setSelectedUpgrade(null);
    toast({
      title: 'Plan updated',
      description: `You're now on the ${plans.find(p => p.id === planId)?.name} plan.`,
    });
  };

  const remainingGenerations = getRemainingGenerations();
  const usagePercentage = currentPlan.limits.aiGenerations === -1 
    ? 0 
    : ((currentPlan.limits.aiGenerations - remainingGenerations) / currentPlan.limits.aiGenerations) * 100;

  const invoices = [
    { id: 'inv_001', date: new Date('2026-01-01'), amount: 29, status: 'paid' },
    { id: 'inv_002', date: new Date('2025-12-01'), amount: 29, status: 'paid' },
    { id: 'inv_003', date: new Date('2025-11-01'), amount: 29, status: 'paid' },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <Link 
          to="/dashboard"
          className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>

        <h1 className="mb-8 text-3xl font-bold">Billing & Subscription</h1>

        <div className="space-y-8">
          {/* Current Plan */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Current Plan
                  </CardTitle>
                  <CardDescription>Manage your subscription and billing</CardDescription>
                </div>
                <Badge 
                  variant={subscription?.status === 'active' ? 'default' : 'secondary'}
                  className="capitalize"
                >
                  {subscription?.status || 'Free'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between rounded-lg border bg-muted/50 p-4">
                <div>
                  <h3 className="text-xl font-bold">{currentPlan.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    ${currentPlan.price}/{currentPlan.period}
                  </p>
                </div>
                {subscription?.cancelAtPeriodEnd && (
                  <Badge variant="destructive" className="flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    Cancels {subscription.currentPeriodEnd && format(subscription.currentPeriodEnd, 'MMM d')}
                  </Badge>
                )}
              </div>

              {subscription?.currentPeriodEnd && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Next billing date: {format(subscription.currentPeriodEnd, 'MMMM d, yyyy')}
                </div>
              )}

              <div className="flex gap-3">
                {subscription?.cancelAtPeriodEnd ? (
                  <Button onClick={handleResumeSubscription} disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Resume Subscription
                  </Button>
                ) : currentPlan.id !== 'free' ? (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline">Cancel Subscription</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Cancel subscription?</AlertDialogTitle>
                        <AlertDialogDescription>
                          You'll lose access to {currentPlan.name} features at the end of your billing period.
                          You can resume anytime before then.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
                        <AlertDialogAction onClick={handleCancelSubscription}>
                          Cancel Subscription
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                ) : null}
              </div>
            </CardContent>
          </Card>

          {/* Usage */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Usage This Month
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span>AI Generations</span>
                  <span className="text-muted-foreground">
                    {remainingGenerations === -1 ? (
                      'Unlimited'
                    ) : (
                      `${currentPlan.limits.aiGenerations - remainingGenerations} / ${currentPlan.limits.aiGenerations}`
                    )}
                  </span>
                </div>
                <Progress value={usagePercentage} className="h-2" />
              </div>

              {remainingGenerations !== -1 && remainingGenerations < 10 && (
                <div className="rounded-lg bg-amber-500/10 p-3 text-sm text-amber-600 dark:text-amber-400">
                  <AlertTriangle className="mr-2 inline h-4 w-4" />
                  Running low on AI generations. Upgrade for more.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upgrade Options */}
          <Card>
            <CardHeader>
              <CardTitle>Available Plans</CardTitle>
              <CardDescription>Upgrade or change your plan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`relative rounded-lg border p-4 ${
                      plan.id === currentPlan.id 
                        ? 'border-primary bg-primary/5' 
                        : 'hover:border-primary/50'
                    }`}
                  >
                    {plan.id === currentPlan.id && (
                      <Badge className="absolute -top-2 right-2">Current</Badge>
                    )}
                    <h4 className="font-semibold">{plan.name}</h4>
                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="text-2xl font-bold">${plan.price}</span>
                      <span className="text-sm text-muted-foreground">/mo</span>
                    </div>
                    <ul className="mt-3 space-y-1">
                      {plan.features.slice(0, 3).map((f) => (
                        <li key={f} className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Check className="h-3 w-3 text-primary" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    {plan.id !== currentPlan.id && (
                      <Button 
                        size="sm" 
                        className="mt-4 w-full"
                        variant={plan.price > currentPlan.price ? 'default' : 'outline'}
                        onClick={() => plan.id === 'free' 
                          ? handleChangePlan(plan.id)
                          : setSelectedUpgrade(plan.id)
                        }
                        disabled={isLoading}
                      >
                        {plan.price > currentPlan.price ? 'Upgrade' : 'Downgrade'}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentPlan.id === 'free' ? (
                <p className="text-sm text-muted-foreground">
                  No payment method on file. Add one when you upgrade.
                </p>
              ) : (
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-14 items-center justify-center rounded bg-muted">
                      <span className="text-xs font-bold">VISA</span>
                    </div>
                    <div>
                      <p className="font-medium">•••• •••• •••• 4242</p>
                      <p className="text-sm text-muted-foreground">Expires 12/28</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Update</Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Invoices */}
          {currentPlan.id !== 'free' && (
            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {invoices.map((invoice) => (
                    <div 
                      key={invoice.id}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div>
                        <p className="font-medium">{format(invoice.date, 'MMMM yyyy')}</p>
                        <p className="text-sm text-muted-foreground">${invoice.amount}.00</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="capitalize">
                          {invoice.status}
                        </Badge>
                        <Button variant="ghost" size="sm">Download</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Upgrade Dialog */}
        <AlertDialog open={!!selectedUpgrade} onOpenChange={() => setSelectedUpgrade(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Upgrade to {plans.find(p => p.id === selectedUpgrade)?.name}?
              </AlertDialogTitle>
              <AlertDialogDescription>
                You'll be charged ${plans.find(p => p.id === selectedUpgrade)?.price}/month.
                Your new features will be available immediately.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={() => selectedUpgrade && handleChangePlan(selectedUpgrade)}
                className="gradient-primary"
              >
                Upgrade Now
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  );
}
