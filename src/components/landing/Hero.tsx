import { Fragment } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Film, FileText, Layers, ListChecks, Sparkles } from 'lucide-react';

const workflowSteps = [
  { icon: FileText, title: 'Scripts'},
  { icon: Layers, title: 'Characters & Scenes'},
  { icon: ListChecks, title: 'Shots'},
  { icon: Film, title: 'Cinematics'},
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#f4f7ff]">
      {/* Ambient glow effects */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-[620px] w-[900px] -translate-x-1/2 rounded-full bg-[rgba(138,160,255,0.28)] blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-16 right-0 h-[420px] w-[420px] rounded-full bg-[rgba(180,157,255,0.24)] blur-[120px]" />

      <div className="container mx-auto px-4 pt-24 pb-10 md:pt-36 md:pb-12 relative z-10">
        <div className="mx-auto max-w-6xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#cfd8ff] bg-[#e8edff] px-4 py-1.5 text-sm">
            <Sparkles className="h-4 w-4 text-[#5b6eff]" />
            <span className="font-medium text-[#4660ff]">AI-Powered Storyboarding tool</span>
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-[#111c3d] md:text-6xl lg:text-7xl">
            Prompt. Animate. Captivate.
            <br />
            <span className="text-[#5368ff]">Visualising your idea in just minutes.</span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-[#76819d] md:text-xl">
            Kakis AI is one of the best AI story generators for turning your words into stunning videos, vivid visuals, and stories that move people. 
            Experience the magic of an automated text to animation tool with our free AI story generator. No camera. No crew. No fuss.
          </p>

          {/* CTAs */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row mb-16">
            <Button
              size="lg"
              className="h-12 bg-gradient-to-r from-[#6f7cff] to-[#8977ff] px-8 text-base text-white shadow-[0_10px_30px_rgba(99,102,241,0.25)] hover:from-[#6574ff] hover:to-[#7e6dff]"
              asChild
            >
              <a href="https://app.kakis.ai/" target="_blank" rel="noreferrer">
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
          <div className="mx-auto mb-16 w-full max-w-[1500px]">
            <div className="w-full pb-2">
              <div className="mx-auto grid w-full grid-cols-2 gap-3 md:flex md:items-center md:justify-center md:gap-3">
                {workflowSteps.map((step, index) => (
                  <Fragment key={step.title}>
                    <div className="group relative min-w-0 md:flex-1">
                      <div className="grid min-h-[132px] grid-rows-[56px_1fr] justify-items-center gap-3 rounded-2xl border border-[#dfe5f4] bg-white/82 px-3 py-5 backdrop-blur-sm transition-all hover:border-[#95a4ff] hover:bg-white md:min-h-[170px] md:grid-rows-[64px_1fr] md:gap-4 md:px-5 md:py-7">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#e8edff] transition-colors group-hover:bg-[#dfe6ff] md:h-16 md:w-16">
                          <step.icon className="h-7 w-7 text-[#5368ff] md:h-8 md:w-8" />
                        </div>
                        <span className="mt-1 flex min-h-[2.8rem] items-start justify-center text-center text-base font-semibold leading-tight text-[#182241] sm:text-lg md:min-h-[4rem] md:text-2xl">{step.title}</span>
                      </div>
                    </div>
                    {index < workflowSteps.length - 1 && (
                      <div className="hidden shrink-0 items-center justify-center text-[#5368ff] md:flex" aria-hidden="true">
                        <ArrowRight className="h-5 w-5 md:h-6 md:w-6" />
                      </div>
                    )}
                  </Fragment>
                ))}
              </div>
            </div>
            <p className="mt-6 mb-5 text-center text-base font-medium text-[#6f7895] md:mb-6 md:text-lg">
              Watch our videos below!
            </p>
            <div className="mb-10 flex justify-center md:mb-12">
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-[#cfd8ff] bg-gradient-to-b from-[#eef2ff] to-[#dde4ff] text-[#5368ff] shadow-[0_12px_24px_rgba(83,104,255,0.2)] animate-bounce">
                <svg viewBox="0 0 24 24" className="h-11 w-11 fill-[#5368ff]" aria-hidden="true">
                  <path d="M10 4a2 2 0 1 1 4 0v8h3.2c1.8 0 2.7 2.2 1.3 3.5l-5.2 5a2 2 0 0 1-2.8 0l-5.2-5C3.9 14.2 4.8 12 6.6 12H10V4Z" />
                </svg>
              </div>
            </div>
            <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
              <div className="overflow-hidden rounded-2xl border border-[#dfe5f4] shadow-[0_10px_24px_rgba(83,104,255,0.14)]">
                <div className="flex items-center gap-2 bg-[#e8edff] px-4 py-2.5">
                  <Film className="h-4 w-4 text-[#5368ff]" />
                  <span className="text-sm font-semibold text-[#3a4a7a]">Video tutorial</span>
                </div>
                <div className="aspect-video">
                  <iframe
                    src="https://www.youtube.com/embed/6RTP4qJyc-U"
                    title="Kakis AI video tutorial"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl border border-[#dfe5f4] shadow-[0_10px_24px_rgba(83,104,255,0.14)]">
                <div className="flex items-center gap-2 bg-[#e8edff] px-4 py-2.5">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#5368ff]" aria-hidden="true"><path d="M10 9.5 15.5 12 10 14.5V9.5ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                  <span className="text-sm font-semibold text-[#3a4a7a]">Sample video from our platform</span>
                </div>
                <div className="aspect-video">
                  <iframe
                    src="https://www.youtube.com/embed/NXaU5vx2igE"
                    title="Sample video from Kakis AI platform"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
