import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Sparkles, FileText, Layers, ListChecks, Film } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import storyboard thumbnails for the hover preview
import lunaThumb from '@/assets/thumbnails/luna-starkeeper-thumb.png';
import felixThumb from '@/assets/thumbnails/felix-fox-thumb.png';
import robotThumb from '@/assets/thumbnails/robot-garden-thumb.png';

const workflowSteps = [
  { icon: FileText, label: 'Scripts', description: 'Upload & parse' },
  { icon: Layers, label: 'Frames', description: 'AI storyboards' },
  { icon: ListChecks, label: 'Shots', description: 'Shot lists' },
  { icon: Film, label: 'Cinematics', description: 'Animatics & video' },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Ambient glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 py-24 md:py-36 relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-primary font-medium">AI-Powered Production Pipeline</span>
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl text-foreground">
            From Script to Screen,{' '}
            <span className="text-gradient">Powered by AI</span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl leading-relaxed">
            The complete AI workflow that transforms your stories into production-ready visuals. 
            Scripts → Frames → Shots → Cinematics — in minutes, not weeks.
          </p>

          {/* CTAs */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row mb-16">
            <Button size="lg" className="gradient-primary text-primary-foreground px-8 h-12 text-base" asChild>
              <Link to="/signup">
                Start Creating Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="gap-2 h-12 text-base border-border/50 hover:border-primary/50">
              <Play className="h-4 w-4" />
              Watch Demo
            </Button>
          </div>

          {/* Workflow Pipeline */}
          <div className="mx-auto max-w-3xl mb-16">
            <div className="grid grid-cols-4 gap-3 md:gap-6">
              {workflowSteps.map((step, i) => (
                <div key={step.label} className="relative group">
                  <div className="flex flex-col items-center gap-2 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-4 md:p-6 transition-all hover:border-primary/50 hover:bg-primary/5">
                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <step.icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                    </div>
                    <span className="font-semibold text-sm md:text-base text-foreground">{step.label}</span>
                    <span className="text-xs text-muted-foreground hidden md:block">{step.description}</span>
                  </div>
                  {/* Arrow connector */}
                  {i < workflowSteps.length - 1 && (
                    <div className="absolute top-1/2 -right-2 md:-right-4 -translate-y-1/2 z-10">
                      <ArrowRight className="h-4 w-4 text-primary/40" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Showcase Grid */}
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {[
              { src: lunaThumb, alt: 'Luna & the Starkeeper', label: 'Luna & the Starkeeper' },
              { src: felixThumb, alt: 'Felix the Fox', label: 'Felix the Fox' },
              { src: robotThumb, alt: "Robot's Garden", label: "Robot's Garden" },
            ].map((item) => (
              <div key={item.label} className="relative rounded-xl overflow-hidden border border-border/50 group cursor-pointer">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <p className="text-foreground text-xs md:text-sm font-medium truncate">{item.label}</p>
                  <div className="flex items-center gap-1 bg-primary/20 rounded-full px-2 py-0.5">
                    <Sparkles className="h-3 w-3 text-primary" />
                    <span className="text-[10px] text-primary font-medium">AI</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Social Proof */}
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Trusted by 10,000+ filmmakers, animators, and creative studios worldwide
          </p>
        </div>
      </div>
    </section>
  );
}
