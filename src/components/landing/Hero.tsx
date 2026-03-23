import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

// Import storyboard thumbnails for the hover preview
import lunaThumb from '@/assets/thumbnails/luna-starkeeper-thumb.png';
import felixThumb from '@/assets/thumbnails/felix-fox-thumb.png';
import robotThumb from '@/assets/thumbnails/robot-garden-thumb.png';

const workflowSteps = [
  { number: 1, title: 'Scope', description: 'Capture business goals and convert them into concise AI-ready briefs.' },
  { number: 2, title: 'Generate', description: 'Create structured prompts, scripts, and visual directions with style control.' },
  { number: 3, title: 'Orchestrate', description: 'Connect APIs and model pipelines into one practical product flow.' },
  { number: 4, title: 'Ship', description: 'Deliver production-ready AI features tailored for local startup teams.' },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#f4f7ff]">
      {/* Ambient glow effects */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-[620px] w-[900px] -translate-x-1/2 rounded-full bg-[rgba(138,160,255,0.28)] blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-16 right-0 h-[420px] w-[420px] rounded-full bg-[rgba(180,157,255,0.24)] blur-[120px]" />

      <div className="container mx-auto px-4 py-24 md:py-36 relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#cfd8ff] bg-[#e8edff] px-4 py-1.5 text-sm">
            <Sparkles className="h-4 w-4 text-[#5b6eff]" />
            <span className="font-medium text-[#4660ff]">AI-Powered Production Pipeline</span>
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-[#111c3d] md:text-6xl lg:text-7xl">
            From Idea to Deployment,
            <br />
            <span className="text-[#5368ff]">Built with AI</span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-[#76819d] md:text-xl">
            Kakis turns prompts into production-ready workflows for startups in Singapore—faster scripting,
            clearer visuals, and practical AI solutions teams can ship.
          </p>

          {/* CTAs */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row mb-16">
            <Button
              size="lg"
              className="h-12 bg-gradient-to-r from-[#6f7cff] to-[#8977ff] px-8 text-base text-white shadow-[0_10px_30px_rgba(99,102,241,0.25)] hover:from-[#6574ff] hover:to-[#7e6dff]"
              asChild
            >
              <a href="https://app-staging.kakis.ai/" target="_blank" rel="noreferrer">
                Explore Kakis
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 border-[#d8dff5] bg-white/85 text-base text-[#4f5d85] hover:border-[#b7c4f4] hover:bg-white"
              asChild
            >
              <a href="https://www.fooyo.sg/" target="_blank" rel="noreferrer">
                Visit Fooyo
              </a>
            </Button>
          </div>

          {/* Workflow Pipeline */}
          <div className="mx-auto w-full max-w-[1500px] mb-16">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 md:gap-8">
              {workflowSteps.map((step) => (
                <div key={step.title} className="relative group">
                  <div className="flex min-h-[240px] flex-col items-center gap-5 rounded-2xl border border-[#dfe5f4] bg-white/82 backdrop-blur-sm px-10 py-7 md:px-12 md:py-8 transition-all hover:border-[#95a4ff] hover:bg-white">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ede8ff] text-3xl font-bold text-[#6f5cf7] transition-colors group-hover:bg-[#e5deff] md:h-20 md:w-20 md:text-4xl">
                      {step.number}
                    </div>
                    <span className="text-3xl font-semibold text-[#182241]">{step.title}</span>
                    <span className="text-center text-base leading-relaxed text-[#6f7895] md:text-[1.05rem]">{step.description}</span>
                  </div>
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
              <div key={item.label} className="relative overflow-hidden rounded-xl border border-[#dfe5f4] group cursor-pointer bg-white/70">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/78 via-[#0f172a]/18 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <p className="truncate text-xs font-medium text-white md:text-sm">{item.label}</p>
                  <div className="flex items-center gap-1 rounded-full bg-[#e8ecff]/90 px-2 py-0.5">
                    <Sparkles className="h-3 w-3 text-[#5368ff]" />
                    <span className="text-[10px] font-medium text-[#5368ff]">AI</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Social Proof */}
          <p className="mt-8 text-center text-sm text-[#6f7895]">
            Trusted by 10,000+ filmmakers, animators, and creative studios worldwide
          </p>
        </div>
      </div>
    </section>
  );
}
