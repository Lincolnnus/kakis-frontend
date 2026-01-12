import { useState } from 'react';
import { StoryboardFrame, FrameStyle, Scene } from '@/types';
import { FrameCard } from './FrameCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Plus, 
  Wand2, 
  Loader2, 
  Grid3X3, 
  LayoutList,
  Layers,
  Download
} from 'lucide-react';
import { generateId } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

interface StoryboardCanvasProps {
  frames: StoryboardFrame[];
  scenes: Scene[];
  projectId: string;
  onAddFrame: (frame: Omit<StoryboardFrame, 'id'>) => void;
  onUpdateFrame: (id: string, updates: Partial<StoryboardFrame>) => void;
  onDeleteFrame: (id: string) => void;
}

// Mock image URLs for demo (placeholder images)
const MOCK_IMAGES = [
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=450&fit=crop',
  'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800&h=450&fit=crop',
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=450&fit=crop',
  'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&h=450&fit=crop',
  'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&h=450&fit=crop',
  'https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?w=800&h=450&fit=crop',
];

export function StoryboardCanvas({ 
  frames, 
  scenes, 
  projectId, 
  onAddFrame, 
  onUpdateFrame, 
  onDeleteFrame 
}: StoryboardCanvasProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [globalStyle, setGlobalStyle] = useState<FrameStyle>('illustrated');
  const [isGeneratingAll, setIsGeneratingAll] = useState(false);
  const { toast } = useToast();

  const sortedFrames = [...frames].sort((a, b) => a.frameNumber - b.frameNumber);

  // Mock image generation
  const generateImage = async (frameId: string, _prompt: string, _style: FrameStyle): Promise<void> => {
    onUpdateFrame(frameId, { isGenerating: true });
    
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
    
    // Use a random mock image
    const mockImage = MOCK_IMAGES[Math.floor(Math.random() * MOCK_IMAGES.length)];
    
    onUpdateFrame(frameId, { 
      imageUrl: mockImage,
      isGenerating: false 
    });

    toast({
      title: 'Frame generated!',
      description: 'AI has created your storyboard frame.',
    });
  };

  const generateAllFrames = async () => {
    const framesWithoutImages = sortedFrames.filter(f => !f.imageUrl);
    if (framesWithoutImages.length === 0) {
      toast({
        title: 'All frames generated',
        description: 'All frames already have images.',
      });
      return;
    }

    setIsGeneratingAll(true);
    
    for (const frame of framesWithoutImages) {
      await generateImage(frame.id, frame.description, globalStyle);
    }

    setIsGeneratingAll(false);
    toast({
      title: 'Batch generation complete!',
      description: `Generated ${framesWithoutImages.length} frames.`,
    });
  };

  const addNewFrame = (sceneId?: string) => {
    const newFrame: Omit<StoryboardFrame, 'id'> = {
      sceneId: sceneId || scenes[0]?.id || '',
      frameNumber: sortedFrames.length + 1,
      description: 'New storyboard frame - add description',
      cameraAngle: 'Medium',
      cameraMovement: 'Static',
      notes: '',
      duration: 2,
      style: globalStyle,
    };
    onAddFrame(newFrame);
  };

  const autoGenerateFromScenes = () => {
    // Create frames from scenes that don't have frames yet
    const scenesWithoutFrames = scenes.filter(
      scene => !frames.some(f => f.sceneId === scene.id)
    );

    scenesWithoutFrames.forEach((scene, index) => {
      const newFrame: Omit<StoryboardFrame, 'id'> = {
        sceneId: scene.id,
        frameNumber: sortedFrames.length + index + 1,
        description: scene.description || `${scene.heading} - ${scene.location}`,
        cameraAngle: 'Wide',
        cameraMovement: 'Static',
        dialogue: scene.dialogue[0]?.text || '',
        notes: `Characters: ${scene.characters.join(', ')}`,
        duration: 3,
        style: globalStyle,
      };
      onAddFrame(newFrame);
    });

    if (scenesWithoutFrames.length > 0) {
      toast({
        title: 'Frames created!',
        description: `Created ${scenesWithoutFrames.length} frames from scenes.`,
      });
    }
  };

  const getSceneForFrame = (frame: StoryboardFrame) => {
    return scenes.find(s => s.id === frame.sceneId);
  };

  if (frames.length === 0 && scenes.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <Layers className="mb-4 h-12 w-12 text-muted-foreground/50" />
          <h3 className="mb-2 text-lg font-medium">No Frames Yet</h3>
          <p className="mb-4 text-center text-muted-foreground">
            Parse a script first or add frames manually
          </p>
          <Button onClick={() => addNewFrame()}>
            <Plus className="mr-2 h-4 w-4" />
            Add First Frame
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-4 rounded-lg border bg-card p-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Style:</span>
          <Select value={globalStyle} onValueChange={(v: FrameStyle) => setGlobalStyle(v)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="realistic">Realistic</SelectItem>
              <SelectItem value="illustrated">Illustrated</SelectItem>
              <SelectItem value="sketch">Sketch</SelectItem>
              <SelectItem value="anime">Anime</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">View:</span>
          <div className="flex rounded-md border">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="sm"
              className="rounded-r-none"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="sm"
              className="rounded-l-none"
              onClick={() => setViewMode('list')}
            >
              <LayoutList className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="ml-auto flex gap-2">
          {scenes.length > 0 && frames.length === 0 && (
            <Button variant="outline" onClick={autoGenerateFromScenes}>
              <Layers className="mr-2 h-4 w-4" />
              Auto-create from Scenes
            </Button>
          )}
          
          <Button
            variant="outline"
            onClick={generateAllFrames}
            disabled={isGeneratingAll}
          >
            {isGeneratingAll ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Generate All
              </>
            )}
          </Button>

          <Button onClick={() => addNewFrame()} className="gradient-primary">
            <Plus className="mr-2 h-4 w-4" />
            Add Frame
          </Button>
        </div>
      </div>

      {/* Frames Grid/List */}
      <div className={
        viewMode === 'grid'
          ? 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          : 'space-y-4'
      }>
        {sortedFrames.map((frame) => (
          <FrameCard
            key={frame.id}
            frame={frame}
            onUpdate={onUpdateFrame}
            onDelete={onDeleteFrame}
            onGenerate={generateImage}
            sceneHeading={getSceneForFrame(frame)?.heading}
          />
        ))}
      </div>

      {/* Summary */}
      <div className="flex items-center justify-between rounded-lg border bg-muted/50 p-4 text-sm">
        <span className="text-muted-foreground">
          {sortedFrames.length} frames • {sortedFrames.filter(f => f.imageUrl).length} generated
        </span>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export Storyboard
        </Button>
      </div>
    </div>
  );
}
