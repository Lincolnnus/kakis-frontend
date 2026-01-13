import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Palette, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface VisualStyle {
  id: string;
  name: string;
  description: string;
  preview: string; // gradient/pattern for demo
  tags: string[];
}

const VISUAL_STYLES: VisualStyle[] = [
  {
    id: 'anime',
    name: 'Anime',
    description: 'Japanese animation style with expressive characters',
    preview: 'bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600',
    tags: ['Stylized', 'Expressive']
  },
  {
    id: 'pixar',
    name: 'Pixar 3D',
    description: 'Polished 3D animation with warm lighting',
    preview: 'bg-gradient-to-br from-orange-400 via-amber-500 to-yellow-500',
    tags: ['3D', 'Family-Friendly']
  },
  {
    id: 'ghibli',
    name: 'Studio Ghibli',
    description: 'Whimsical hand-painted watercolor aesthetic',
    preview: 'bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500',
    tags: ['Painterly', 'Dreamy']
  },
  {
    id: 'comic',
    name: 'Comic Book',
    description: 'Bold lines, halftone dots, and vibrant colors',
    preview: 'bg-gradient-to-br from-red-500 via-yellow-400 to-blue-500',
    tags: ['Bold', 'Action']
  },
  {
    id: 'realistic',
    name: 'Photorealistic',
    description: 'Hyper-realistic CGI with lifelike details',
    preview: 'bg-gradient-to-br from-slate-600 via-gray-500 to-zinc-600',
    tags: ['Realistic', 'Cinematic']
  },
  {
    id: 'hybrid',
    name: 'Hybrid (Cartoon + Live)',
    description: 'Mix of cartoon characters in real environments',
    preview: 'bg-gradient-to-br from-violet-500 via-fuchsia-400 to-rose-400',
    tags: ['Mixed Media', 'Creative']
  },
  {
    id: 'watercolor',
    name: 'Watercolor',
    description: 'Soft, flowing painted aesthetic',
    preview: 'bg-gradient-to-br from-sky-300 via-blue-400 to-indigo-400',
    tags: ['Artistic', 'Soft']
  },
  {
    id: 'noir',
    name: 'Film Noir',
    description: 'High contrast black & white with dramatic shadows',
    preview: 'bg-gradient-to-br from-gray-900 via-gray-700 to-gray-500',
    tags: ['Dramatic', 'Classic']
  }
];

interface StyleSelectorProps {
  selectedStyle: string | null;
  onStyleSelect: (styleId: string) => void;
}

export function StyleSelector({ selectedStyle, onStyleSelect }: StyleSelectorProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Palette className="h-5 w-5" />
          Visual Style
        </CardTitle>
        <CardDescription>
          Choose an art style for your storyboard frames
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {VISUAL_STYLES.map((style) => (
            <button
              key={style.id}
              onClick={() => onStyleSelect(style.id)}
              className={cn(
                'group relative flex flex-col overflow-hidden rounded-lg border-2 transition-all hover:scale-[1.02]',
                selectedStyle === style.id
                  ? 'border-primary ring-2 ring-primary/20'
                  : 'border-transparent hover:border-muted-foreground/30'
              )}
            >
              {/* Preview */}
              <div className={cn('h-20 w-full', style.preview)}>
                {selectedStyle === style.id && (
                  <div className="flex h-full items-center justify-center bg-black/20">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                )}
              </div>
              
              {/* Info */}
              <div className="bg-card p-2 text-left">
                <p className="text-sm font-medium">{style.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                  {style.description}
                </p>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {style.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export { VISUAL_STYLES };
