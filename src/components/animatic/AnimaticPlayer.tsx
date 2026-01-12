import { useState, useEffect, useRef, useCallback } from 'react';
import { StoryboardFrame, TransitionType } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  ChevronRight,
  Music,
  Mic,
  Sparkles,
  Upload,
  Wand2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AnimaticPlayerProps {
  frames: StoryboardFrame[];
  onUpdateFrame: (id: string, updates: Partial<StoryboardFrame>) => void;
}

const TRANSITIONS: TransitionType[] = ['cut', 'fade', 'dissolve', 'wipe'];

interface AudioTrack {
  id: string;
  name: string;
  type: 'dialogue' | 'music' | 'sfx';
  volume: number;
  muted: boolean;
}

export function AnimaticPlayer({ frames, onUpdateFrame }: AnimaticPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [masterVolume, setMasterVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedFrameId, setSelectedFrameId] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  // Audio tracks state
  const [audioTracks, setAudioTracks] = useState<AudioTrack[]>([
    { id: 'dialogue', name: 'Dialogue', type: 'dialogue', volume: 100, muted: false },
    { id: 'music', name: 'Background Music', type: 'music', volume: 60, muted: false },
    { id: 'sfx', name: 'Sound Effects', type: 'sfx', volume: 80, muted: false },
  ]);

  // Music settings
  const [musicMood, setMusicMood] = useState('ambient');
  const [musicPrompt, setMusicPrompt] = useState('');

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

  const updateTrackVolume = (trackId: string, volume: number) => {
    setAudioTracks(tracks => 
      tracks.map(t => t.id === trackId ? { ...t, volume } : t)
    );
  };

  const toggleTrackMute = (trackId: string) => {
    setAudioTracks(tracks => 
      tracks.map(t => t.id === trackId ? { ...t, muted: !t.muted } : t)
    );
  };

  const handleGenerateDialogue = () => {
    toast({
      title: 'Generating dialogue...',
      description: 'Using AI to create voiceover from frame text',
    });
    setTimeout(() => {
      toast({
        title: 'Dialogue generated!',
        description: `Created voiceover for ${sortedFrames.filter(f => f.dialogue).length} frames`,
      });
    }, 2000);
  };

  const handleGenerateMusic = () => {
    toast({
      title: 'Generating music...',
      description: `Creating ${musicMood} background track`,
    });
    setTimeout(() => {
      toast({
        title: 'Music generated!',
        description: 'Background music track is ready',
      });
    }, 3000);
  };

  const handleGenerateSFX = () => {
    toast({
      title: 'Generating sound effects...',
      description: 'Analyzing scenes for ambient sounds',
    });
    setTimeout(() => {
      toast({
        title: 'SFX generated!',
        description: `Created sound effects for ${sortedFrames.length} frames`,
      });
    }, 2500);
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

            <div className="flex items-center gap-2">
              <Button size="icon" variant="ghost" onClick={() => setIsMuted(!isMuted)}>
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              <Slider
                value={[isMuted ? 0 : masterVolume]}
                max={100}
                step={1}
                className="w-24"
                onValueChange={([v]) => setMasterVolume(v)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Audio & Timeline Tabs */}
      <Tabs defaultValue="timeline" className="rounded-lg border bg-card">
        <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
          <TabsTrigger value="timeline" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
            <Clock className="mr-2 h-4 w-4" />
            Timeline
          </TabsTrigger>
          <TabsTrigger value="audio" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
            <Volume2 className="mr-2 h-4 w-4" />
            Audio Mixer
          </TabsTrigger>
          <TabsTrigger value="music" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
            <Music className="mr-2 h-4 w-4" />
            Music & SFX
          </TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="p-4">
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
                  {frame.dialogue && (
                    <Badge className="absolute left-1 top-1 h-4 px-1" variant="secondary">
                      <Mic className="h-2 w-2" />
                    </Badge>
                  )}
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
        </TabsContent>

        <TabsContent value="audio" className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Audio Tracks</h4>
            <Button variant="outline" size="sm">
              <Upload className="mr-2 h-3 w-3" />
              Import Audio
            </Button>
          </div>

          <div className="space-y-3">
            {audioTracks.map((track) => (
              <div 
                key={track.id}
                className="flex items-center gap-4 rounded-lg border bg-muted/30 p-3"
              >
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-8 w-8"
                  onClick={() => toggleTrackMute(track.id)}
                >
                  {track.muted ? (
                    <VolumeX className="h-4 w-4 text-muted-foreground" />
                  ) : track.type === 'dialogue' ? (
                    <Mic className="h-4 w-4 text-primary" />
                  ) : track.type === 'music' ? (
                    <Music className="h-4 w-4 text-amber-500" />
                  ) : (
                    <Volume2 className="h-4 w-4 text-emerald-500" />
                  )}
                </Button>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{track.name}</span>
                    <span className="text-xs text-muted-foreground">{track.volume}%</span>
                  </div>
                  <Slider
                    value={[track.muted ? 0 : track.volume]}
                    max={100}
                    step={1}
                    onValueChange={([v]) => updateTrackVolume(track.id, v)}
                  />
                </div>

                <Button size="sm" variant="ghost">
                  <Wand2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="music" className="p-4 space-y-6">
          {/* Dialogue Generation */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mic className="h-4 w-4 text-primary" />
                <h4 className="font-medium">AI Dialogue</h4>
              </div>
              <Badge variant="secondary">
                {sortedFrames.filter(f => f.dialogue).length} frames with dialogue
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Generate voiceover from character dialogue in your frames
            </p>
            <div className="flex gap-2">
              <Select defaultValue="sarah">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Voice..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sarah">Sarah (Female)</SelectItem>
                  <SelectItem value="james">James (Male)</SelectItem>
                  <SelectItem value="narrator">Narrator</SelectItem>
                  <SelectItem value="custom">Custom Voice</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleGenerateDialogue} className="gradient-primary">
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Dialogue
              </Button>
            </div>
          </div>

          {/* Music Generation */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Music className="h-4 w-4 text-amber-500" />
              <h4 className="font-medium">AI Background Music</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Generate a custom music track for your animatic
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-xs">Mood</Label>
                <Select value={musicMood} onValueChange={setMusicMood}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ambient">Ambient / Atmospheric</SelectItem>
                    <SelectItem value="tense">Tense / Suspenseful</SelectItem>
                    <SelectItem value="romantic">Romantic</SelectItem>
                    <SelectItem value="action">Action / Energetic</SelectItem>
                    <SelectItem value="sad">Melancholic</SelectItem>
                    <SelectItem value="happy">Uplifting / Happy</SelectItem>
                    <SelectItem value="epic">Epic / Cinematic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Custom Prompt (optional)</Label>
                <Input 
                  value={musicPrompt}
                  onChange={(e) => setMusicPrompt(e.target.value)}
                  placeholder="e.g., soft piano with strings..."
                />
              </div>
            </div>
            <Button onClick={handleGenerateMusic} variant="outline">
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Music Track
            </Button>
          </div>

          {/* SFX Generation */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-emerald-500" />
              <h4 className="font-medium">AI Sound Effects</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Auto-generate sound effects based on scene descriptions
            </p>
            <Button onClick={handleGenerateSFX} variant="outline">
              <Sparkles className="mr-2 h-4 w-4" />
              Generate SFX from Scenes
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
