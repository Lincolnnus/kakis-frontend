import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Image, 
  Layers, 
  ArrowRight,
  Sparkles,
  Grid3X3
} from 'lucide-react';
import { Scene, StoryboardFrame } from '@/types';

interface StoryboardSummaryCardProps {
  projectId: string;
  scenes: Scene[];
  frames: StoryboardFrame[];
}

export function StoryboardSummaryCard({ projectId, scenes, frames }: StoryboardSummaryCardProps) {
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

          {/* Scene Coverage */}
          {hasScenes && (
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
            <Button asChild>
              <Link to={`/project/${projectId}/storyboard`}>
                Open Storyboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            {hasScenes && !hasFrames && (
              <Button variant="outline" className="gap-2">
                <Sparkles className="h-4 w-4" />
                Auto-Generate Frames
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
            <h3 className="mb-2 text-lg font-medium">Parse Your Script First</h3>
            <p className="mb-4 max-w-md text-muted-foreground">
              Import your screenplay to extract scenes, then generate storyboard frames for each scene.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
