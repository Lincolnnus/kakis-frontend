import { Film } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

export function ShowcaseVideos() {
  const { targetRef, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section
      id="examples"
      ref={targetRef}
      className={cn(
        'border-t border-[#dfe5f4] bg-[#f4f7ff] py-24 transition-all duration-700 ease-out',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0',
      )}
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#5a6eff]">Examples</p>
          <h2 className="mb-4 text-3xl font-bold text-[#182241] md:text-4xl">See Kakis AI in Action</h2>
          <p className="text-lg text-[#6f7895]">
            Watch a walkthrough of the platform, then see a finished story video created with Kakis AI.
          </p>
        </div>

        <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-[#dfe5f4] shadow-[0_10px_24px_rgba(83,104,255,0.14)]">
            <div className="flex items-center gap-2 bg-[#e8edff] px-4 py-2.5">
              <Film className="h-4 w-4 text-[#5368ff]" />
              <span className="text-sm font-semibold text-[#3a4a7a]">See How It Works</span>
            </div>
            <div className="aspect-video">
              <iframe
                src="https://www.youtube.com/embed/6RTP4qJyc-U"
                title="Kakis AI video tutorial"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-[#dfe5f4] shadow-[0_10px_24px_rgba(83,104,255,0.14)]">
            <div className="flex items-center gap-2 bg-[#e8edff] px-4 py-2.5">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#5368ff]" aria-hidden="true"><path d="M10 9.5 15.5 12 10 14.5V9.5ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
              <span className="text-sm font-semibold text-[#3a4a7a]">Watch a Sample Output</span>
            </div>
            <div className="aspect-video">
              <iframe
                src="https://www.youtube.com/embed/NXaU5vx2igE"
                title="Sample story video created with Kakis AI"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
