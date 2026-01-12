import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const testimonials = [
  {
    quote: "This tool has completely transformed our pre-production workflow. What used to take days now takes hours.",
    author: "Sarah Chen",
    role: "Independent Filmmaker",
    initials: "SC",
  },
  {
    quote: "The AI storyboard generation is incredible. It understands cinematic language and delivers professional results.",
    author: "Marcus Rodriguez",
    role: "Animation Director",
    initials: "MR",
  },
  {
    quote: "Finally, a tool that bridges the gap between script and visual. The shot list feature alone is worth the subscription.",
    author: "Emily Watson",
    role: "Commercial Director",
    initials: "EW",
  },
];

export function Testimonials() {
  return (
    <section className="border-t bg-background py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Loved by Creators Worldwide
          </h2>
          <p className="text-lg text-muted-foreground">
            See what filmmakers and studios are saying about our platform.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="rounded-xl border bg-card p-6"
            >
              <blockquote className="mb-6 text-muted-foreground">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {testimonial.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{testimonial.author}</div>
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
