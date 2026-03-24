import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

const APP_STAGING_URL = 'https://app-staging.kakis.ai/';

export function CTA() {
  const { targetRef, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={targetRef}
      className={cn(
        'relative overflow-hidden border-t border-[#dfe5f4] bg-[#f4f7ff] py-24 transition-all duration-700 ease-out',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0',
      )}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[420px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(138,160,255,0.22)] blur-[120px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-[#182241] md:text-4xl">
            Stop Storyboarding the Hard Way
          </h2>
          <p className="mb-8 text-lg text-[#6f7895]">
            Join thousands of creators using AI to go from script to cinematic in minutes. 
            Start free — no credit card required.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="h-12 bg-gradient-to-r from-[#6f7cff] to-[#8977ff] px-8 text-base text-white hover:from-[#6574ff] hover:to-[#7e6dff]" asChild>
              <a href={APP_STAGING_URL} target="_blank" rel="noreferrer">
                Start Creating Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="border-[#d2dbf2] bg-white/90 text-[#4f5d85] hover:border-[#aebcff] hover:bg-white" asChild>
              <a href={APP_STAGING_URL} target="_blank" rel="noreferrer">Sign In</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
