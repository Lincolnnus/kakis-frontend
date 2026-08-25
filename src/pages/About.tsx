import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { PromoBanner } from '@/components/shared/PromoBanner';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { cn } from '@/lib/utils';
import {
  ArrowRight,
  Globe2,
  Handshake,
  Heart,
  Mail,
  PenTool,
  Play,
  Quote,
  Sparkles,
} from 'lucide-react';
import founderShao from '@/assets/about/founder-shao.jpg';
import eraCaveArt from '@/assets/about/era-cave-art.jpg';
import eraPrint from '@/assets/about/era-print.jpg';
import eraFilm from '@/assets/about/era-film.jpg';
import eraAiVideo from '@/assets/about/era-ai-video.jpg';
import audienceMuseumsHeritage from '@/assets/about/audience-museums-heritage.jpg';
import audienceBrandsMarketing from '@/assets/about/audience-brands-marketing.jpg';
import audienceTourismDestinations from '@/assets/about/audience-tourism-destinations.jpg';
import audienceFamiliesEducators from '@/assets/about/audience-families-educators.jpg';
import explorationMuseum from '@/assets/about/exploration-museum.jpg';
import explorationAssetManagement from '@/assets/about/exploration-asset-management.jpg';
import explorationAttraction from '@/assets/about/exploration-attraction.jpg';
import promptFoundingStory from '@/assets/about/prompt-founding-story.jpg';
import promptCustomerJourney from '@/assets/about/prompt-customer-journey.jpg';
import promptProductFable from '@/assets/about/prompt-product-fable.jpg';
import promptNeighbourhoodHistory from '@/assets/about/prompt-neighbourhood-history.jpg';
import promptTrainingScenario from '@/assets/about/prompt-training-scenario.jpg';
import promptFamilyRecipes from '@/assets/about/prompt-family-recipes.jpg';

type EraStep = {
  era: string;
  who: string;
  image: string;
};

const storytellingEras: EraStep[] = [
  { era: 'Oral & Cave Art', who: 'Anyone with a voice', image: eraCaveArt },
  { era: 'Print', who: 'Anyone with a press', image: eraPrint },
  { era: 'Film & Video', who: 'Only those with crews, gear and budgets', image: eraFilm },
  { era: 'AI Video', who: 'Anyone with imagination', image: eraAiVideo },
];

const beliefs = [
  {
    number: '01',
    text: 'Human creativity leads. AI handles the brushwork.',
    icon: PenTool,
  },
  {
    number: '02',
    text: "The hardest part was never the making - it's the story.",
    icon: Sparkles,
  },
  {
    number: '03',
    text: 'Emotion is the point. Technology is the path.',
    icon: Heart,
  },
  {
    number: '04',
    text: 'Great storytelling is a universal language - it makes strangers into friends.',
    icon: Globe2,
  },
];

type Audience = {
  title: string;
  description: string;
  image: string;
};

const audiences: Audience[] = [
  {
    title: 'Museums & Heritage',
    description: 'Bring history to life and preserve stories for future generations.',
    image: audienceMuseumsHeritage,
  },
  {
    title: 'Brands & Marketing',
    description: 'Turn products and messages into stories that people remember.',
    image: audienceBrandsMarketing,
  },
  {
    title: 'Tourism & Destinations',
    description: 'Create memorable journeys and emotional moments for visitors.',
    image: audienceTourismDestinations,
  },
  {
    title: 'Families & Educators',
    description: 'Share personal stories, teach values, and inspire the next generation.',
    image: audienceFamiliesEducators,
  },
];

type Exploration = {
  org: string;
  exploring: string;
  whyItWorks: string;
  image: string;
};

const explorations: Exploration[] = [
  {
    org: 'A local museum',
    exploring:
      "Retelling the lives of Singapore's early immigrants — stories with no footage, because cameras weren't there.",
    whyItWorks: "You can't film the past. AI can reconstruct it.",
    image: explorationMuseum,
  },
  {
    org: 'An asset management firm',
    exploring: 'In-house marketing story videos — turning market views and fund stories into narrative content.',
    whyItWorks: 'Studio-speed content, without agency cost or timelines.',
    image: explorationAssetManagement,
  },
  {
    org: 'A local attraction',
    exploring: 'Holiday greeting videos — CNY, Hari Raya, Deepavali, Christmas, National Day.',
    whyItWorks: 'Show up for every festival, without a production cycle each time.',
    image: explorationAttraction,
  },
];

type StoryPrompt = {
  text: string;
  image: string;
};

