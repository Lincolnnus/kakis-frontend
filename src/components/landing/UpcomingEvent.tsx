import { useEffect, useState } from 'react';
import { CalendarDays, FileText, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

// Countdown target: submission deadline — 29 May 2026 12:00pm SGT (UTC+8).
// Convert to UTC by subtracting 8 hours: 29 May 2026 12:00 GMT+8 => 29 May 2026 04:00 UTC
const EVENT_START_DATE = new Date(Date.UTC(2026, 4, 29, 4, 0, 0));
const SIGNUP_GUIDE_PDF_URL = new URL('../../../Signup Guide.pdf', import.meta.url).href;
const ALIBABA_BRIEF_PDF_URL = new URL('../../../Alibaba Cloud Singapore Stories Unearthed WAN AI Video Challenge overview and brief.pdf', import.meta.url).href;

const ORGANIZER_WEBSITE_URL = 'https://www.alibabacloud.com/en/campaign/wan_video_challenge';
const WHATSAPP_COMMUNITY_URL = 'https://chat.whatsapp.com/EDvmuIu7M6sBggLkUGFVkM';

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type TimelineMilestone = {
  title: string;
  description: string;
  date: string;
  detailsPosition: 'top' | 'bottom';
};

type PrizeTier = {
  title: string;
  cash: string;
  credits: string;
  note?: string;
  highlight?: boolean;
};

const HACKATHON_TIMELINE: TimelineMilestone[] = [
  {
    title: 'Registration period',
    description: 'Register your interest here',
    date: '13 April - 14 May 2026',
    detailsPosition: 'top',
  },
  {
    title: 'Online Briefing and Workshop',
    description: 'Online briefing to reveal the challenge theme',
    date: '15 May 2026, 10am - 12pm SGT',
    detailsPosition: 'bottom',
  },
  {
    title: 'Submission Deadline',
    description: 'Submit your completed video',
    date: '29 May 2026',
    detailsPosition: 'top',
  },
  {
    title: 'Judging period',
    description: 'All entries judged by our panel',
    date: '2 - 8 June 2026',
    detailsPosition: 'bottom',
  },
  {
    title: 'Award Ceremony',
    description: 'Finalists invited to Singapore',
    date: '16 June 2026',
    detailsPosition: 'top',
  },
];

const HACKATHON_PRIZES: PrizeTier[] = [
  {
    title: 'First Prize',
    cash: 'SGD 6,000',
    credits: '1,000 AI credits',
    highlight: true,
  },
  {
    title: 'Second Prize',
    cash: 'SGD 4,000',
    credits: '500 AI credits',
  },
  {
    title: 'Third Prize',
    cash: 'SGD 1,000',
    credits: '300 AI credits',
  },
  {
    title: '3 Honourable Mentions',
    cash: 'SGD 800',
    credits: '100 AI credits',
    note: 'each',
  },
];

function getCountdown(): Countdown {
  const remainingMs = Math.max(EVENT_START_DATE.getTime() - Date.now(), 0);

  const totalSeconds = Math.floor(remainingMs / 1000);
  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

function TimelineDateBadge({ date, placement }: { date: string; placement: 'above' | 'below' }) {
  return (
    <div className="mx-auto inline-flex flex-col items-center">
      {placement === 'below' && <span className="-mb-1 h-3 w-3 rotate-45 border border-[#eceff8] bg-white" />}
      <span className="inline-flex rounded-md border border-[#eceff8] bg-white px-4 py-2 text-[13px] font-semibold text-[#f26a1d] shadow-[0_10px_24px_-20px_rgba(30,41,59,0.9)]">
        {date}
      </span>
      {placement === 'above' && <span className="-mt-1 h-3 w-3 rotate-45 border border-[#eceff8] bg-white" />}
    </div>
  );
}

export function UpcomingEvent() {
  const { targetRef, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.05 });
  const [countdown, setCountdown] = useState<Countdown>(() => getCountdown());

  const hasOrganizerWebsiteLink = ORGANIZER_WEBSITE_URL.trim() !== '';
  const hasWhatsappCommunityLink = WHATSAPP_COMMUNITY_URL.trim() !== '';

  const countdownItems = [
    { label: 'Days', value: countdown.days },
    { label: 'Hours', value: countdown.hours },
    { label: 'Minutes', value: countdown.minutes },
    { label: 'Seconds', value: countdown.seconds },
  ];

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <section
      ref={targetRef}
      className={cn(
        'border-t border-[#dfe5f4] bg-[#f4f7ff] py-24 transition-all duration-700 ease-out',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0',
      )}
    >
      <div className="container mx-auto px-4">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-[#d9e1fa] bg-gradient-to-br from-white via-[#f8faff] to-[#eef3ff] p-8 shadow-[0_20px_70px_-35px_rgba(65,94,200,0.5)] md:p-10">
          <div className="pointer-events-none absolute -top-16 -right-14 h-44 w-44 rounded-full bg-[#dae4ff]/70 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-[#d9fff3]/55 blur-2xl" />

          <div className="relative mb-4 inline-flex items-center gap-2 rounded-full border border-[#cdd8ff] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#4e63d9]">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Challenge Submission Deadline
          </div>

          <h2 className="relative mb-3 text-3xl font-bold text-[#182241] md:text-4xl">
            Upcoming event: Alibaba Cloud WAN AI Video Challenge
          </h2>

          <div className="relative mb-7 rounded-2xl border border-[#dbe4ff] bg-white/80 px-4 py-6 md:px-6">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#5f6f9d]">Alibaba Cloud WAN AI Video Challenge Timeline</p>

            <div className="relative hidden lg:block">
              {/* Line sits at top-section height (120px) + half the dot height (8px) */}
              <div className="pointer-events-none absolute inset-x-0 top-[128px] border-t border-[#ccd5e9]" />

              <div className="flex justify-between">
                {HACKATHON_TIMELINE.map((milestone) => (
                  <article key={milestone.title} className="flex w-full max-w-[18%] flex-col items-center text-center">
                    {/* Fixed-height top section — content aligned to bottom so all dots land at the same Y */}
                    <div className="flex h-[120px] w-full flex-col items-center justify-end pb-3">
                      {milestone.detailsPosition === 'top' ? (
                        <>
                          <h3 className="text-[17px] font-bold leading-tight text-[#22262f]">{milestone.title}</h3>
                          <p className="mt-2 text-[13px] leading-snug text-[#4b556f]">{milestone.description}</p>
                        </>
                      ) : (
                        <TimelineDateBadge date={milestone.date} placement="above" />
                      )}
                    </div>

                    {/* Dot — centered on the horizontal line */}
                    <span className="relative z-10 block h-4 w-4 flex-shrink-0 rounded-full border-4 border-white bg-[#1f263a] shadow-[0_0_0_2px_#1f263a]" />

                    {/* Bottom section — content aligned to top */}
                    <div className="flex min-h-[80px] w-full flex-col items-center justify-start pt-3">
                      {milestone.detailsPosition === 'top' ? (
                        <TimelineDateBadge date={milestone.date} placement="below" />
                      ) : (
                        <>
                          <h3 className="text-[17px] font-bold leading-tight text-[#22262f]">{milestone.title}</h3>
                          <p className="mt-2 text-[13px] leading-snug text-[#4b556f]">{milestone.description}</p>
                        </>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="grid gap-3 lg:hidden">
              {HACKATHON_TIMELINE.map((milestone) => (
                <article key={`${milestone.title}-mobile`} className="rounded-xl border border-[#e1e7f8] bg-white/90 px-4 py-4 shadow-sm">
                  <p className="mb-2 text-sm font-semibold text-[#f26a1d]">{milestone.date}</p>
                  <h3 className="text-base font-bold text-[#22262f]">{milestone.title}</h3>
                  <p className="mt-1 text-sm text-[#4b556f]">{milestone.description}</p>
                </article>
              ))}
            </div>
          </div>

          <p className="relative mb-7 rounded-2xl border border-[#dbe4ff] bg-white/75 px-4 py-3 text-base text-[#5e6b92] md:text-lg">
            <strong>The challenge is live — let's go!</strong> Registration is closed and the challenge is on. Create your best AI-powered video, submit before the deadline, and compete for exciting prizes. Every second counts!
          </p>

          <p className="relative mb-7 rounded-2xl border border-[#dbe4ff] bg-white/75 px-4 py-3 text-base text-[#5e6b92] md:text-lg">
            Submission deadline is in {countdown.days} days {countdown.hours} hours {countdown.minutes} minutes {countdown.seconds} seconds
          </p>

          <div className="relative mb-7 grid grid-cols-2 gap-3 md:grid-cols-4">
            {countdownItems.map((item) => (
              <div
                key={item.label}
                className={cn(
                  'rounded-2xl border border-[#dbe4ff] bg-white/85 px-4 py-4 text-center shadow-sm transition-transform duration-300 hover:-translate-y-0.5',
                  item.label === 'Seconds' && 'border-[#c6d4ff] bg-gradient-to-b from-[#f0f4ff] to-[#e6eeff] ring-1 ring-[#d2ddff]',
                )}
              >
                <div className={cn('text-2xl font-extrabold text-[#2f3f7d] md:text-3xl', item.label === 'Seconds' && 'animate-pulse text-[#3f57cc]')}>
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#6c78a3]">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="relative mb-8 overflow-hidden rounded-2xl border border-[#d7e1ff] bg-gradient-to-br from-white via-[#f8faff] to-[#eef5ff] p-5 md:p-6">
            <div className="pointer-events-none absolute -top-12 -right-8 h-32 w-32 rounded-full bg-[#dce7ff]/70 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-14 -left-10 h-36 w-36 rounded-full bg-[#d9fff3]/55 blur-2xl" />

            <div className="relative mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center rounded-full border border-[#ffddb9] bg-[#fff4e8] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#c26422]">
                Attractive prizes
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#6674a5]">Cash rewards + AI credits</p>
            </div>

            <div className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {HACKATHON_PRIZES.map((prize) => (
                <article
                  key={prize.title}
                  className={cn(
                    'rounded-xl border border-[#dbe5ff] bg-white/90 px-4 py-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md',
                    prize.highlight && 'border-[#f1c086] bg-gradient-to-b from-[#fff7ee] to-white ring-1 ring-[#f6d8b4]',
                  )}
                >
                  <p className={cn('text-sm font-semibold uppercase tracking-[0.08em] text-[#6372a3]', prize.highlight && 'text-[#b56c26]')}>
                    {prize.title}
                  </p>
                  <p className="mt-2 text-2xl font-extrabold leading-tight text-[#192547]">{prize.cash}</p>
                  <p className="mt-1 text-sm font-semibold text-[#4660dc]">+ {prize.credits}</p>
                  {prize.note && <p className="mt-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#6c7aa8]">{prize.note}</p>}
                </article>
              ))}
            </div>
          </div>

          <div className="relative mb-8 grid gap-3 text-sm text-[#4f5d85] md:grid-cols-2">
            <p className="flex items-center gap-2 rounded-xl border border-[#dde6ff] bg-white/75 px-4 py-3">
              <CalendarDays className="h-4 w-4 text-[#5f72ff]" aria-hidden="true" />
              Registration start date: 13 April 2026
            </p>
            <p className="flex items-center gap-2 rounded-xl border border-[#dde6ff] bg-white/75 px-4 py-3">
              <CalendarDays className="h-4 w-4 text-[#25a27f]" aria-hidden="true" />
              Hackathon start date: 15 May 2026
            </p>
          </div>

          <div className="relative mb-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-[#dbe4ff] bg-white/80 p-4 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#5b68a0]">Organiser's website</p>
              <a
                href={hasOrganizerWebsiteLink ? ORGANIZER_WEBSITE_URL : '#'}
                target="_blank"
                rel="noreferrer"
                aria-disabled={!hasOrganizerWebsiteLink}
                className={cn(
                  'inline-flex items-center justify-center rounded-xl border border-[#9fb0ee] px-5 py-2 text-sm font-semibold transition-colors',
                  hasOrganizerWebsiteLink
                    ? 'bg-[#eef3ff] text-[#3f57cc] hover:bg-[#e2eaff]'
                    : 'cursor-not-allowed bg-[#f4f7ff] text-[#7d89ad] opacity-70',
                )}
                onClick={(event) => {
                  if (!hasOrganizerWebsiteLink) {
                    event.preventDefault();
                  }
                }}
              >
                {hasOrganizerWebsiteLink ? 'Visit organiser website' : 'Add organiser website link here'}
              </a>
            </div>

            <div className="rounded-2xl border border-[#dbe4ff] bg-white/80 p-4 text-center">
              <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-[#5b68a0]">WhatsApp community</p>
              <p className="mb-3 text-xs text-[#6b78a3]">Get updates and report bugs</p>
              <a
                href={hasWhatsappCommunityLink ? WHATSAPP_COMMUNITY_URL : '#'}
                target="_blank"
                rel="noreferrer"
                aria-disabled={!hasWhatsappCommunityLink}
                className={cn(
                  'inline-flex items-center justify-center rounded-xl border border-[#9fb0ee] px-5 py-2 text-sm font-semibold transition-colors',
                  hasWhatsappCommunityLink
                    ? 'bg-[#eef3ff] text-[#3f57cc] hover:bg-[#e2eaff]'
                    : 'cursor-not-allowed bg-[#f4f7ff] text-[#7d89ad] opacity-70',
                )}
                onClick={(event) => {
                  if (!hasWhatsappCommunityLink) {
                    event.preventDefault();
                  }
                }}
              >
                {hasWhatsappCommunityLink ? 'Join WhatsApp community' : 'Add WhatsApp link here'}
              </a>
            </div>
          </div>

          <div className="relative mt-2 grid gap-5 md:grid-cols-2 md:items-start">
            <a
              href={SIGNUP_GUIDE_PDF_URL}
              target="_blank"
              rel="noreferrer"
              className="group relative w-full text-[#42507c]"
            >
              <span className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#7a8dff]/35 to-[#66ddb8]/35 opacity-70 blur-md transition-opacity group-hover:opacity-100" />
              <span className="relative flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-[#9fb0ee] bg-white/90 px-6 py-5 text-center shadow-[0_20px_50px_-36px_rgba(45,78,194,0.95)] ring-1 ring-[#c9d6ff] transition-all duration-300 hover:-translate-y-1 hover:border-[#8398e6] hover:bg-white">
                <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full border border-[#ffd9ba] bg-[#fff4e8] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#c26422]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff9e5e]/70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#f26a1d]" />
                  </span>
                  Important
                </span>
                <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#e7edff] text-[#4f64e6]">
                  <span className="absolute inset-0 rounded-full bg-[#7085ff]/30 animate-ping" />
                  <FileText className="relative h-6 w-6" aria-hidden="true" />
                </span>
                <span className="text-lg font-semibold">Quick Guide: How to join the Challenge</span>
                <span className="text-xs font-medium uppercase tracking-widest text-[#5f72ff]">Open PDF</span>
              </span>
            </a>

            <a
              href={ALIBABA_BRIEF_PDF_URL}
              target="_blank"
              rel="noreferrer"
              className="group relative w-full text-[#42507c]"
            >
              <span className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#7a8dff]/35 to-[#66ddb8]/35 opacity-70 blur-md transition-opacity group-hover:opacity-100" />
              <span className="relative flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-[#9fb0ee] bg-white/90 px-6 py-5 text-center shadow-[0_20px_50px_-36px_rgba(45,78,194,0.95)] ring-1 ring-[#c9d6ff] transition-all duration-300 hover:-translate-y-1 hover:border-[#8398e6] hover:bg-white">
                <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full border border-[#ffd9ba] bg-[#fff4e8] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#c26422]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff9e5e]/70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#f26a1d]" />
                  </span>
                  Important
                </span>
                <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#e7edff] text-[#4f64e6]">
                  <span className="absolute inset-0 rounded-full bg-[#7085ff]/30 animate-ping" />
                  <FileText className="relative h-6 w-6" aria-hidden="true" />
                </span>
                <span className="text-lg font-semibold">Official Challenge Guide</span>
                <span className="text-xs font-medium uppercase tracking-widest text-[#5f72ff]">Open PDF</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}