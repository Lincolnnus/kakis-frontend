import { Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import alibabaEventPhoto from '@/assets/landing/alibaba-wan-challenge-event.jpg';

const EVENT_PAGE_URL = 'https://www.alibabacloud.com/en/campaign/wan_video_challenge?_p_lc=1';
const EVENT_PAGE_LABEL = 'www.alibabacloud.com/en/campaign/wan_video_challenge';

type WinnerVideo = {
  title: string;
  youtubeId: string;
};

const WINNER_VIDEOS: WinnerVideo[] = [
  { title: '1st Place', youtubeId: 'AKRMkHJGrFQ' },
  { title: '2nd Place', youtubeId: '9MGwRq65gS4' },
  { title: '3rd Place', youtubeId: 'BkoxLDJWh_w' },
  { title: 'Honourable Mention', youtubeId: 'SQHlGmuYCUs' },
  { title: 'Honourable Mention', youtubeId: 'N07tIsHvT_E' },
  { title: 'Honourable Mention', youtubeId: '_IbUlOCyRg8' },
];

export function ChallengeAward() {
  const { targetRef, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.05 });

  return (
    <section
      ref={targetRef}
      className={cn(
        'border-t border-[#dfe5f4] bg-[#f4f7ff] py-24 transition-all duration-700 ease-out',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0',
      )}
    >
      <div className="container mx-auto px-4">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-[#d9e1fa] bg-gradient-to-br from-white via-[#f8faff] to-[#eef3ff] p-8 shadow-[0_20px_70px_-35px_rgba(65,94,200,0.5)] md:p-10">
          <div className="pointer-events-none absolute -top-16 -right-14 h-44 w-44 rounded-full bg-[#dae4ff]/70 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-[#d9fff3]/55 blur-2xl" />

          <div className="relative mb-4 inline-flex items-center gap-2 rounded-full border border-[#cdd8ff] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#4e63d9]">
            <Trophy className="h-4 w-4" aria-hidden="true" />
            Challenge Award
          </div>

          <h2 className="relative mb-3 text-3xl font-bold text-[#182241] md:text-4xl">
            Alibaba Cloud WAN AI Video Challenge — Winners
          </h2>

          <p className="relative mb-7 text-base text-[#5e6b92] md:text-lg">
            The challenge has concluded — congratulations to all winners! Visit the official event page for full
            results, or watch the winning entries below.
          </p>

          <div className="relative mb-8 overflow-hidden rounded-2xl border border-[#dbe4ff] shadow-sm">
            <img
              src={alibabaEventPhoto}
              alt="Team and participants at the Alibaba Cloud WAN AI Video Challenge sharing session"
              className="w-full object-cover"
            />
          </div>

          <div className="relative mb-8 rounded-2xl border border-[#dbe4ff] bg-white/80 p-4 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#5b68a0]">Event page</p>
            <a
              href={EVENT_PAGE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center break-all rounded-xl border border-[#9fb0ee] bg-[#eef3ff] px-5 py-2 text-sm font-semibold text-[#3f57cc] transition-colors hover:bg-[#e2eaff]"
            >
              {EVENT_PAGE_LABEL}
            </a>
          </div>

          <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WINNER_VIDEOS.map((video, index) => (
              <div
                key={`${video.youtubeId}-${index}`}
                className="overflow-hidden rounded-2xl border border-[#dbe4ff] bg-white/85 shadow-sm transition-transform duration-300 hover:-translate-y-0.5"
              >
                <div className="aspect-video w-full">
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                    title={`${video.title} — Alibaba Cloud WAN AI Video Challenge`}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <p className="px-4 py-3 text-sm font-semibold text-[#42507c]">{video.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
