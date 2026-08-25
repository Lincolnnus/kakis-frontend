import { cn } from '@/lib/utils';

/**
 * The Kakis AI app mark — a glowing chevron on a deep violet rounded square.
 * Decorative by default: every call site pairs it with the "Kakis AI" wordmark,
 * so announcing it again would make screen readers repeat the brand name.
 */
export function KakisLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn('shrink-0', className)}
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="kakis-logo-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3a0ca8" />
          <stop offset="100%" stopColor="#2d0785" />
        </linearGradient>
        <radialGradient id="kakis-logo-glow" cx="0.55" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#8b2be2" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#8b2be2" stopOpacity="0" />
        </radialGradient>
        <filter id="kakis-logo-bloom" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="100" height="100" rx="24" fill="url(#kakis-logo-bg)" />
      <circle cx="55" cy="50" r="42" fill="url(#kakis-logo-glow)" />

      <g filter="url(#kakis-logo-bloom)" fill="none" stroke="#f2e2ff" strokeLinecap="round" strokeLinejoin="round">
        <path d="M76 26 L44 50 L76 74" strokeWidth="13" />
        <path d="M26 45.5 L26 54.5" strokeWidth="9" />
      </g>
    </svg>
  );
}
