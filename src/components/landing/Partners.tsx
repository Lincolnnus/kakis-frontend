export function Partners() {
  const partners = [
    { name: 'Google Gemini', logo: '✦' },
    { name: 'OpenAI', logo: '◎' },
    { name: 'BytePlus', logo: '▶' },
    { name: 'Alibaba Cloud', logo: '☁' },
    { name: 'Kimi', logo: '◆' },
    { name: 'Vidu', logo: '▣' },
    { name: 'ElevenLabs', logo: '♫' },
  ];

  const clients = [
    'Mint Museum of Toys',
    'Chinatown Heritage Centre',
    'National Heritage Board',
    'Singapore Tourism Board',
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
                className="flex items-center gap-2 text-muted-foreground/60 transition-colors hover:text-primary"
              >
                <span className="text-xl">{p.logo}</span>
                <span className="text-sm font-medium whitespace-nowrap">{p.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Clients */}
        <div>
          <p className="mb-8 text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Trusted By
          </p>
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-6 md:gap-10">
            {clients.map((name) => (
              <span
                key={name}
                className="rounded-full border border-border/50 bg-card/30 px-5 py-2 text-sm font-medium text-muted-foreground/80 whitespace-nowrap"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
