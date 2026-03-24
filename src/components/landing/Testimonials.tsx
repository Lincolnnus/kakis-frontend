import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

const testimonials = [
  {
    quote: "We went from script to storyboard in 20 minutes. What used to take our team a full week of pre-production.",
    author: "Sarah Chen",
    role: "Independent Filmmaker",
    initials: "SC",
  },
  {
    quote: "The AI understands cinematic language — framing, angles, composition. It's like having a visual director on call 24/7.",
    author: "Marcus Rodriguez",
    role: "Animation Director",
    initials: "MR",
  },
  {
    quote: "Script to animatic in one sitting. The shot list generation alone replaced an entire step in our pipeline.",
    author: "Emily Watson",
    role: "Commercial Director",
    initials: "EW",
  },
];

export function Testimonials() {
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
          <h2 className="mb-4 text-3xl font-bold text-[#182241] md:text-4xl">
            Creators Ship Faster with Kakis AI
          </h2>
          <p className="text-lg text-[#6f7895]">
            Hear from filmmakers and studios who transformed their workflow.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="rounded-xl border border-[#dfe5f4] bg-white/85 p-6"
            >
              <blockquote className="mb-6 leading-relaxed text-[#6f7895]">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-[#e8edff] text-[#5368ff] font-semibold">
                    {testimonial.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-[#182241]">{testimonial.author}</div>
                  <div className="text-sm text-[#6f7895]">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
