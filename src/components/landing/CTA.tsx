import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CTA() {
  return (
    <section className="border-t gradient-hero py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Ready to Transform Your Storytelling?
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Join thousands of creators who are bringing their visions to life. 
            Start your free account today—no credit card required.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="gradient-primary text-primary-foreground" asChild>
              <Link to="/signup">
                Start Creating Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
