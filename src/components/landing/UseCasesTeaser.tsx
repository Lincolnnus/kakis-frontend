import { ArrowRight, GraduationCap, Landmark, Megaphone, MapPin } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

type Audience = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const audiences: Audience[] = [
  {
    title: 'Museums & Heritage',
    description: 'Bring history to life for future generations.',
    icon: Landmark,
  },
  {
    title: 'Brands & Marketing',
    description: 'Turn products and messages into stories people remember.',
    icon: Megaphone,
  },
  {
    title: 'Tourism & Destinations',
    description: 'Create memorable journeys for visitors.',
    icon: MapPin,
  },
  {
    title: 'Families & Educators',
    description: 'Share personal stories and inspire the next generation.',
    icon: GraduationCap,
  },
];

export function UseCasesTeaser() {
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
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#5a6eff]">Who It's For</p>
          <h2 className="mb-4 text-3xl font-bold text-[#182241] md:text-4xl">
            You're Not "Non-Video People."
          </h2>
          <p className="text-lg text-[#6f7895]">You're storytellers who lacked a camera crew.</p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((audience) => (
            <div
              key={audience.title}
              className="group relative rounded-xl border border-[#dfe5f4] bg-white/85 p-6 transition-all hover:border-[#9aa7ff] hover:bg-white"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#e8edff] text-[#5368ff] transition-colors group-hover:bg-[#dfe6ff] group-hover:text-[#4559f0]">
                <audience.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-[#182241]">{audience.title}</h3>
              <p className="text-sm leading-relaxed text-[#6f7895]">{audience.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 rounded-xl border border-[#9fb0ee] bg-[#eef3ff] px-6 py-3 text-sm font-semibold text-[#3f57cc] transition-colors hover:bg-[#e2eaff]"
          >
            Read Our Story
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
