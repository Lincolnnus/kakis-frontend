import { useState, useEffect, useRef, useCallback } from 'react';
import { StoryboardFrame, TransitionType } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Maximize2,
  Volume2,
  VolumeX,
  Film,
  Clock,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface AnimaticPlayerProps {
  frames: StoryboardFrame[];
  onUpdateFrame: (id: string, updates: Partial<StoryboardFrame>) => void;
}

const TRANSITIONS: TransitionType[] = ['cut', 'fade', 'dissolve', 'wipe'];

export function AnimaticPlayer({ frames, onUpdateFrame }: AnimaticPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedFrameId, setSelectedFrameId] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const sortedFrames = [...frames].sort((a, b) => a.frameNumber - b.frameNumber);
  const currentFrame = sortedFrames[currentIndex];
  const totalDuration = sortedFrames.reduce((acc, f) => acc + f.duration, 0);

  const calculateProgress = useCallback(() => {
    let elapsed = 0;
    for (let i = 0; i < currentIndex; i++) {
      elapsed += sortedFrames[i].duration;
    }
    return (elapsed / totalDuration) * 100;
  }, [currentIndex, sortedFrames, totalDuration]);

  useEffect(() => {
    if (isPlaying && sortedFrames.length > 0) {
      const frameDuration = (currentFrame?.duration || 2) * 1000 / playbackSpeed;
      
      intervalRef.current = setTimeout(() => {
        if (currentIndex < sortedFrames.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          setCurrentIndex(0);
          setIsPlaying(false);
        }
      }, frameDuration);

      return () => {
        if (intervalRef.current) clearTimeout(intervalRef.current);
      };
    }
  }, [isPlaying, currentIndex, sortedFrames, currentFrame, playbackSpeed]);

  useEffect(() => {
    setProgress(calculateProgress());
  }, [currentIndex, calculateProgress]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const goToFrame = (index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, sortedFrames.length - 1)));
  };

  const handleProgressClick = (value: number[]) => {
    const targetProgress = value[0];
    let accumulated = 0;
    
    for (let i = 0; i < sortedFrames.length; i++) {
      accumulated += (sortedFrames[i].duration / totalDuration) * 100;
      if (accumulated >= targetProgress) {
        setCurrentIndex(i);
        break;
      }
    }
  };

  const updateFrameDuration = (frameId: string, duration: number) => {
    onUpdateFrame(frameId, { duration: Math.max(1, Math.min(30, duration)) });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCurrentTime = () => {
    let elapsed = 0;
    for (let i = 0; i < currentIndex; i++) {
      elapsed += sortedFrames[i].duration;
    }
    return elapsed;
  };

  if (sortedFrames.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <Film className="mb-4 h-12 w-12 text-muted-foreground/50" />
          <h3 className="mb-2 text-lg font-medium">No Frames for Animatic</h3>
          <p className="text-muted-foreground">
            Create storyboard frames first to build your animatic
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Preview */}
      <div className="relative overflow-hidden rounded-xl border bg-black">
        <div className="aspect-video w-full">
          {currentFrame?.imageUrl ? (
            <img
              src={currentFrame.imageUrl}
              alt={`Frame ${currentFrame.frameNumber}`}
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <div className="text-center">
                <Film className="mx-auto mb-2 h-12 w-12 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">Frame {currentFrame?.frameNumber}</p>
                <p className="text-xs text-muted-foreground">{currentFrame?.description}</p>
              </div>
            </div>
          )}
        </div>

        {/* Frame Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm font-medium text-white">
                Frame {currentFrame?.frameNumber} of {sortedFrames.length}
              </p>
              {currentFrame?.dialogue && (
                <p className="mt-1 text-sm text-white/80">"{currentFrame.dialogue}"</p>
              )}
            </div>
            <div className="text-right text-sm text-white/60">
              <p>{currentFrame?.cameraAngle} • {currentFrame?.cameraMovement}</p>
              <p>{currentFrame?.duration}s</p>
            </div>
          </div>
        </div>

        {/* Fullscreen Button */}
        <Button 
          size="icon" 
          variant="ghost" 
          className="absolute right-4 top-4 text-white hover:bg-white/20"
        >
          <Maximize2 className="h-5 w-5" />
        </Button>
      </div>

      {/* Controls */}
      <div className="rounded-lg border bg-card p-4">
        {/* Progress Bar */}
        <div className="mb-4">
          <Slider
            value={[progress]}
            onValueChange={handleProgressClick}
            max={100}
            step={0.1}
            className="cursor-pointer"
          />
          <div className="mt-1 flex justify-between text-xs text-muted-foreground">
            <span>{formatTime(getCurrentTime())}</span>
            <span>{formatTime(totalDuration)}</span>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost" onClick={() => goToFrame(0)}>
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" onClick={() => goToFrame(currentIndex - 1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button size="icon" onClick={togglePlay} className="h-10 w-10 gradient-primary">
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
            </Button>
            <Button size="icon" variant="ghost" onClick={() => goToFrame(currentIndex + 1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" onClick={() => goToFrame(sortedFrames.length - 1)}>
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Speed:</span>
              <Select 
                value={playbackSpeed.toString()} 
                onValueChange={(v) => setPlaybackSpeed(parseFloat(v))}
              >
                <SelectTrigger className="h-8 w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.5">0.5x</SelectItem>
                  <SelectItem value="1">1x</SelectItem>
                  <SelectItem value="1.5">1.5x</SelectItem>
                  <SelectItem value="2">2x</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button size="icon" variant="ghost" onClick={() => setIsMuted(!isMuted)}>
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="rounded-lg border bg-card p-4">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-medium">
          <Clock className="h-4 w-4" />
          Timeline
        </h3>
        
        <div className="flex gap-2 overflow-x-auto pb-2">
          {sortedFrames.map((frame, index) => (
            <div
              key={frame.id}
              className={`flex-shrink-0 cursor-pointer rounded-lg border-2 p-2 transition-all ${
                index === currentIndex 
                  ? 'border-primary ring-2 ring-primary/20' 
                  : 'border-transparent hover:border-muted-foreground/30'
              } ${selectedFrameId === frame.id ? 'bg-accent' : ''}`}
              onClick={() => {
                goToFrame(index);
                setSelectedFrameId(frame.id);
              }}
            >
              <div className="relative mb-2 h-16 w-28 overflow-hidden rounded bg-muted">
                {frame.imageUrl ? (
                  <img
                    src={frame.imageUrl}
                    alt={`Frame ${frame.frameNumber}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="text-xs text-muted-foreground">{frame.frameNumber}</span>
                  </div>
                )}
                <div className="absolute bottom-1 right-1 rounded bg-black/60 px-1 text-xs text-white">
                  {frame.duration}s
                </div>
              </div>
              
              {selectedFrameId === frame.id && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1">
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation();
                        updateFrameDuration(frame.id, frame.duration - 1);
                      }}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center text-xs">{frame.duration}s</span>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation();
                        updateFrameDuration(frame.id, frame.duration + 1);
                      }}
                    >
                      +
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
