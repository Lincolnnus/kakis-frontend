import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import heroShowcasePoster from '@/assets/landing/hero-showcase-poster.jpg';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#f4f7ff]">
      {/* Ambient glow effects */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-[620px] w-[900px] -translate-x-1/2 rounded-full bg-[rgba(138,160,255,0.28)] blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-16 right-0 h-[420px] w-[420px] rounded-full bg-[rgba(180,157,255,0.24)] blur-[120px]" />

      <div className="container mx-auto px-4 pt-24 pb-16 md:pt-36 md:pb-24 relative z-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-10 text-center lg:grid-cols-[1.05fr_0.95fr] lg:text-left">
            <div>
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#cfd8ff] bg-[#e8edff] px-4 py-1.5 text-sm">
                <Sparkles className="h-4 w-4 text-[#5b6eff]" />
                <span className="font-medium text-[#4660ff]">AI Story-to-Video Agent</span>
              </div>

              {/* Headline */}
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-[#111c3d] md:text-6xl lg:text-7xl">
                Prompt. Animate. Captivate.
                <br />
                <span className="text-[#5368ff]">Visualising your idea in just minutes.</span>
              </h1>

              {/* Subheadline */}
              <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-[#76819d] md:text-xl lg:mx-0">
                Kakis AI is your story-to-video agent — it turns one idea into a script, scenes, shots, characters,
                voice and music, and a fully produced story video. No camera. No crew. No fuss.
              </p>

              {/* CTAs */}
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                <Button
                  size="lg"
                  className="h-12 bg-gradient-to-r from-[#6f7cff] to-[#8977ff] px-8 text-base text-white shadow-[0_10px_30px_rgba(99,102,241,0.25)] hover:from-[#6574ff] hover:to-[#7e6dff]"
                  asChild
                >
                  <a href="https://app.kakis.ai/" target="_blank" rel="noreferrer">
                    Start Creating
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

              <p className="mt-4 text-sm text-[#8892b3]">
                Kakis AI is built by{' '}
                <a
                  href="https://www.fooyo.sg/"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-[#5368ff] hover:underline"
                >
                  Fooyo
                </a>
                , a Singapore-based digital transformation studio.
              </p>
            </div>

            <div className="mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none">
              <img
                src={heroShowcasePoster}
                alt="Kakis AI turns your story into video — shown across 3D cartoon, watercolor, cinematic, and other art styles"
                className="w-full rounded-3xl border border-[#dfe5f4] shadow-[0_24px_60px_-24px_rgba(83,104,255,0.45)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
