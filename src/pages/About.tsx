import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { cn } from '@/lib/utils';
import {
  ArrowLeft,
  ArrowRight,
  Clapperboard,
  Globe2,
  Handshake,
  Heart,
  PenTool,
  Sparkles,
  Wand2,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

type StoryChapter = {
  scene: string;
  title: string;
  description: string;
  takeaway: string;
  icon: LucideIcon;
};

const storyChapters: StoryChapter[] = [
  {
    scene: '01',
    title: 'A cinema seat, a big feeling',
    description:
      "Over 15 years ago, Shao sat in dark theatres watching Pixar, DreamWorks, and Disney. The part that stayed wasn't just visual quality, it was emotional impact.",
    takeaway: 'Great animation starts with emotion.',
    icon: Clapperboard,
  },
  {
    scene: '02',
    title: 'One question that never left',
    description:
      'How do you bottle human emotion into a frame? That question became a long-running creative obsession and eventually a roadmap.',
    takeaway: 'Story is always the hardest part.',
    icon: Sparkles,
  },
  {
    scene: '03',
    title: 'AI reached a turning point',
    description:
      'Early outputs were rough, but the cost and speed of creation changed dramatically. The quality curve kept rising, and the barrier to create began collapsing.',
    takeaway: 'The trajectory became impossible to ignore.',
    icon: Wand2,
  },
  {
    scene: '04',
    title: 'Kakis AI enters the frame',
    description:
      'Kakis AI was built so storytellers can focus on meaning while AI handles heavy production brushwork. Studio-level workflows should not be studio-only privileges.',
    takeaway: 'Anyone with a story should be able to tell it.',
    icon: Globe2,
  },
];

const beliefs = [
  {
    number: '01',
    text: 'Human creativity leads. AI handles the brushwork.',
    icon: PenTool,
  },
  {
    number: '02',
    text: "The hardest part of animation is never the drawing - it's the story.",
    icon: Sparkles,
  },
  {
    number: '03',
    text: 'Emotion is the point. Technology is the path.',
    icon: Heart,
  },
  {
    number: '04',
    text: 'Great animation is a universal language - it makes strangers into friends.',
    icon: Globe2,
  },
];

export default function About() {
  const heroReveal = useScrollReveal<HTMLElement>({ threshold: 0.08, rootMargin: '0px 0px -8% 0px' });
  const chaptersReveal = useScrollReveal<HTMLElement>({ threshold: 0.14 });
  const beliefsReveal = useScrollReveal<HTMLElement>({ threshold: 0.14 });
  const missionReveal = useScrollReveal<HTMLElement>({ threshold: 0.14 });

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f4f7ff]">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(180deg,rgba(244,247,255,0.54)_0%,rgba(244,247,255,0.68)_55%,rgba(244,247,255,0.78)_100%)]" />
      <div className="pointer-events-none fixed -top-20 left-1/2 z-0 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-[rgba(138,160,255,0.26)] blur-[130px]" />
      <div className="pointer-events-none fixed bottom-0 right-0 z-0 h-[360px] w-[360px] rounded-full bg-[rgba(180,157,255,0.2)] blur-[120px]" />

      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <section
            ref={heroReveal.targetRef}
            className={cn(
              'relative overflow-hidden border-b border-[#dfe5f4] py-14 transition-all duration-700 ease-out md:py-20',
              heroReveal.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
            )}
          >
            <div className="container relative z-10 mx-auto px-4">
              <Link
                to="/"
                className="inline-flex items-center rounded-full border border-[#d5def8] bg-white/90 px-4 py-2 text-sm font-semibold text-[#4f5d85] transition-colors hover:border-[#bfcef8] hover:bg-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>

              <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#5a6eff]">About Kakis AI</p>
                  <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-[#182241] md:text-6xl">
                    Every great animation starts with a feeling.
                  </h1>
                  <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#4f5d85] md:text-xl">
                    Kakis is a Singaporean slang term for 'close friends who build things together'. We took that spirit into
                    storytelling. Kakis AI exists to help creators move from spark to screen with the same emotional
                    depth audiences remember.
                  </p>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#6f7895] md:text-lg">
                    Our belief is simple: AI should remove production friction, not replace imagination. The human
                    story comes first, always.
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Button
                      size="lg"
                      className="h-12 bg-gradient-to-r from-[#6f7cff] to-[#8977ff] px-7 text-white hover:from-[#6574ff] hover:to-[#7e6dff]"
                      asChild
                    >
                      <a href="https://app-staging.kakis.ai/" target="_blank" rel="noreferrer">
                        Start Creating
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-12 border-[#d2dbf2] bg-white/90 text-[#4f5d85] hover:border-[#acbcf5] hover:bg-white"
                      asChild
                    >
                      <a href="https://www.fooyo.sg/" target="_blank" rel="noreferrer">
                        Meet The Team
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="rounded-3xl border border-[#dce3fa] bg-white/92 p-6 shadow-[0_16px_42px_rgba(24,34,65,0.08)] backdrop-blur-sm md:p-8">
                  <div className="mb-5 flex items-center justify-between">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#5b6eff]">Story Arc</p>
                    <span className="rounded-full border border-[#d7e1ff] bg-[#edf2ff] px-3 py-1 text-xs font-semibold text-[#5165ff]">
                      emotion first
                    </span>
                  </div>
                  <div className="space-y-4">
                    {storyChapters.slice(0, 3).map((chapter, index) => (
                      <div
                        key={chapter.scene}
                        className="rounded-2xl border border-[#e1e8fd] bg-[#f8faff] p-4 transition-colors hover:border-[#c8d6ff] hover:bg-white"
                        style={{ transitionDelay: `${index * 70}ms` }}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#e8edff] text-[#5368ff]">
                            <chapter.icon className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6f7db6]">{chapter.scene}</p>
                            <h3 className="mt-1 text-base font-semibold text-[#1f2a4d]">{chapter.title}</h3>
                            <p className="mt-1 text-sm leading-relaxed text-[#5a678f]">{chapter.takeaway}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 rounded-xl border border-[#dce6ff] bg-gradient-to-r from-[#eef2ff] to-[#f8faff] p-4 text-sm leading-relaxed text-[#42517d]">
                    The question that shaped Kakis AI: how do you turn a human feeling into a scene people remember?
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            ref={chaptersReveal.targetRef}
            className={cn(
              'py-16 transition-all duration-700 ease-out md:py-20',
              chaptersReveal.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
            )}
          >
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-3xl text-center">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#5a6eff]">Our Journey</p>
                <h2 className="text-3xl font-bold text-[#182241] md:text-4xl">A storyteller's timeline</h2>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#6f7895] md:text-lg">
                  We did not start by asking what AI can generate. We started by asking what stories deserve to be
                  told, and how to make that process more human.
                </p>
              </div>

              <div className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-2">
                {storyChapters.map((chapter, index) => (
                  <article
                    key={chapter.scene}
                    className={cn(
                      'rounded-2xl border border-[#dfe5f4] bg-white/92 p-6 shadow-[0_8px_24px_rgba(24,34,65,0.06)] transition-all duration-700',
                      chaptersReveal.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
                    )}
                    style={{ transitionDelay: `${index * 90}ms` }}
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6a78aa]">{chapter.scene}</span>
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e8edff] text-[#5368ff]">
                        <chapter.icon className="h-4 w-4" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-[#1f2a4d]">{chapter.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#5a678f] md:text-base">{chapter.description}</p>
                    <p className="mt-4 rounded-lg bg-[#f5f8ff] px-3 py-2 text-sm font-medium text-[#3f4f7e]">{chapter.takeaway}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section
            ref={beliefsReveal.targetRef}
            className={cn(
              'relative overflow-hidden py-16 transition-all duration-700 ease-out md:py-20',
              beliefsReveal.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
            )}
          >
            <div className="absolute inset-0 bg-[#182241]" />
            <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-[rgba(130,151,255,0.28)] blur-[80px]" />
            <div className="pointer-events-none absolute -right-12 bottom-0 h-64 w-64 rounded-full bg-[rgba(145,126,255,0.2)] blur-[90px]" />

            <div className="container relative z-10 mx-auto px-4">
              <div className="mx-auto max-w-5xl">
                <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-[#a9b5ea]">Our North Star</p>
                <h2 className="mt-3 text-center text-3xl font-bold text-white md:text-4xl">What We Believe About Storytelling</h2>
                <div className="mt-10 grid gap-4 md:grid-cols-2">
                  {beliefs.map((belief, index) => (
                    <div
                      key={belief.number}
                      className={cn(
                        'rounded-2xl border border-[rgba(183,197,255,0.2)] bg-[rgba(17,24,46,0.68)] p-6 backdrop-blur-sm transition-all duration-700',
                        beliefsReveal.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
                      )}
                      style={{ transitionDelay: `${index * 80}ms` }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a9b5ea]">{belief.number}</span>
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[rgba(83,104,255,0.18)] text-[#bcc8ff]">
                          <belief.icon className="h-4 w-4" />
                        </div>
                      </div>
                      <p className="mt-4 text-lg leading-relaxed text-[#f3f6ff]">{belief.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section
            ref={missionReveal.targetRef}
            className={cn(
              'py-16 transition-all duration-700 ease-out md:py-20',
              missionReveal.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
            )}
          >
            <div className="container mx-auto px-4">
              <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="rounded-3xl border border-[#dfe5f4] bg-white/90 p-8 shadow-[0_12px_28px_rgba(24,34,65,0.08)] backdrop-blur-sm md:p-10">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#5a6eff]">Our Mission</p>
                  <h2 className="mt-3 text-3xl font-bold text-[#182241] md:text-4xl">Help storytellers move people, not just pixels.</h2>
                  <p className="mt-5 text-base leading-relaxed text-[#4f5d85] md:text-lg">
                    We are building a creative community where anyone can tell cinematic stories with AI as a partner,
                    not a replacement. Human imagination drives the direction. Kakis AI helps with the production lift.
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-[#6f7895] md:text-lg">
                    When artists, founders, educators, and dreamers work side by side as kakis, storytelling becomes
                    more inclusive, more global, and more human.
                  </p>
                </div>

                <div className="rounded-3xl border border-[#d7e1ff] bg-gradient-to-br from-[#ebf1ff] to-[#f8faff] p-8 text-center shadow-[0_12px_26px_rgba(83,104,255,0.15)] md:p-10">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#5368ff] shadow-sm">
                    <Handshake className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#182241] md:text-3xl">Work With Us</h3>
                  <p className="mx-auto mt-4 max-w-sm text-base leading-relaxed text-[#4f5d85]">
                    We are open to collaborators, investors, educators, and creators who believe storytelling should
                    belong to everyone.
                  </p>
                  <Button
                    className="mt-7 bg-gradient-to-r from-[#6f7cff] to-[#8977ff] text-white hover:from-[#6574ff] hover:to-[#7e6dff]"
                    asChild
                  >
                    <a href="https://www.fooyo.sg/contact/" target="_blank" rel="noopener noreferrer">
                      Contact Us
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
