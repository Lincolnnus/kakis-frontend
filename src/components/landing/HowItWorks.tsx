import {
  ArrowRight,
  Camera,
  Clapperboard,
  FileText,
  Heart,
  MessageCircle,
  Music,
  Tag,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import stepStoryIdea from '@/assets/landing/step-story-idea.jpg';
import stepKakisAgent from '@/assets/landing/step-kakis-agent.jpg';
import stepFinishedVideo from '@/assets/landing/step-finished-video.jpg';
import howItWorksStrip from '@/assets/landing/how-it-works-strip.jpg';

const ideaChips = [
  { label: 'Memory', icon: Heart },
  { label: 'Message', icon: MessageCircle },
  { label: 'Brand', icon: Tag },
];

const agentElements = [
  { label: 'Script', icon: FileText },
  { label: 'Scenes', icon: Clapperboard },
  { label: 'Shots', icon: Camera },
  { label: 'Characters', icon: User },
  { label: 'Voice & Music', icon: Music },
];

function StepBadge({ number, dark }: { number: number; dark?: boolean }) {
  return (
    <span
      className={cn(
        'absolute left-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full text-base font-bold shadow-sm',
        dark ? 'bg-white/90 text-[#4636c9]' : 'bg-[#6f7cff] text-white',
      )}
    >
      {number}
    </span>
  );
}

export function HowItWorks() {
  const { targetRef, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section
      id="how-it-works"
      ref={targetRef}
      className={cn(
        'border-t border-[#dfe5f4] bg-[#f4f7ff] py-24 transition-all duration-700 ease-out',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0',
      )}
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#5a6eff]">How It Works</p>
          <h2 className="mb-4 text-3xl font-bold text-[#182241] md:text-4xl">How Kakis AI Works</h2>
          <p className="text-lg text-[#6f7895]">
            A clip isn't a story. Kakis is the AI agent layer that thinks, plans, and creates — from one idea to a
            finished story video, in three steps.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl items-stretch gap-6 lg:grid-cols-[1fr_auto_1.15fr_auto_1fr]">
          {/* Step 1 — Your Story Idea */}
          <div className="relative overflow-hidden rounded-3xl border border-[#dfe5f4] bg-white/90 shadow-[0_16px_40px_-24px_rgba(83,104,255,0.35)]">
            <StepBadge number={1} />
            <div className="grid h-full grid-cols-[auto_1fr] items-end gap-4 p-6 pt-16">
              <img
                src={stepStoryIdea}
                alt="A storyteller writing down her idea in a notebook"
                className="w-24 self-end rounded-xl md:w-28"
              />
              <div className="self-center pb-2">
                <h3 className="text-xl font-bold text-[#182241]">Your Story Idea</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6f7895]">
                  A narrative, a memory, a message, a brand.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {ideaChips.map((chip) => (
                    <span
                      key={chip.label}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#dfe5f4] bg-white px-3 py-1.5 text-xs font-semibold text-[#4f5d85]"
                    >
                      <chip.icon className="h-3.5 w-3.5 text-[#6f7cff]" />
                      {chip.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="hidden items-center justify-center text-[#5368ff] lg:flex" aria-hidden="true">
            <ArrowRight className="h-7 w-7" />
          </div>

          {/* Step 2 — Kakis AI Agent */}
          <div className="relative overflow-hidden rounded-3xl border border-[#3b2fb3] bg-gradient-to-b from-[#332a9e] to-[#241c7a] shadow-[0_20px_50px_-24px_rgba(49,38,150,0.7)]">
            <StepBadge number={2} dark />
            <div className="flex h-full flex-col items-center p-6 pt-14 text-center">
              <img
                src={stepKakisAgent}
                alt="The Kakis AI agent"
                className="w-40 rounded-xl md:w-48"
              />
              <h3 className="mt-4 text-2xl font-bold text-white">Kakis AI Agent</h3>
              <p className="mt-1 text-sm text-[#c3c9f5]">Plans and creates every element of your story</p>
              <div className="mt-5 grid w-full grid-cols-5 gap-1 rounded-2xl bg-white/10 px-2 py-3">
                {agentElements.map((el) => (
                  <div key={el.label} className="flex flex-col items-center gap-1.5">
                    <el.icon className="h-5 w-5 text-white" />
                    <span className="text-[10px] font-medium leading-tight text-[#dfe3ff]">{el.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden items-center justify-center text-[#5368ff] lg:flex" aria-hidden="true">
            <ArrowRight className="h-7 w-7" />
          </div>

          {/* Step 3 — A Finished Story Video */}
          <div className="relative overflow-hidden rounded-3xl border border-[#dfe5f4] bg-white/90 shadow-[0_16px_40px_-24px_rgba(83,104,255,0.35)]">
            <StepBadge number={3} />
            <div className="grid h-full grid-cols-[1fr_auto] items-center gap-4 p-6 pt-16">
              <div>
                <h3 className="text-xl font-bold text-[#182241]">A Finished Story Video</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6f7895]">
                  Coherent arc, paced and produced end-to-end.
                </p>
              </div>
              <img
                src={stepFinishedVideo}
                alt="A finished Kakis AI story video of a grandfather and granddaughter sharing a meal"
                className="w-28 rounded-xl shadow-md md:w-32"
              />
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-2xl border border-[#dfe5f4] bg-white shadow-[0_16px_40px_-24px_rgba(83,104,255,0.35)]">
          <img
            src={howItWorksStrip}
            alt="A worked example in Kakis AI: the idea 'a grandmother passes down her secret recipe' becomes a script, scenes, shots, voice and music, and a final video"
            className="w-full"
          />
        </div>
        <p className="mx-auto mt-4 max-w-3xl text-center text-sm text-[#8892b3]">
          One idea, fully produced — video generation powered by leading AI models including Alibaba Wan.
        </p>
      </div>
    </section>
  );
}
