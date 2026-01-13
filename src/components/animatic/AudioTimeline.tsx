import { useMemo } from 'react';
import { StoryboardFrame } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Mic, Music, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AudioClip {
  id: string;
  name: string;
  type: 'dialogue' | 'music' | 'sfx';
  startFrame: number; // Frame index where clip starts
  endFrame: number;   // Frame index where clip ends
  color: string;
}

interface AudioTimelineProps {
  frames: StoryboardFrame[];
  currentIndex: number;
  onFrameClick: (index: number) => void;
}

// Sample audio clips spanning multiple frames
const SAMPLE_AUDIO_CLIPS: AudioClip[] = [
  // Dialogue clips
  { id: 'd1', name: 'Luna: "The stars are calling..."', type: 'dialogue', startFrame: 0, endFrame: 1, color: 'bg-primary' },
  { id: 'd2', name: 'Luna: "I must find the keeper..."', type: 'dialogue', startFrame: 3, endFrame: 4, color: 'bg-primary' },
  { id: 'd3', name: 'Starkeeper: "Welcome, young one"', type: 'dialogue', startFrame: 6, endFrame: 8, color: 'bg-primary' },
  
  // Music - spans entire sequence
  { id: 'm1', name: 'Main Theme - Orchestral', type: 'music', startFrame: 0, endFrame: 14, color: 'bg-amber-500' },
  
  // SFX clips
  { id: 's1', name: 'Crickets & Night Ambience', type: 'sfx', startFrame: 0, endFrame: 3, color: 'bg-emerald-500' },
  { id: 's2', name: 'Magical Shimmer', type: 'sfx', startFrame: 2, endFrame: 2, color: 'bg-emerald-500' },
  { id: 's3', name: 'Footsteps on Grass', type: 'sfx', startFrame: 4, endFrame: 6, color: 'bg-emerald-500' },
  { id: 's4', name: 'Wind Whoosh', type: 'sfx', startFrame: 8, endFrame: 10, color: 'bg-emerald-500' },
  { id: 's5', name: 'Star Chimes', type: 'sfx', startFrame: 11, endFrame: 14, color: 'bg-emerald-500' },
];

const TRACK_CONFIG = [
  { type: 'dialogue' as const, label: 'Dialogue', icon: Mic, colorClass: 'text-primary' },
  { type: 'music' as const, label: 'Music', icon: Music, colorClass: 'text-amber-500' },
  { type: 'sfx' as const, label: 'SFX', icon: Volume2, colorClass: 'text-emerald-500' },
];

export function AudioTimeline({ frames, currentIndex, onFrameClick }: AudioTimelineProps) {
  const sortedFrames = useMemo(() => 
    [...frames].sort((a, b) => a.frameNumber - b.frameNumber),
    [frames]
  );

  // Calculate cumulative time for each frame
  const frameTimings = useMemo(() => {
    let cumulative = 0;
    return sortedFrames.map(frame => {
      const start = cumulative;
      cumulative += frame.duration;
      return { start, end: cumulative, duration: frame.duration };
    });
  }, [sortedFrames]);

  const totalDuration = frameTimings[frameTimings.length - 1]?.end || 0;

  // Get clips for a specific track type
  const getTrackClips = (type: 'dialogue' | 'music' | 'sfx') => 
    SAMPLE_AUDIO_CLIPS.filter(clip => clip.type === type && clip.endFrame < sortedFrames.length);

  // Calculate clip position as percentage of total timeline
  const getClipStyle = (clip: AudioClip) => {
    const startTime = frameTimings[clip.startFrame]?.start || 0;
    const endTime = frameTimings[Math.min(clip.endFrame, sortedFrames.length - 1)]?.end || 0;
    const left = (startTime / totalDuration) * 100;
    const width = ((endTime - startTime) / totalDuration) * 100;
    return { left: `${left}%`, width: `${Math.max(width, 2)}%` };
  };

  // Check if clip is currently active
  const isClipActive = (clip: AudioClip) => 
    currentIndex >= clip.startFrame && currentIndex <= clip.endFrame;

  if (sortedFrames.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* Frame Ruler */}
      <div className="relative">
        <div className="flex gap-px">
          {sortedFrames.map((frame, index) => {
            const widthPercent = (frame.duration / totalDuration) * 100;
            return (
              <button
                key={frame.id}
                onClick={() => onFrameClick(index)}
                className={cn(
                  "h-12 relative flex items-center justify-center text-xs transition-all border-r border-border/50 last:border-r-0",
                  index === currentIndex 
                    ? "bg-primary/20 ring-2 ring-primary ring-inset" 
                    : "bg-muted/30 hover:bg-muted/50"
                )}
                style={{ width: `${widthPercent}%`, minWidth: '24px' }}
              >
                <span className="truncate px-1 text-[10px] text-muted-foreground">
                  {frame.frameNumber}
                </span>
                {frame.imageUrl && (
                  <img 
                    src={frame.imageUrl} 
                    alt="" 
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                  />
                )}
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-medium z-10">
                  {frame.duration}s
                </span>
              </button>
            );
          })}
        </div>
        
        {/* Playhead */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-20 pointer-events-none"
          style={{ 
            left: `${((frameTimings[currentIndex]?.start || 0) / totalDuration) * 100}%`,
            transition: 'left 0.1s ease-out'
          }}
        >
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-red-500 rotate-45" />
        </div>
      </div>

      {/* Audio Tracks */}
      <div className="space-y-2">
        {TRACK_CONFIG.map(({ type, label, icon: Icon, colorClass }) => {
          const clips = getTrackClips(type);
          
          return (
            <div key={type} className="flex items-stretch gap-2">
              {/* Track Label */}
              <div className="w-24 shrink-0 flex items-center gap-2 px-2 py-1 bg-muted/30 rounded-l border-r">
                <Icon className={cn("h-3 w-3", colorClass)} />
                <span className="text-xs font-medium">{label}</span>
              </div>
              
              {/* Track Lane */}
              <div className="flex-1 relative h-8 bg-muted/20 rounded-r overflow-hidden">
                {clips.map(clip => {
                  const style = getClipStyle(clip);
                  const active = isClipActive(clip);
                  
                  return (
                    <div
                      key={clip.id}
                      className={cn(
                        "absolute top-1 bottom-1 rounded-sm flex items-center px-1.5 overflow-hidden transition-all cursor-pointer hover:brightness-110",
                        clip.color,
                        active ? "opacity-100 ring-1 ring-white/50" : "opacity-60"
                      )}
                      style={style}
                      title={clip.name}
                    >
                      <span className="text-[10px] text-white font-medium truncate">
                        {clip.name}
                      </span>
                      
                      {/* Continuation indicators */}
                      {clip.startFrame > 0 && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/30" />
                      )}
                      {clip.endFrame < sortedFrames.length - 1 && (
                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/30" />
                      )}
                    </div>
                  );
                })}
                
                {/* Empty state */}
                {clips.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[10px] text-muted-foreground">No {label.toLowerCase()}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-primary" />
          <span>Dialogue</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-amber-500" />
          <span>Music</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-emerald-500" />
          <span>SFX</span>
        </div>
        <span className="ml-auto">
          Total: {Math.floor(totalDuration / 60)}:{String(Math.floor(totalDuration % 60)).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}
