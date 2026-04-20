import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { CTA } from '@/components/landing/CTA';
import { Partners } from '@/components/landing/Partners';
import { UpcomingEvent } from '@/components/landing/UpcomingEvent';

export default function Landing() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f4f7ff]">
      <Header />
      <main className="flex-1">
        <Hero />
        <UpcomingEvent />
        <Partners />
        <section id="features">
          <Features />
        </section>
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
