import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Film, 
  Clock, 
  Volume2, 
  Music, 
  Mic,
  ArrowRight,
  Play,
  Download,
  ImageIcon
} from 'lucide-react';
import { StoryboardFrame } from '@/types';

interface AnimaticSummaryCardProps {
  projectId: string;
  frames: StoryboardFrame[];
  sceneCount: number;
}

export function AnimaticSummaryCard({ projectId, frames, sceneCount }: AnimaticSummaryCardProps) {
  const totalFrames = frames.length;
  const totalDuration = frames.reduce((sum, f) => sum + (f.duration || 3), 0);
  const formattedDuration = `${Math.floor(totalDuration / 60)}:${(totalDuration % 60).toString().padStart(2, '0')}`;
  
  // Mock audio track stats
  const audioTracks = {
    dialogue: totalFrames > 0 ? Math.floor(totalFrames * 0.6) : 0,
    music: totalFrames > 0 ? 1 : 0, // 1 background track
    sfx: totalFrames > 0 ? Math.floor(totalFrames * 0.3) : 0,
  };

  const hasFrames = totalFrames > 0;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Main Stats Card */}
      <Card className="md:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Film className="h-5 w-5" />
                Animatic Overview
              </CardTitle>
              <CardDescription>
                Preview your storyboard as a timed video with audio
              </CardDescription>
            </div>
            {hasFrames && (
              <Badge variant="secondary" className="gap-1">
                <Clock className="h-3 w-3" />
                {formattedDuration}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-lg border bg-muted/50 p-4 text-center">
              <ImageIcon className="mx-auto mb-2 h-6 w-6 text-primary" />
              <p className="text-2xl font-bold">{totalFrames}</p>
              <p className="text-xs text-muted-foreground">Frames</p>
            </div>
            <div className="rounded-lg border bg-muted/50 p-4 text-center">
              <Mic className="mx-auto mb-2 h-6 w-6 text-primary" />
              <p className="text-2xl font-bold">{audioTracks.dialogue}</p>
              <p className="text-xs text-muted-foreground">Dialogue Clips</p>
            </div>
            <div className="rounded-lg border bg-muted/50 p-4 text-center">
              <Music className="mx-auto mb-2 h-6 w-6 text-primary" />
              <p className="text-2xl font-bold">{audioTracks.music}</p>
              <p className="text-xs text-muted-foreground">Music Tracks</p>
            </div>
            <div className="rounded-lg border bg-muted/50 p-4 text-center">
              <Volume2 className="mx-auto mb-2 h-6 w-6 text-primary" />
              <p className="text-2xl font-bold">{audioTracks.sfx}</p>
              <p className="text-xs text-muted-foreground">Sound Effects</p>
            </div>
          </div>

          {/* Audio Tracks Preview */}
          {hasFrames && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Audio Tracks</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3">
                  <Mic className="h-4 w-4 text-blue-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Dialogue</p>
                    <p className="text-xs text-muted-foreground">{audioTracks.dialogue} clips generated</p>
                  </div>
                  <Badge variant="outline" className="text-xs">AI Voice</Badge>
                </div>
                <div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3">
                  <Music className="h-4 w-4 text-purple-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Background Music</p>
                    <p className="text-xs text-muted-foreground">Ambient score</p>
                  </div>
                  <Badge variant="outline" className="text-xs">AI Generated</Badge>
                </div>
                <div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3">
                  <Volume2 className="h-4 w-4 text-green-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Sound Effects</p>
                    <p className="text-xs text-muted-foreground">{audioTracks.sfx} effects added</p>
                  </div>
                  <Badge variant="outline" className="text-xs">Library</Badge>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link to={`/project/${projectId}/animatic`}>
                {hasFrames ? (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Open Animatic
                  </>
                ) : (
                  <>
                    Open Animatic
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Link>
            </Button>
            {hasFrames && (
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export MP4
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Requirements Card */}
      {!hasFrames && (
        <Card className="md:col-span-2 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Film className="mb-4 h-12 w-12 text-muted-foreground/50" />
            <h3 className="mb-2 text-lg font-medium">Create Storyboard Frames First</h3>
            <p className="mb-4 max-w-md text-muted-foreground">
              Generate storyboard frames from your scenes to build your animatic with timing and audio.
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
