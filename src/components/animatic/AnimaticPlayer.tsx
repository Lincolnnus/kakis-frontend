import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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
  Wand2,
  Repeat,
  Shuffle
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
  isGenerated: boolean;
  duration?: number;
  waveform?: number[];
}

interface FrameAudio {
  frameId: string;
  dialogue?: { text: string; voice: string; duration: number };
  sfx?: { name: string; duration: number }[];
}

// Sample waveform data for visualization
const generateWaveform = (length: number): number[] => 
  Array.from({ length }, () => Math.random() * 0.8 + 0.2);

// Sample audio data for frames
const SAMPLE_FRAME_AUDIO: Record<string, FrameAudio> = {
  'frame-1': {
    frameId: 'frame-1',
    dialogue: { text: "Luna gazes up at the night sky...", voice: 'Sarah', duration: 3.2 },
    sfx: [{ name: 'Crickets chirping', duration: 2.0 }, { name: 'Gentle breeze', duration: 1.5 }]
  },
  'frame-2': {
    frameId: 'frame-2', 
    dialogue: { text: "The stars twinkle brighter than ever before.", voice: 'Sarah', duration: 2.8 },
    sfx: [{ name: 'Magical shimmer', duration: 1.0 }]
  },
  'frame-3': {
    frameId: 'frame-3',
    dialogue: { text: "Something catches her eye in the distance.", voice: 'Sarah', duration: 2.5 },
    sfx: [{ name: 'Owl hooting', duration: 1.2 }, { name: 'Leaves rustling', duration: 2.0 }]
  },
  'frame-4': {
    frameId: 'frame-4',
    dialogue: { text: "A shooting star streaks across the sky!", voice: 'Narrator', duration: 2.0 },
    sfx: [{ name: 'Whoosh', duration: 0.8 }, { name: 'Sparkling trail', duration: 1.5 }]
  },
  'frame-5': {
    frameId: 'frame-5',
    sfx: [{ name: 'Footsteps on grass', duration: 1.5 }]
  },
};

