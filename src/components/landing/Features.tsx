import { 
  FileText, 
  Image, 
  ListChecks, 
  Film, 
  Download, 
  Share2,
  Wand2,
  Layers
} from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: 'Script Upload & Parsing',
    description: 'Upload your script and let AI automatically break it down into scenes, characters, and locations.',
  },
  {
    icon: Wand2,
    title: 'AI Storyboard Generation',
    description: 'Generate stunning visual frames from scene descriptions. Choose from multiple artistic styles.',
  },
  {
    icon: Layers,
    title: 'Storyboard Canvas',
    description: 'Arrange and edit your frames on a visual canvas. Add notes, camera directions, and dialogue.',
  },
  {
    icon: ListChecks,
    title: 'Shot List Builder',
    description: 'Auto-generate professional shot lists with camera angles, lens choices, and movements.',
  },
  {
    icon: Film,
    title: 'Image-to-Video Animatics',
    description: 'Transform storyboards into animated sequences with timing control and transitions.',
  },
  {
    icon: Download,
    title: 'Export Everything',
    description: 'Download PDFs, images, videos, and spreadsheets. Share with your team instantly.',
  },
];

export function Features() {
  return (
    <section className="border-t bg-background py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Everything You Need to Visualize Your Story
          </h2>
          <p className="text-lg text-muted-foreground">
            From script to screen-ready storyboard in one seamless workflow.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-xl border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
