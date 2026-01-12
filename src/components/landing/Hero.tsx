import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section className="relative overflow-hidden gradient-hero">
      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-1.5 text-sm backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">AI-Powered Storyboarding</span>
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Bring Your Stories to{' '}
            <span className="text-gradient">Visual Life</span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Transform scripts into stunning storyboards in minutes. Generate AI visuals, 
            build shot lists, and create animatics—all in one powerful platform.
          </p>

          {/* CTAs */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="gradient-primary text-primary-foreground" asChild>
              <Link to="/signup">
                Start Creating Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              <Play className="h-4 w-4" />
              Watch Demo
            </Button>
          </div>

          {/* Social Proof */}
          <p className="mt-8 text-sm text-muted-foreground">
            Trusted by 10,000+ filmmakers, animators, and creative studios
          </p>
        </div>

        {/* Hero Image Placeholder */}
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="relative rounded-xl border bg-card shadow-2xl">
            <div className="aspect-video w-full overflow-hidden rounded-xl bg-muted">
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Play className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-muted-foreground">Product Demo Preview</p>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