const storyPrompts: StoryPrompt[] = [
  {
    text: "Your company's founding story — show how it all began, the vision, the leap of faith.",
    image: promptFoundingStory,
  },
  {
    text: "A customer's journey, dramatised — from challenge to breakthrough, their story, your impact.",
    image: promptCustomerJourney,
  },
  {
    text: "Your product, told as a fable — give it a hero's journey, and let your product save the day.",
    image: promptProductFable,
  },
  {
    text: "Your neighbourhood's history — capture the places, people, and moments that shaped it.",
    image: promptNeighbourhoodHistory,
  },
  {
    text: 'A training scenario, brought to life — make learning memorable with stories that stick.',
    image: promptTrainingScenario,
  },
  {
    text: "Your grandmother's recipes — and where they came from — pass down traditions with the stories behind every dish.",
    image: promptFamilyRecipes,
  },
];

export default function About() {
  const heroReveal = useScrollReveal<HTMLElement>({ threshold: 0.08, rootMargin: '0px 0px -8% 0px' });
  const storyReveal = useScrollReveal<HTMLElement>({ threshold: 0.14 });
  const eraReveal = useScrollReveal<HTMLElement>({ threshold: 0.14 });
  const beliefsReveal = useScrollReveal<HTMLElement>({ threshold: 0.14 });
  const audienceReveal = useScrollReveal<HTMLElement>({ threshold: 0.14 });
  const explorationReveal = useScrollReveal<HTMLElement>({ threshold: 0.14 });
  const promptReveal = useScrollReveal<HTMLElement>({ threshold: 0.14 });
  const missionReveal = useScrollReveal<HTMLElement>({ threshold: 0.14 });

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f4f7ff]">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(180deg,rgba(244,247,255,0.54)_0%,rgba(244,247,255,0.68)_55%,rgba(244,247,255,0.78)_100%)]" />
      <div className="pointer-events-none fixed -top-20 left-1/2 z-0 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-[rgba(138,160,255,0.26)] blur-[130px]" />
      <div className="pointer-events-none fixed bottom-0 right-0 z-0 h-[360px] w-[360px] rounded-full bg-[rgba(180,157,255,0.2)] blur-[120px]" />

      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          {/* Hero */}
          <section
            ref={heroReveal.targetRef}
            className={cn(
              'relative overflow-hidden border-b border-[#dfe5f4] py-14 transition-all duration-700 ease-out md:py-20',
              heroReveal.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
            )}
          >
            <div className="container relative z-10 mx-auto px-4">
              <div className="mx-auto max-w-3xl text-center">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#5a6eff]">About Kakis AI</p>
                <h1 className="text-4xl font-bold tracking-tight text-[#182241] md:text-6xl">
                  Everyone is a storyteller.
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-[#4f5d85] md:text-xl">
                  Kakis is a Singaporean slang term for 'close friends who build things together' — the kind forged
                  over the years, the kind that show up. When kakis gather, they don't just hang out. They look out
                  for each other, lift each other up, and build things together that none of them could alone.
                </p>
                <p className="mt-4 text-base leading-relaxed text-[#6f7895] md:text-lg">
                  That's the community Kakis AI exists to create — one where AI removes production friction, but
                  never replaces imagination. The human story always comes first.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Button
                    size="lg"
                    className="h-12 bg-gradient-to-r from-[#6f7cff] to-[#8977ff] px-7 text-white hover:from-[#6574ff] hover:to-[#7e6dff]"
                    asChild
                  >
                    <a href="https://app.kakis.ai/" target="_blank" rel="noreferrer">
                      Start Creating
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 border-[#d2dbf2] bg-white/90 text-[#4f5d85] hover:border-[#acbcf5] hover:bg-white"
                    asChild
                  >
                    <a href="https://www.fooyo.sg/" target="_blank" rel="noreferrer">
                      Meet Fooyo
                    </a>
                  </Button>
                </div>
              </div>

              <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl border border-[#ffe0b2] shadow-[0_8px_24px_rgba(245,158,11,0.18)]">
                <div className="flex items-center gap-2 bg-gradient-to-r from-[#f59e0b] to-[#f97316] px-4 py-2.5">
                  <Play className="h-4 w-4 fill-white text-white" />
                  <span className="text-sm font-semibold text-white">The Storytelling Journey</span>
                </div>
                <div className="aspect-video">
                  <iframe
                    src="https://www.youtube.com/embed/RDSnf_BM9Ew"
                    title="The Storytelling Journey"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Founder's story */}
          <section
            ref={storyReveal.targetRef}
            className={cn(
              'py-16 transition-all duration-700 ease-out md:py-20',
              storyReveal.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
            )}
          >
            <div className="container mx-auto px-4">
              <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_280px] lg:items-start">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#5a6eff]">Our Story</p>
                <h2 className="text-3xl font-bold text-[#182241] md:text-4xl">Why Shao built Kakis AI</h2>

                <div className="mt-8 space-y-5 text-base leading-relaxed text-[#4f5d85] md:text-lg">
                  <p>
                    As a computer engineering student over 15 years ago, Li Shaohuan — Shao — was struck by
                    something he couldn't quite explain. Watching Pixar, DreamWorks, and Disney bring characters to
                    life on screen, he wasn't just impressed by the technology. He was moved by the emotion. These
                    studios had found a way to make audiences laugh, weep, and feel deeply human things — through
                    entirely animated worlds.
                  </p>

                  <blockquote className="rounded-2xl border border-[#dce6ff] bg-gradient-to-r from-[#eef2ff] to-[#f8faff] px-6 py-5 text-xl font-semibold italic text-[#2f3f7d] md:text-2xl">
                    "How do you make people feel something they'll never forget?"
                  </blockquote>

                  <p>
                    That question stayed with him for over a decade. When multimodal AI began to evolve, a new
                    possibility emerged — not just to admire those studios, but to democratise what they do. What if
                    the tools that once required hundreds of artists and hundreds of millions of dollars could be in
                    the hands of a single storyteller?
                  </p>

                  <p>
                    He tried. Early results were honest — AI wasn't perfect, and human eyes could still catch the
                    seams. But the cost of creation had dropped dramatically, and the trajectory was clear.
                  </p>

                  <p className="font-medium text-[#182241]">
                    The real creative power has always been human. AI is here to handle the brushwork — so humans
                    can focus on what only humans can do: tell stories that make people feel something.
                  </p>

                  <p>
                    Kakis AI exists because that gap is closing. We want storytellers — not just studios — to be
                    ready when it does.
                  </p>
                </div>
              </div>

              <div className="mx-auto w-full max-w-xs lg:sticky lg:top-24">
                <img
                  src={founderShao}
                  alt="Li Shaohuan (Shao), founder of Fooyo and co-creator of Kakis AI, speaking about NUS Computer Engineering, 10+ years in AI & tech, and his mission to put AI to work for everyone"
                  className="w-full rounded-2xl border border-[#dfe5f4] shadow-[0_16px_40px_-20px_rgba(24,34,65,0.35)]"
                />
              </div>
              </div>
            </div>
          </section>

          {/* Oldest human skill, newest tools */}
          <section
            ref={eraReveal.targetRef}
            className={cn(
              'py-16 transition-all duration-700 ease-out md:py-20',
              eraReveal.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
            )}
          >
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-2xl text-center">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#5a6eff]">Why Now</p>
                <h2 className="text-3xl font-bold text-[#182241] md:text-4xl">
                  The oldest human skill, the newest tools
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[#6f7895] md:text-lg">
                  From ancient storytelling to AI-powered creation — the medium evolves, the magic remains.
                </p>
              </div>

              <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {storytellingEras.map((step, index) => (
                  <div
                    key={step.era}
                    className={cn(
                      'overflow-hidden rounded-2xl border border-[#dfe5f4] bg-white/90 text-center shadow-[0_8px_24px_rgba(24,34,65,0.06)] transition-all duration-700',
                      eraReveal.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
                      index === storytellingEras.length - 1 && 'border-[#c6d4ff] bg-gradient-to-b from-[#f0f4ff] to-white ring-1 ring-[#d2ddff]',
                    )}
                    style={{ transitionDelay: `${index * 80}ms` }}
                  >
                    <img src={step.image} alt={step.era} className="aspect-square w-full object-cover" />
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-[#182241]">{step.era}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#6f7895]">{step.who}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mx-auto mt-10 flex max-w-3xl items-start gap-3 rounded-2xl border border-[#dce6ff] bg-gradient-to-r from-[#eef2ff] to-[#f8faff] p-6">
                <Quote className="mt-1 h-5 w-5 shrink-0 text-[#5368ff]" aria-hidden="true" />
                <p className="text-base leading-relaxed text-[#3f4f7e] md:text-lg">
                  For 100 years, video storytelling belonged to those who could produce. Now it belongs to those who
                  can imagine.
                </p>
              </div>
            </div>
          </section>

          {/* What we believe */}
          <section
            ref={beliefsReveal.targetRef}
            className={cn(
              'relative overflow-hidden py-16 transition-all duration-700 ease-out md:py-20',
              beliefsReveal.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
            )}
          >
            <div className="absolute inset-0 bg-[#182241]" />
            <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-[rgba(130,151,255,0.28)] blur-[80px]" />
            <div className="pointer-events-none absolute -right-12 bottom-0 h-64 w-64 rounded-full bg-[rgba(145,126,255,0.2)] blur-[90px]" />

            <div className="container relative z-10 mx-auto px-4">
              <div className="mx-auto max-w-5xl">
                <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-[#a9b5ea]">Our North Star</p>
                <h2 className="mt-3 text-center text-3xl font-bold text-white md:text-4xl">What We Believe About Storytelling</h2>
                <div className="mt-10 grid gap-4 md:grid-cols-2">
                  {beliefs.map((belief, index) => (
                    <div
                      key={belief.number}
                      className={cn(
                        'rounded-2xl border border-[rgba(183,197,255,0.2)] bg-[rgba(17,24,46,0.68)] p-6 backdrop-blur-sm transition-all duration-700',
                        beliefsReveal.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
                      )}
                      style={{ transitionDelay: `${index * 80}ms` }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a9b5ea]">{belief.number}</span>
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[rgba(83,104,255,0.18)] text-[#bcc8ff]">
                          <belief.icon className="h-4 w-4" />
                        </div>
                      </div>
                      <p className="mt-4 text-lg leading-relaxed text-[#f3f6ff]">{belief.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Who it's for */}
          <section
            ref={audienceReveal.targetRef}
            className={cn(
              'py-16 transition-all duration-700 ease-out md:py-20',
              audienceReveal.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
            )}
          >
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-2xl text-center">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#5a6eff]">Who It's For</p>
                <h2 className="text-3xl font-bold text-[#182241] md:text-4xl">You're not "non-video people."</h2>
                <p className="mt-4 text-base leading-relaxed text-[#6f7895] md:text-lg">
                  You're storytellers who lacked a camera crew.
                </p>
              </div>

              <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {audiences.map((audience, index) => (
                  <div
                    key={audience.title}
                    className={cn(
                      'overflow-hidden rounded-2xl border border-[#dfe5f4] bg-white/90 shadow-[0_8px_24px_rgba(24,34,65,0.06)] transition-all duration-700',
                      audienceReveal.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
                    )}
                    style={{ transitionDelay: `${index * 80}ms` }}
                  >
                    <img src={audience.image} alt={audience.title} className="aspect-[4/3] w-full object-cover" />
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-[#182241]">{audience.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#6f7895]">{audience.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Early explorations */}
          <section
            ref={explorationReveal.targetRef}
            className={cn(
              'relative overflow-hidden py-16 transition-all duration-700 ease-out md:py-20',
              explorationReveal.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
            )}
          >
            <div className="absolute inset-0 bg-[#182241]" />
            <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-[rgba(130,151,255,0.28)] blur-[80px]" />
            <div className="pointer-events-none absolute -right-12 bottom-0 h-64 w-64 rounded-full bg-[rgba(145,126,255,0.2)] blur-[90px]" />

            <div className="container relative z-10 mx-auto px-4">
              <div className="mx-auto max-w-2xl text-center">
                <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[rgba(183,197,255,0.3)] bg-[rgba(17,24,46,0.5)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#a9b5ea]">
                  <Sparkles className="h-3.5 w-3.5" />
                  In Progress
                </p>
                <h2 className="text-3xl font-bold text-white md:text-4xl">Early Explorations in Singapore</h2>
                <p className="mt-4 text-base leading-relaxed text-[#b7c1ea] md:text-lg">
                  Different industries. Zero video backgrounds. Same unlock.
                </p>
              </div>

              <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
                {explorations.map((item, index) => (
                  <div
                    key={item.org}
                    className={cn(
                      'overflow-hidden rounded-2xl border border-[rgba(183,197,255,0.2)] bg-[rgba(17,24,46,0.68)] backdrop-blur-sm transition-all duration-700',
                      explorationReveal.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
                    )}
                    style={{ transitionDelay: `${index * 90}ms` }}
                  >
                    <img src={item.image} alt={item.org} className="aspect-video w-full object-cover" />
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-white">{item.org}</h3>
                      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#8f9bd6]">Exploring</p>
                      <p className="mt-1 text-sm leading-relaxed text-[#dbe1ff]">{item.exploring}</p>
                      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#8f9bd6]">
                        Why it works
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-[#dbe1ff]">{item.whyItWorks}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* What could you tell */}
          <section
            ref={promptReveal.targetRef}
            className={cn(
              'py-16 transition-all duration-700 ease-out md:py-20',
              promptReveal.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
            )}
          >
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-2xl text-center">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#5a6eff]">Get Inspired</p>
                <h2 className="text-3xl font-bold text-[#182241] md:text-4xl">What could you tell?</h2>
                <p className="mt-4 text-base leading-relaxed text-[#6f7895] md:text-lg">
                  Turn real moments and ideas into stories that connect and inspire.
                </p>
              </div>

              <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {storyPrompts.map((prompt, index) => (
                  <div
                    key={prompt.text}
                    className={cn(
                      'overflow-hidden rounded-2xl border border-[#dfe5f4] bg-white/85 transition-all duration-700 hover:border-[#9aa7ff] hover:bg-white',
                      promptReveal.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
                    )}
                    style={{ transitionDelay: `${index * 60}ms` }}
                  >
                    <div className="relative">
                      <img src={prompt.image} alt="" className="aspect-square w-full object-cover" />
                      <span className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-sm font-bold text-[#5368ff] shadow-sm">
                        {index + 1}
                      </span>
                    </div>
                    <p className="p-4 text-sm leading-relaxed text-[#42517d] md:text-base">{prompt.text}</p>
                  </div>
                ))}
              </div>

              <div className="mx-auto mt-10 max-w-3xl">
                <PromoBanner />
              </div>
            </div>
          </section>

          {/* Mission + Fooyo + Work with us */}
          <section
            ref={missionReveal.targetRef}
            className={cn(
              'py-16 transition-all duration-700 ease-out md:py-20',
              missionReveal.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
            )}
          >
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-6xl rounded-3xl border border-[#dfe5f4] bg-white/90 p-8 shadow-[0_12px_28px_rgba(24,34,65,0.08)] backdrop-blur-sm md:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#5a6eff]">Our Mission</p>
                <h2 className="mt-3 text-3xl font-bold text-[#182241] md:text-4xl">Help storytellers move people, not just pixels.</h2>
                <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#4f5d85] md:text-lg">
                  Kakis AI is built by{' '}
                  <a
                    href="https://www.fooyo.sg/"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-[#5368ff] hover:underline"
                  >
                    Fooyo
                  </a>
                  , a Singapore-based digital transformation studio founded in 2014 by Li Shaohuan (Shao). We are
                  building a creative community where anyone can tell cinematic stories with AI as a partner, not a
                  replacement. Human imagination drives the direction. Kakis AI helps with the production lift.
                </p>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#6f7895] md:text-lg">
                  When artists, founders, educators, and dreamers work side by side as kakis, storytelling becomes
                  more inclusive, more global, and more human.
                </p>
                <div className="mt-6 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { value: '2014', label: 'Founded' },
                    { value: '140+', label: 'Clients' },
                    { value: '12', label: 'Industries' },
                    { value: '7', label: 'Countries' },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl border border-[#dce6ff] bg-[#f5f8ff] px-3 py-3 text-center"
                    >
                      <p className="text-xl font-bold text-[#182241] md:text-2xl">{stat.value}</p>
                      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#6c7aa8]">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-10 grid gap-6 border-t border-[#dfe5f4] pt-10 lg:grid-cols-2">
                  <div>
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-[#e8edff] text-[#5368ff]">
                      <Handshake className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#182241]">For Organisations</h3>
                    <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[#4f5d85] md:text-base">
                      <li>Pilot story-to-video projects for your brand, exhibit, or campaign.</li>
                      <li>Ongoing content partnerships — marketing calendars, seasonal campaigns.</li>
                      <li>Co-creation with museums, schools, and tourism institutions.</li>
                    </ul>
                  </div>

                  <div className="rounded-2xl bg-gradient-to-br from-[#ebf1ff] to-[#f8faff] p-6">
                    <h3 className="text-xl font-semibold text-[#182241]">For Creators & Collaborators</h3>
                    <p className="mt-4 text-sm leading-relaxed text-[#4f5d85] md:text-base">
                      Organisations have the stories. You have the skills. We have the platform. Fooyo connects
                      creators with organisations that need them — and we're open to investors and educators too who
                      believe storytelling should belong to everyone.
                    </p>
                    <a
                      href="mailto:shao@fooyo.sg"
                      className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#6f7cff] to-[#8977ff] px-5 py-2.5 text-sm font-semibold text-white hover:from-[#6574ff] hover:to-[#7e6dff]"
                    >
                      <Mail className="h-4 w-4" />
                      shao@fooyo.sg
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
