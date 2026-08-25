import { useState } from 'react';
import { X, Play, Clapperboard, Sparkles, Zap, CalendarDays, CreditCard } from 'lucide-react';
import { KakisLogo } from '@/components/shared/KakisLogo';
import bannerArtwork from '@/assets/landing/wan3-launch-banner.webp';
import alibabaCloudLogo from '@/assets/landing/Alibaba_Cloud_Logo.png';

const APP_STAGING_URL = 'https://app.kakis.ai/';

// Versioned so a future campaign gets a fresh key and re-shows to everyone
// who dismissed this one.
const DISMISS_KEY = 'kakis.announcement.wan3-launch';

const BANNER_ALT =
  'Just launched: Alibaba Cloud Wan 3.0 on Kakis AI. Be among the first to experience ' +
  'Alibaba Cloud Wan 3.0 — free for 7 days. No credit card required.';

// Mirrors the feature strip baked into the artwork, for the compact phone layout.
const FEATURES = [
  { icon: Play, title: 'Powered by Alibaba Cloud', copy: 'State-of-the-art AI video model' },
  { icon: Clapperboard, title: 'Cinematic Quality', copy: 'Stunning visuals, realistic motion' },
  { icon: Sparkles, title: 'AI Magic Made Simple', copy: 'Create professional videos with ease' },
  { icon: Zap, title: 'Faster, Smarter', copy: 'More efficient than ever before' },
];

const OFFER_VALID_UNTIL = '1 September 2026';

const TRUST_POINTS = [
  { icon: CalendarDays, label: `Valid until ${OFFER_VALID_UNTIL}` },
  { icon: CreditCard, label: 'No Credit Card Required' },
  { icon: Sparkles, label: 'Start Creating Today!' },
];

function readDismissed() {
  try {
    return window.localStorage.getItem(DISMISS_KEY) === '1';
  } catch {
    // Private browsing or blocked storage — show the banner rather than crash.
    return false;
  }
}

export function Wan3LaunchBanner() {
  // Read during initialisation so returning visitors never see a flash of the
  // banner before it hides.
  const [dismissed, setDismissed] = useState(readDismissed);

  if (dismissed) return null;

  const dismiss = () => {
    setDismissed(true);
    try {
      window.localStorage.setItem(DISMISS_KEY, '1');
    } catch {
      // Non-fatal: the banner still hides for this session.
    }
  };

  return (
    <section aria-label="Wan 3.0 launch announcement" className="container mx-auto px-4 pt-6">
      <div className="relative">
        <a
          href={APP_STAGING_URL}
          target="_blank"
          rel="noreferrer"
          className="group block overflow-hidden rounded-2xl bg-[#0a0118] shadow-[0_20px_60px_rgba(88,28,235,0.28)] ring-1 ring-[#4c1d95]/60 transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a855f7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4f7ff]"
        >
          {/* Artwork carries the full message from tablet width up. */}
          <img
            src={bannerArtwork}
            alt={BANNER_ALT}
            width={2000}
            height={1126}
            loading="eager"
            decoding="async"
            className="hidden h-auto w-full md:block"
          />

          {/* Phones get a text layout — the artwork's fine print is unreadable
              below ~768px. */}
          <div className="relative isolate bg-[radial-gradient(120%_140%_at_78%_50%,rgba(124,58,237,0.55),transparent_60%),radial-gradient(90%_120%_at_10%_10%,rgba(76,29,149,0.45),transparent_55%)] p-6 md:hidden">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-[#5b21b6] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
              <Sparkles className="h-3 w-3" />
              Just Launched
            </span>

            <div className="mt-5 flex flex-wrap items-center gap-3 text-white">
              <img
                src={alibabaCloudLogo}
                alt="Alibaba Cloud"
                width={1024}
                height={129}
                className="h-[18px] w-auto"
              />
              <span className="inline-flex items-center gap-3">
                <span aria-hidden="true" className="text-[#8b5cf6]">&times;</span>
                <KakisLogo className="h-7 w-7" />
                <span className="text-lg font-semibold">Kakis AI</span>
              </span>
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-[#a78bfa]">
              Special Collaboration
            </p>
            <h2 className="mt-2 text-2xl font-bold uppercase leading-tight tracking-tight text-white">
              Be among the first to experience{' '}
              <span className="text-[#a78bfa]">Alibaba Cloud Wan 3.0 — free for 7 days</span>
            </h2>
            <p className="mt-3 text-sm text-[#cfc6ea]">
              Experience next-generation AI video creation with Alibaba Cloud Wan 3.0 — now
              available on Kakis AI.
            </p>

            <ul className="mt-7 grid gap-px overflow-hidden rounded-xl bg-[#3b1d7a]/60 ring-1 ring-[#4c1d95]/70 sm:grid-cols-2">
              {FEATURES.map(({ icon: Icon, title, copy }) => (
                <li key={title} className="bg-[#12042e] p-4">
                  <div className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#7c3aed] text-white">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold leading-snug text-white">{title}</p>
                      <p className="mt-0.5 text-xs leading-snug text-[#a89fc6]">{copy}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <ul className="mt-6 flex flex-col gap-2 text-sm text-[#a78bfa]">
              {TRUST_POINTS.map(({ icon: Icon, label }) => (
                <li key={label} className="inline-flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {label}
                </li>
              ))}
            </ul>

            <div className="mt-7 rounded-2xl bg-white p-6 text-center shadow-[0_0_50px_rgba(168,85,247,0.45)]">
              <p className="text-4xl font-black uppercase leading-none tracking-tight text-[#3a0ca8]">
                7 Days
              </p>
              <p className="mt-3 rounded-lg bg-[#3a0ca8] px-4 py-2 text-xl font-extrabold uppercase tracking-wide text-white">
                Free Trial
              </p>
              <p className="mt-3 text-xs font-semibold uppercase leading-snug tracking-wide text-[#4c1d95]">
                On Alibaba Cloud Wan 3.0 video creation
              </p>
              <p className="mt-2 text-xs font-medium text-[#6d28d9]">
                Valid until {OFFER_VALID_UNTIL}
              </p>
            </div>

            <span className="mt-4 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#a855f7] px-6 py-3 text-sm font-semibold text-white">
              Start your free trial
            </span>
          </div>
        </a>

        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss announcement"
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 backdrop-blur transition-colors hover:bg-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a855f7]"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
