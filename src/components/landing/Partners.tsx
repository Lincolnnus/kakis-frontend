export function Partners() {
  const partners = [
    'Google Gemini',
    'OpenAI',
    'BytePlus',
    'Alibaba Cloud Global',
    'Keling AI',
    'Kimi',
    'Vidu',
    'ElevenLabs',
  ];

  const clients = [
    { name: 'National Heritage Board', href: 'https://www.nhb.gov.sg/' },
  ];

  return (
    <section className="border-t border-[#dfe5f4] bg-[#f4f7ff] py-20">
      <div className="container mx-auto px-4">
        {/* Technology Partners */}
        <div className="mb-16">
          <p className="mb-8 text-center text-sm font-semibold uppercase tracking-widest text-[#5a6eff]">
            Powered by Leading AI
          </p>
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-3">
            {partners.map((name) => (
              <span
                key={name}
                className="whitespace-nowrap rounded-full border border-[#d2dbf2] bg-white/90 px-4 py-1.5 text-sm font-medium text-[#4f5d85] transition-colors hover:border-[#aebcff] hover:text-[#182241]"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* Clients */}
        <div>
          <p className="mb-8 text-center text-sm font-semibold uppercase tracking-widest text-[#182241]/80">
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
                  className="whitespace-nowrap rounded-full border border-[#d2dbf2] bg-white/90 px-5 py-2 text-sm font-semibold text-[#182241] transition-colors hover:border-[#aebcff] hover:bg-white"
                >
                  {client.name}
                </a>
              ) : (
                <span
                  key={client.name}
                  className="whitespace-nowrap rounded-full border border-[#d2dbf2] bg-white/90 px-5 py-2 text-sm font-semibold text-[#182241]"
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
