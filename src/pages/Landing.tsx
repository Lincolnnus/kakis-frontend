import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/landing/Hero';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { ShowcaseVideos } from '@/components/landing/ShowcaseVideos';
import { Features } from '@/components/landing/Features';
import { CTA } from '@/components/landing/CTA';
import { Partners } from '@/components/landing/Partners';
import { ChallengeAward } from '@/components/landing/ChallengeAward';
import { UseCasesTeaser } from '@/components/landing/UseCasesTeaser';
import { Wan3LaunchBanner } from '@/components/landing/Wan3LaunchBanner';

export default function Landing() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f4f7ff]">
      <Header />
      <main className="flex-1">
        <Wan3LaunchBanner />
        <Hero />
        <HowItWorks />
        <ShowcaseVideos />
        <section id="features">
          <Features />
        </section>
        <UseCasesTeaser />
        <Partners />
        <ChallengeAward />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
