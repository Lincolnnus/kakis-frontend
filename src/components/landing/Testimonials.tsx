import { Avatar, AvatarFallback } from '@/components/ui/avatar';

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
  return (
    <section className="border-t border-border/50 bg-background py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl text-foreground">
            Creators Ship Faster with Kakis AI
          </h2>
          <p className="text-lg text-muted-foreground">
            Hear from filmmakers and studios who transformed their workflow.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-6"
            >
              <blockquote className="mb-6 text-muted-foreground leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {testimonial.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-foreground">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">
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