export function AnimaticPlayer({ frames, onUpdateFrame }: AnimaticPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [masterVolume, setMasterVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedFrameId, setSelectedFrameId] = useState<string | null>(null);
  const [isLooping, setIsLooping] = useState(true);
  const [activeTransition, setActiveTransition] = useState<TransitionType>('cut');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isGeneratingDialogue, setIsGeneratingDialogue] = useState(false);
  const [isGeneratingMusic, setIsGeneratingMusic] = useState(false);
  const [isGeneratingSFX, setIsGeneratingSFX] = useState(false);
  const [frameAudioData, setFrameAudioData] = useState<Record<string, FrameAudio>>({});
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  // Audio tracks state with sample generated data
  const [audioTracks, setAudioTracks] = useState<AudioTrack[]>([
    { id: 'dialogue', name: 'Dialogue', type: 'dialogue', volume: 100, muted: false, isGenerated: false, waveform: generateWaveform(50) },
    { id: 'music', name: 'Background Music', type: 'music', volume: 60, muted: false, isGenerated: false, duration: 45, waveform: generateWaveform(80) },
    { id: 'sfx', name: 'Sound Effects', type: 'sfx', volume: 80, muted: false, isGenerated: false, waveform: generateWaveform(60) },
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

  // Transition handling
  const triggerTransition = useCallback((nextIndex: number) => {
    if (activeTransition !== 'cut') {
      setIsTransitioning(true);
      setPreviousIndex(currentIndex);
      setTimeout(() => {
        setCurrentIndex(nextIndex);
        setTimeout(() => {
          setIsTransitioning(false);
          setPreviousIndex(null);
        }, 300);
      }, 150);
    } else {
      setCurrentIndex(nextIndex);
    }
  }, [activeTransition, currentIndex]);

  useEffect(() => {
    if (isPlaying && sortedFrames.length > 0) {
      const frameDuration = (currentFrame?.duration || 2) * 1000 / playbackSpeed;
      
      intervalRef.current = setTimeout(() => {
        if (currentIndex < sortedFrames.length - 1) {
          triggerTransition(currentIndex + 1);
        } else if (isLooping) {
          triggerTransition(0);
        } else {
          setIsPlaying(false);
        }
      }, frameDuration);

      return () => {
        if (intervalRef.current) clearTimeout(intervalRef.current);
      };
    }
  }, [isPlaying, currentIndex, sortedFrames, currentFrame, playbackSpeed, isLooping, triggerTransition]);

  useEffect(() => {
    setProgress(calculateProgress());
  }, [currentIndex, calculateProgress]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const goToFrame = (index: number) => {
    const targetIndex = Math.max(0, Math.min(index, sortedFrames.length - 1));
    if (targetIndex !== currentIndex) {
      triggerTransition(targetIndex);
    }
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
    setIsGeneratingDialogue(true);
    toast({
      title: 'Generating dialogue...',
      description: 'Using AI to create voiceover from frame text',
    });
    setTimeout(() => {
      // Simulate loading sample dialogue data
      setFrameAudioData(prev => ({
        ...prev,
        ...SAMPLE_FRAME_AUDIO
      }));
      setAudioTracks(tracks => 
        tracks.map(t => t.id === 'dialogue' ? { ...t, isGenerated: true, duration: 12.5 } : t)
      );
      setIsGeneratingDialogue(false);
      toast({
        title: 'Dialogue generated!',
        description: `Created voiceover for ${Object.values(SAMPLE_FRAME_AUDIO).filter(f => f.dialogue).length} frames with sample AI voices`,
      });
    }, 2000);
  };

  const handleGenerateMusic = () => {
    setIsGeneratingMusic(true);
    toast({
      title: 'Generating music...',
      description: `Creating ${musicMood} background track`,
    });
    setTimeout(() => {
      setAudioTracks(tracks => 
        tracks.map(t => t.id === 'music' ? { 
          ...t, 
          isGenerated: true, 
          duration: totalDuration,
          name: `${musicMood.charAt(0).toUpperCase() + musicMood.slice(1)} Theme`,
          waveform: generateWaveform(100)
        } : t)
      );
      setIsGeneratingMusic(false);
      toast({
        title: 'Music generated!',
        description: `${musicMood.charAt(0).toUpperCase() + musicMood.slice(1)} music track (${formatTime(totalDuration)}) is ready`,
      });
    }, 3000);
  };

  const handleGenerateSFX = () => {
    setIsGeneratingSFX(true);
    toast({
      title: 'Generating sound effects...',
      description: 'Analyzing scenes for ambient sounds',
    });
    setTimeout(() => {
      // Add SFX data to frames
      setFrameAudioData(prev => ({
        ...prev,
        ...SAMPLE_FRAME_AUDIO
      }));
      setAudioTracks(tracks => 
        tracks.map(t => t.id === 'sfx' ? { ...t, isGenerated: true, duration: totalDuration } : t)
      );
      setIsGeneratingSFX(false);
      toast({
        title: 'SFX generated!',
        description: `Created ${Object.values(SAMPLE_FRAME_AUDIO).reduce((acc, f) => acc + (f.sfx?.length || 0), 0)} sound effects for scenes`,
      });
    }, 2500);
  };

  // Get current frame audio data
  const currentFrameAudio = currentFrame ? frameAudioData[currentFrame.id] : null;

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
        <div className="aspect-video w-full relative">
          {/* Previous frame for transitions */}
          {previousIndex !== null && sortedFrames[previousIndex]?.imageUrl && (
            <img
              src={sortedFrames[previousIndex].imageUrl}
              alt={`Frame ${sortedFrames[previousIndex].frameNumber}`}
              className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ${
                isTransitioning ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}
          
          {/* Current frame */}
          {currentFrame?.imageUrl ? (
            <img
              src={currentFrame.imageUrl}
              alt={`Frame ${currentFrame.frameNumber}`}
              className={`h-full w-full object-contain transition-all duration-300 ${
                isTransitioning && activeTransition === 'fade' ? 'opacity-0' : 'opacity-100'
              } ${
                isTransitioning && activeTransition === 'dissolve' ? 'opacity-50 scale-105' : ''
              } ${
                isTransitioning && activeTransition === 'wipe' ? 'translate-x-full' : 'translate-x-0'
              }`}
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
            <div className="flex-1">
              <p className="text-sm font-medium text-white">
                Frame {currentFrame?.frameNumber} of {sortedFrames.length}
              </p>
              {currentFrameAudio?.dialogue && (
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant="secondary" className="bg-primary/20 text-primary-foreground">
                    <Mic className="mr-1 h-3 w-3" />
                    {currentFrameAudio.dialogue.voice}
                  </Badge>
                  <p className="text-sm text-white/90 italic">"{currentFrameAudio.dialogue.text}"</p>
                </div>
              )}
              {currentFrameAudio?.sfx && currentFrameAudio.sfx.length > 0 && (
                <div className="mt-1 flex flex-wrap gap-1">
                  {currentFrameAudio.sfx.map((sfx, i) => (
                    <Badge key={i} variant="outline" className="bg-emerald-500/20 text-emerald-100 border-emerald-500/30 text-xs">
                      <Volume2 className="mr-1 h-2 w-2" />
                      {sfx.name}
                    </Badge>
                  ))}
                </div>
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
            {/* Transition selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Transition:</span>
              <Select 
                value={activeTransition} 
                onValueChange={(v) => setActiveTransition(v as TransitionType)}
              >
                <SelectTrigger className="h-8 w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TRANSITIONS.map(t => (
                    <SelectItem key={t} value={t} className="capitalize">{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

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

            {/* Loop toggle */}
            <Button 
              size="icon" 
              variant={isLooping ? 'default' : 'ghost'}
              onClick={() => setIsLooping(!isLooping)}
              className={isLooping ? 'gradient-primary' : ''}
            >
              <Repeat className="h-4 w-4" />
            </Button>

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
                className={`flex items-center gap-4 rounded-lg border p-3 transition-colors ${
                  track.isGenerated ? 'bg-accent/50 border-primary/20' : 'bg-muted/30'
                }`}
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
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{track.name}</span>
                      {track.isGenerated && (
                        <Badge variant="secondary" className="text-xs">
                          <Sparkles className="mr-1 h-2 w-2" />
                          AI Generated
                        </Badge>
                      )}
                      {track.duration && (
                        <span className="text-xs text-muted-foreground">
                          {formatTime(track.duration)}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{track.volume}%</span>
                  </div>
                  
                  {/* Waveform visualization */}
                  {track.isGenerated && track.waveform && (
                    <div className="mb-2 flex items-end gap-px h-8 bg-muted/50 rounded overflow-hidden">
                      {track.waveform.map((level, i) => (
                        <div
                          key={i}
                          className={`flex-1 rounded-t transition-all ${
                            track.type === 'dialogue' ? 'bg-primary/60' :
                            track.type === 'music' ? 'bg-amber-500/60' : 'bg-emerald-500/60'
                          } ${track.muted ? 'opacity-30' : ''}`}
                          style={{ height: `${level * 100}%` }}
                        />
                      ))}
                    </div>
                  )}
                  
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

          {/* Generated Audio Summary */}
          {Object.keys(frameAudioData).length > 0 && (
            <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-3">
              <h5 className="text-sm font-medium mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Generated Audio Summary
              </h5>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Dialogue Clips</p>
                  <p className="font-medium">{Object.values(frameAudioData).filter(f => f.dialogue).length}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Sound Effects</p>
                  <p className="font-medium">{Object.values(frameAudioData).reduce((acc, f) => acc + (f.sfx?.length || 0), 0)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Total Duration</p>
                  <p className="font-medium">{formatTime(totalDuration)}</p>
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="music" className="p-4 space-y-6">
          {/* Dialogue Generation */}
          <div className="space-y-3 rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mic className="h-4 w-4 text-primary" />
                <h4 className="font-medium">AI Dialogue</h4>
              </div>
              <div className="flex items-center gap-2">
                {audioTracks.find(t => t.id === 'dialogue')?.isGenerated && (
                  <Badge className="bg-primary/20 text-primary">
                    <Sparkles className="mr-1 h-3 w-3" />
                    Generated
                  </Badge>
                )}
                <Badge variant="secondary">
                  {sortedFrames.filter(f => f.dialogue).length} frames with dialogue
                </Badge>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Generate voiceover from character dialogue in your frames
            </p>
            
            {/* Show generated dialogue samples */}
            {audioTracks.find(t => t.id === 'dialogue')?.isGenerated && (
              <div className="space-y-2 rounded-md bg-muted/50 p-3">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Sample Dialogue</p>
                {Object.values(frameAudioData).filter(f => f.dialogue).slice(0, 3).map((frame, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <Badge variant="outline" className="shrink-0">{frame.dialogue?.voice}</Badge>
                    <span className="text-muted-foreground italic">"{frame.dialogue?.text}"</span>
                    <span className="text-xs text-muted-foreground ml-auto">{frame.dialogue?.duration}s</span>
                  </div>
                ))}
              </div>
            )}
            
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
              <Button 
                onClick={handleGenerateDialogue} 
                className="gradient-primary"
                disabled={isGeneratingDialogue}
              >
                {isGeneratingDialogue ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    {audioTracks.find(t => t.id === 'dialogue')?.isGenerated ? 'Regenerate' : 'Generate'} Dialogue
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Music Generation */}
          <div className="space-y-3 rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Music className="h-4 w-4 text-amber-500" />
                <h4 className="font-medium">AI Background Music</h4>
              </div>
              {audioTracks.find(t => t.id === 'music')?.isGenerated && (
                <Badge className="bg-amber-500/20 text-amber-600">
                  <Sparkles className="mr-1 h-3 w-3" />
                  Generated
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Generate a custom music track for your animatic
            </p>
            
            {/* Show generated music info */}
            {audioTracks.find(t => t.id === 'music')?.isGenerated && (
              <div className="rounded-md bg-amber-500/10 border border-amber-500/20 p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{audioTracks.find(t => t.id === 'music')?.name}</span>
                  <span className="text-xs text-muted-foreground">{formatTime(totalDuration)}</span>
                </div>
                <div className="flex items-end gap-px h-8">
                  {audioTracks.find(t => t.id === 'music')?.waveform?.map((level, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-amber-500/50 rounded-t"
                      style={{ height: `${level * 100}%` }}
                    />
                  ))}
                </div>
              </div>
            )}
            
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
            <Button 
              onClick={handleGenerateMusic} 
              variant="outline"
              disabled={isGeneratingMusic}
            >
              {isGeneratingMusic ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  {audioTracks.find(t => t.id === 'music')?.isGenerated ? 'Regenerate' : 'Generate'} Music Track
                </>
              )}
            </Button>
          </div>

          {/* SFX Generation */}
          <div className="space-y-3 rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-emerald-500" />
                <h4 className="font-medium">AI Sound Effects</h4>
              </div>
              {audioTracks.find(t => t.id === 'sfx')?.isGenerated && (
                <Badge className="bg-emerald-500/20 text-emerald-600">
                  <Sparkles className="mr-1 h-3 w-3" />
                  Generated
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Auto-generate sound effects based on scene descriptions
            </p>
            
            {/* Show generated SFX list */}
            {audioTracks.find(t => t.id === 'sfx')?.isGenerated && (
              <div className="rounded-md bg-emerald-500/10 border border-emerald-500/20 p-3">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Generated Effects</p>
                <div className="flex flex-wrap gap-1">
                  {Object.values(frameAudioData).flatMap(f => f.sfx || []).slice(0, 8).map((sfx, i) => (
                    <Badge key={i} variant="outline" className="bg-emerald-500/10 border-emerald-500/30">
                      {sfx.name}
                    </Badge>
                  ))}
                  {Object.values(frameAudioData).flatMap(f => f.sfx || []).length > 8 && (
                    <Badge variant="secondary">
                      +{Object.values(frameAudioData).flatMap(f => f.sfx || []).length - 8} more
                    </Badge>
                  )}
                </div>
              </div>
            )}
            
            <Button 
              onClick={handleGenerateSFX} 
              variant="outline"
              disabled={isGeneratingSFX}
            >
              {isGeneratingSFX ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  {audioTracks.find(t => t.id === 'sfx')?.isGenerated ? 'Regenerate' : 'Generate'} SFX from Scenes
                </>
              )}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
