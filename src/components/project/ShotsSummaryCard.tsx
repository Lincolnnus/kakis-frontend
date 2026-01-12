import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  ListChecks, 
  Camera, 
  Volume2, 
  Music, 
  ArrowRight,
  Sparkles,
  ImageIcon
} from 'lucide-react';
import { Shot, StoryboardFrame } from '@/types';

interface ShotsSummaryCardProps {
  projectId: string;
  shots: Shot[];
  frames: StoryboardFrame[];
  sceneCount: number;
}

export function ShotsSummaryCard({ projectId, shots, frames, sceneCount }: ShotsSummaryCardProps) {
  const totalShots = shots.length;
  const framesWithShots = new Set(shots.map(s => s.frameId).filter(Boolean)).size;
  const frameCoverage = frames.length > 0 ? Math.round((framesWithShots / frames.length) * 100) : 0;
  
  // Mock audio stats
  const shotsWithDialogue = Math.floor(totalShots * 0.7);
  const shotsWithMusic = Math.floor(totalShots * 0.5);
  const shotsWithSfx = Math.floor(totalShots * 0.4);

  const hasFrames = frames.length > 0;
  const hasShots = totalShots > 0;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Main Stats Card */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ListChecks className="h-5 w-5" />
            Shot List Overview
          </CardTitle>
          <CardDescription>
            Manage camera angles, movements, and audio for your production
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-lg border bg-muted/50 p-4 text-center">
              <Camera className="mx-auto mb-2 h-6 w-6 text-primary" />
              <p className="text-2xl font-bold">{totalShots}</p>
              <p className="text-xs text-muted-foreground">Total Shots</p>
            </div>
            <div className="rounded-lg border bg-muted/50 p-4 text-center">
              <ImageIcon className="mx-auto mb-2 h-6 w-6 text-primary" />
              <p className="text-2xl font-bold">{frames.length}</p>
              <p className="text-xs text-muted-foreground">Storyboard Frames</p>
            </div>
            <div className="rounded-lg border bg-muted/50 p-4 text-center">
              <Volume2 className="mx-auto mb-2 h-6 w-6 text-primary" />
              <p className="text-2xl font-bold">{shotsWithDialogue}</p>
              <p className="text-xs text-muted-foreground">With Dialogue</p>
            </div>
            <div className="rounded-lg border bg-muted/50 p-4 text-center">
              <Music className="mx-auto mb-2 h-6 w-6 text-primary" />
              <p className="text-2xl font-bold">{shotsWithMusic}</p>
              <p className="text-xs text-muted-foreground">With Music</p>
            </div>
          </div>

          {/* Frame Coverage */}
          {hasFrames && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Frame Coverage</span>
                <span className="font-medium">{frameCoverage}%</span>
              </div>
              <Progress value={frameCoverage} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {framesWithShots} of {frames.length} frames have shots assigned
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link to={`/project/${projectId}/shots`}>
                Open Shot List
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            {!hasShots && hasFrames && (
              <Button variant="outline" className="gap-2">
                <Sparkles className="h-4 w-4" />
                Auto-Generate Shots
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Requirements Card */}
      {!hasFrames && (
        <Card className="md:col-span-2 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <ImageIcon className="mb-4 h-12 w-12 text-muted-foreground/50" />
            <h3 className="mb-2 text-lg font-medium">Create Storyboard Frames First</h3>
            <p className="mb-4 max-w-md text-muted-foreground">
              Generate storyboard frames from your scenes to start building your shot list with visual references.
            </p>
            <Button variant="outline" asChild>
              <Link to={`/project/${projectId}/storyboard`}>
                Go to Storyboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
