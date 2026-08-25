import { Gift, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export function PromoBanner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-[#ffddb2] bg-gradient-to-r from-[#fff4e8] to-[#fff8ef] p-5 md:p-6',
        className,
      )}
    >
      <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex flex-col items-center gap-3 md:flex-row">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f26a1d]/10 text-[#f26a1d]">
            <Gift className="h-5 w-5" />
          </div>
          <div>
            <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#c26422]">
              <Clock className="h-3.5 w-3.5" />
              Challenge Exclusive · Limited Time
            </p>
            <p className="mt-1 text-base font-semibold text-[#182241] md:text-lg">
              +30% bonus credits on every Kakis AI top-up
            </p>
            <p className="mt-0.5 text-sm text-[#6f7895]">
              Purchase credits before 31 July 2026 — bonus applied automatically at checkout.
            </p>
          </div>
        </div>
        <a
          href="https://app.kakis.ai/pricing"
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-[#f59e0b] to-[#f97316] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(245,158,11,0.25)] transition-transform hover:-translate-y-0.5"
        >
          View Pricing
        </a>
      </div>
    </div>
  );
}
