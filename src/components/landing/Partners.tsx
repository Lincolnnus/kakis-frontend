export function Partners() {
  const partners = [
    { name: 'Google Gemini', logo: '✦' },
    { name: 'OpenAI', logo: '◎' },
    { name: 'BytePlus', logo: '▶' },
    { name: 'Alibaba Group', logo: '☁' },
    { name: 'Kimi', logo: '◆' },
    { name: 'Vidu', logo: '▣' },
    { name: 'ElevenLabs', logo: '♫' },
  ];

  const clients = [
    { name: 'National Heritage Board', href: 'https://www.nhb.gov.sg/' },
    { name: 'Alibaba Group', href: 'https://talent.alibaba.com/en/home?lang=en' },
    { name: 'DBS Bank' }
  ];

  return (
    <section className="border-t border-border/30 bg-background py-20">
      <div className="container mx-auto px-4">
        {/* Technology Partners */}
        <div className="mb-16">
          <p className="mb-8 text-center text-sm font-semibold uppercase tracking-widest text-primary">
            Powered by Leading AI
          </p>
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-8 md:gap-12">
            {partners.map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-2 text-muted-foreground/80 transition-colors hover:text-foreground"
              >
                <span className="text-xl">{p.logo}</span>
                <span className="text-sm font-medium whitespace-nowrap">{p.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Clients */}
        <div>
          <p className="mb-8 text-center text-sm font-semibold uppercase tracking-widest text-foreground/80">
            Trusted By
          </p>
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-6 md:gap-10">
            {clients.map((client) => (
              client.href ? (
                <a
                  key={client.name}
                  href={client.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-border bg-card/60 px-5 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-card/80 whitespace-nowrap"
                >
                  {client.name}
                </a>
              ) : (
                <span
                  key={client.name}
                  className="rounded-full border border-border bg-card/60 px-5 py-2 text-sm font-semibold text-foreground whitespace-nowrap"
                >
                  {client.name}
                </span>
              )
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
