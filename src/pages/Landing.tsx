import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { Testimonials } from '@/components/landing/Testimonials';
import { Pricing } from '@/components/landing/Pricing';
import { CTA } from '@/components/landing/CTA';

export default function Landing() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <section id="features">
          <Features />
        </section>
        <Testimonials />
        <section id="pricing">
          <Pricing />
        </section>
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
