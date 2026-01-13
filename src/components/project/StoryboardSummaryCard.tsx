import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useProject } from '@/contexts/ProjectContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Image, 
  Layers, 
  ArrowRight,
  Sparkles,
  Grid3X3,
  Loader2
} from 'lucide-react';
import { Scene, StoryboardFrame } from '@/types';

interface StoryboardSummaryCardProps {
  projectId: string;
  scenes: Scene[];
  frames: StoryboardFrame[];
}

export function StoryboardSummaryCard({ projectId, scenes, frames }: StoryboardSummaryCardProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState({ current: 0, total: 0 });
  const { addFrame, updateFrame } = useProject();
  const { toast } = useToast();

  const totalScenes = scenes.length;
  const totalFrames = frames.length;
  
  // Calculate scenes with frames
  const scenesWithFrames = new Set(frames.map(f => f.sceneId)).size;
  const sceneCoverage = totalScenes > 0 ? Math.round((scenesWithFrames / totalScenes) * 100) : 0;
  
  // Calculate frames by style
  const framesByStyle = frames.reduce((acc, f) => {
    acc[f.style] = (acc[f.style] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const hasScenes = totalScenes > 0;
  const hasFrames = totalFrames > 0;

  const generateFrameImage = async (
    scene: Scene, 
    frameDescription: string,
    cameraAngle: string,
    style: string
  ): Promise<string | null> => {
    try {
      const { data, error } = await supabase.functions.invoke('generate-storyboard-frame', {
        body: {
          sceneDescription: `${scene.heading}: ${frameDescription}`,
          style,
          cameraAngle,
          lighting: scene.lighting || 'natural lighting',
          characters: scene.characters || [],
        },
      });

      if (error) throw error;
      return data?.imageUrl || null;
    } catch (error) {
      console.error('Error generating frame image:', error);
      return null;
    }
  };

  const handleGenerateStoryboard = async () => {
    if (!hasScenes) return;
    
    setIsGenerating(true);
    
    // Calculate total frames to generate
    const totalToGenerate = scenes.length * 2; // 2 frames per scene
    setGenerationProgress({ current: 0, total: totalToGenerate });
    
    toast({ 
      title: 'Generating storyboard with AI...', 
      description: `Creating ${totalToGenerate} frames with AI-generated images.` 
    });

    let frameNumber = 1;
    let generatedCount = 0;

    for (const scene of scenes) {
      const framesPerScene = 2; // Generate 2 frames per scene
      const cameraAngles = ['wide', 'medium', 'close-up'];
      
      for (let i = 0; i < framesPerScene; i++) {
        const cameraAngle = cameraAngles[i % cameraAngles.length];
        const frameDesc = i === 0 
          ? `Establishing shot: ${scene.description?.slice(0, 150) || 'Scene overview'}`
          : `Action shot: ${scene.dialogue?.[0]?.text || scene.description?.slice(0, 150) || 'Character moment'}`;
        
        // Create the frame first with a generating state
        const newFrame = addFrame({
          sceneId: scene.id,
          frameNumber: frameNumber++,
          imageUrl: undefined,
          description: frameDesc,
          duration: 3,
          cameraAngle,
          cameraMovement: 'static',
          notes: '',
          style: 'anime',
          isGenerating: true,
        });

        // Generate the AI image
        const imageUrl = await generateFrameImage(scene, frameDesc, cameraAngle, 'anime');
        
        // Update the frame with the generated image
        updateFrame(newFrame.id, {
          imageUrl: imageUrl || '/placeholder.svg',
          isGenerating: false,
        });

        generatedCount++;
        setGenerationProgress({ current: generatedCount, total: totalToGenerate });
      }
    }

    setIsGenerating(false);
    setGenerationProgress({ current: 0, total: 0 });
    toast({ 
      title: 'Storyboard generated!', 
      description: `Created ${generatedCount} AI-generated frames for ${totalScenes} scenes.` 
    });
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Main Stats Card */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="h-5 w-5" />
            Storyboard Overview
          </CardTitle>
          <CardDescription>
            Visual frames representing each shot in your production
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-lg border bg-muted/50 p-4 text-center">
              <Image className="mx-auto mb-2 h-6 w-6 text-primary" />
              <p className="text-2xl font-bold">{totalFrames}</p>
              <p className="text-xs text-muted-foreground">Total Frames</p>
            </div>
            <div className="rounded-lg border bg-muted/50 p-4 text-center">
              <Layers className="mx-auto mb-2 h-6 w-6 text-primary" />
              <p className="text-2xl font-bold">{scenesWithFrames}</p>
              <p className="text-xs text-muted-foreground">Scenes Covered</p>
            </div>
            <div className="rounded-lg border bg-muted/50 p-4 text-center">
              <Grid3X3 className="mx-auto mb-2 h-6 w-6 text-primary" />
              <p className="text-2xl font-bold">
                {totalScenes > 0 ? (totalFrames / totalScenes).toFixed(1) : '0'}
              </p>
              <p className="text-xs text-muted-foreground">Avg Frames/Scene</p>
            </div>
            <div className="rounded-lg border bg-muted/50 p-4 text-center">
              <Sparkles className="mx-auto mb-2 h-6 w-6 text-primary" />
              <p className="text-2xl font-bold">{frames.filter(f => f.isGenerating).length}</p>
              <p className="text-xs text-muted-foreground">Generating</p>
            </div>
          </div>

          {/* Generation Progress */}
          {isGenerating && generationProgress.total > 0 && (
            <div className="space-y-2 rounded-lg border border-primary/20 bg-primary/5 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 font-medium text-primary">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating AI Images...
                </span>
                <span className="font-medium">
                  {generationProgress.current} / {generationProgress.total}
                </span>
              </div>
              <Progress 
                value={(generationProgress.current / generationProgress.total) * 100} 
                className="h-2" 
              />
              <p className="text-xs text-muted-foreground">
                Each frame is being generated with AI. This may take a moment.
              </p>
            </div>
          )}

          {/* Scene Coverage */}
          {hasScenes && !isGenerating && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Scene Coverage</span>
                <span className="font-medium">{sceneCoverage}%</span>
              </div>
              <Progress value={sceneCoverage} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {scenesWithFrames} of {totalScenes} scenes have storyboard frames
              </p>
            </div>
          )}

          {/* Frame Styles */}
          {hasFrames && Object.keys(framesByStyle).length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Frame Styles</h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(framesByStyle).map(([style, count]) => (
                  <div 
                    key={style}
                    className="rounded-full border bg-muted/50 px-3 py-1 text-xs"
                  >
                    <span className="capitalize">{style}</span>
                    <span className="ml-1 text-muted-foreground">({count})</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            {hasFrames && (
              <Button asChild>
                <Link to={`/project/${projectId}/storyboard`}>
                  Open Storyboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
            {hasScenes && !hasFrames && (
              <Button 
                onClick={handleGenerateStoryboard} 
                disabled={isGenerating}
                className="gradient-primary"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Frames...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Storyboard
                  </>
                )}
              </Button>
            )}
            {hasScenes && hasFrames && (
              <Button 
                variant="outline" 
                onClick={handleGenerateStoryboard} 
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Regenerating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Regenerate All
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Requirements Card */}
      {!hasScenes && (
        <Card className="md:col-span-2 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Layers className="mb-4 h-12 w-12 text-muted-foreground/50" />
            <h3 className="mb-2 text-lg font-medium">Create Scenes First</h3>
            <p className="mb-4 max-w-md text-muted-foreground">
              Go to the Home tab to input your script and automatically generate scenes, then come back to create storyboard frames.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
