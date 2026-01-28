import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Users, Sparkles, Globe } from 'lucide-react';

export default function About() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-background py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              About <span className="text-primary">Kakis AI</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Where creativity meets friendship, and animations come to life.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl space-y-8">
              <div className="text-center">
                <h2 className="mb-4 text-3xl font-bold">The Meaning Behind Kakis</h2>
                <div className="mx-auto h-1 w-20 rounded-full bg-primary" />
              </div>
              
              <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                <p>
                  <strong className="text-foreground">Kakis (柿)</strong> is the persimmon—a sweet, vibrant orange fruit native to Asia, 
                  cherished for its rich flavor and warm color. Just like this beloved fruit, we believe creativity 
                  should be sweet, nourishing, and bring joy to everyone it touches.
                </p>
                <p>
                  But there's another meaning that's close to our hearts. In Singapore, 
                  <strong className="text-foreground"> "kakis"</strong> means <strong className="text-foreground">"close friends"</strong>—the 
                  kind of companions who support each other through thick and thin, celebrate each other's wins, 
                  and create magic together.
                </p>
                <p>
                  This dual meaning perfectly captures our mission: to build a warm, supportive community where 
                  animators can collaborate as friends, share their creativity, and produce amazing animations 
                  that inspire the world.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-muted/50 py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold">Our Values</h2>
              <p className="text-muted-foreground">What drives us every day</p>
            </div>
            
            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
              <Card className="border-none bg-background shadow-md">
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold">Community First</h3>
                    <p className="text-sm text-muted-foreground">
                      We believe the best work comes from collaboration. Our platform is built to foster 
                      genuine connections between creators.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none bg-background shadow-md">
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold">AI-Powered Creativity</h3>
                    <p className="text-sm text-muted-foreground">
                      We harness the power of AI to amplify human creativity, not replace it. 
                      Our tools help you bring your vision to life faster.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none bg-background shadow-md">
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold">Passion for Animation</h3>
                    <p className="text-sm text-muted-foreground">
                      We're animators at heart. Every feature we build is designed with the 
                      creative process in mind.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none bg-background shadow-md">
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold">Global Impact</h3>
                    <p className="text-sm text-muted-foreground">
                      We're on a mission to democratize animation, making professional tools 
                      accessible to creators everywhere.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 p-8 text-center md:p-12">
              <h2 className="mb-4 text-2xl font-bold md:text-3xl">Our Mission</h2>
              <p className="text-lg text-muted-foreground">
                To create a community where animators can work together as friends—as <em>kakis</em>—to 
                produce great animations for the world. We believe that when talented people collaborate 
                in a supportive environment, extraordinary things happen.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
