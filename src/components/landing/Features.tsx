import { 
  FileText, 
  Wand2,
  Layers,
  ListChecks, 
  Film, 
  Download,
  Zap,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

const features = [
  {
    icon: FileText,
    title: 'Intelligent Script Parsing',
    description: 'Upload any script format — our AI breaks it into scenes, characters, locations, and dialogue automatically.',
  },
  {
    icon: Wand2,
    title: 'AI Frame Generation',
    description: 'Turn scene descriptions into stunning visual frames. Choose art styles that match your creative vision.',
  },
  {
    icon: Layers,
    title: 'Visual Storyboard Canvas',
    description: 'Arrange frames on an interactive canvas. Add camera directions, notes, and dialogue overlays.',
  },
  {
    icon: ListChecks,
    title: 'Smart Shot Lists',
    description: 'Auto-generate professional shot lists with camera angles, lens specs, and movement choreography.',
  },
  {
    icon: Film,
    title: 'Cinematic Animatics',
    description: 'Transform storyboards into timed animatic sequences with transitions, pacing, and audio sync.',
  },
  {
    icon: Zap,
    title: 'Minutes, Not Weeks',
    description: 'Complete pre-production workflows that traditionally take weeks — finished in minutes with AI.',
  },
];

export function Features() {
  const { targetRef, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={targetRef}
      className={cn(
        'border-t border-[#dfe5f4] bg-[#f4f7ff] py-24 transition-all duration-700 ease-out',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0',
      )}
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#5a6eff]">The Complete Pipeline</p>
          <h2 className="mb-4 text-3xl font-bold text-[#182241] md:text-4xl">
            Every Step from Story to Screen
          </h2>
          <p className="text-lg text-[#6f7895]">
            One AI-powered platform replaces your entire pre-production toolkit.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-xl border border-[#dfe5f4] bg-white/85 p-6 transition-all hover:border-[#9aa7ff] hover:bg-white"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#e8edff] text-[#5368ff] transition-colors group-hover:bg-[#dfe6ff] group-hover:text-[#4559f0]">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-[#182241]">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-[#6f7895]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
