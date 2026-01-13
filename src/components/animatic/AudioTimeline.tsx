import { useMemo, useState, useRef, useCallback } from 'react';
import { StoryboardFrame } from '@/types';
import { Mic, Music, Volume2, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AudioClip {
  id: string;
  name: string;
  type: 'dialogue' | 'music' | 'sfx';
  startFrame: number;
  endFrame: number;
  color: string;
}

interface AudioTimelineProps {
  frames: StoryboardFrame[];
  currentIndex: number;
  onFrameClick: (index: number) => void;
}

const INITIAL_AUDIO_CLIPS: AudioClip[] = [
  { id: 'd1', name: 'Luna: "The stars are calling..."', type: 'dialogue', startFrame: 0, endFrame: 1, color: 'bg-primary' },
  { id: 'd2', name: 'Luna: "I must find the keeper..."', type: 'dialogue', startFrame: 3, endFrame: 4, color: 'bg-primary' },
  { id: 'd3', name: 'Starkeeper: "Welcome, young one"', type: 'dialogue', startFrame: 6, endFrame: 8, color: 'bg-primary' },
  { id: 'm1', name: 'Main Theme - Orchestral', type: 'music', startFrame: 0, endFrame: 14, color: 'bg-amber-500' },
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

interface DraggableClipProps {
  clip: AudioClip;
  style: { left: string; width: string };
  active: boolean;
  framesCount: number;
  onDrag: (clipId: string, deltaFrames: number) => void;
  onResize: (clipId: string, edge: 'start' | 'end', deltaFrames: number) => void;
  totalDuration: number;
  frameTimings: { start: number; end: number; duration: number }[];
}

function DraggableClip({ 
  clip, 
  style, 
  active, 
  framesCount, 
  onDrag, 
  onResize,
  totalDuration,
  frameTimings
}: DraggableClipProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState<'start' | 'end' | null>(null);
  const dragStartX = useRef(0);
  const initialClip = useRef({ startFrame: clip.startFrame, endFrame: clip.endFrame });

  const getFrameFromX = useCallback((clientX: number) => {
    if (!containerRef.current) return 0;
    const parent = containerRef.current.closest('.track-lane') as HTMLElement;
    if (!parent) return 0;
    
    const rect = parent.getBoundingClientRect();
    const relativeX = clientX - rect.left;
    const percent = relativeX / rect.width;
    const targetTime = percent * totalDuration;
    
    // Find the frame at this time
    for (let i = 0; i < frameTimings.length; i++) {
      if (targetTime >= frameTimings[i].start && targetTime < frameTimings[i].end) {
        return i;
      }
    }
    return frameTimings.length - 1;
  }, [totalDuration, frameTimings]);

  const handleMouseDown = (e: React.MouseEvent, action: 'drag' | 'resize-start' | 'resize-end') => {
    e.preventDefault();
    e.stopPropagation();
    dragStartX.current = e.clientX;
    initialClip.current = { startFrame: clip.startFrame, endFrame: clip.endFrame };
    
    if (action === 'drag') {
      setIsDragging(true);
    } else {
      setIsResizing(action === 'resize-start' ? 'start' : 'end');
    }

    const handleMouseMove = (moveE: MouseEvent) => {
      const currentFrame = getFrameFromX(moveE.clientX);
      const startFrameFromX = getFrameFromX(dragStartX.current);
      const deltaFrames = currentFrame - startFrameFromX;

      if (action === 'drag') {
        onDrag(clip.id, deltaFrames);
      } else if (action === 'resize-start') {
        onResize(clip.id, 'start', deltaFrames);
      } else {
        onResize(clip.id, 'end', deltaFrames);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(null);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute top-1 bottom-1 rounded-sm flex items-center overflow-hidden transition-opacity group",
        clip.color,
        active ? "opacity-100 ring-1 ring-white/50" : "opacity-60",
        isDragging && "cursor-grabbing z-10 ring-2 ring-white",
        isResizing && "z-10"
      )}
      style={style}
      title={clip.name}
    >
      {/* Left resize handle */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-2 cursor-ew-resize hover:bg-white/30 z-10"
        onMouseDown={(e) => handleMouseDown(e, 'resize-start')}
      />
      
      {/* Drag handle in center */}
      <div 
        className="flex-1 flex items-center gap-1 px-1.5 cursor-grab active:cursor-grabbing"
        onMouseDown={(e) => handleMouseDown(e, 'drag')}
      >
        <GripVertical className="h-3 w-3 text-white/50 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="text-[10px] text-white font-medium truncate">
          {clip.name}
        </span>
      </div>
      
      {/* Right resize handle */}
      <div 
        className="absolute right-0 top-0 bottom-0 w-2 cursor-ew-resize hover:bg-white/30 z-10"
        onMouseDown={(e) => handleMouseDown(e, 'resize-end')}
      />
      
      {/* Continuation indicators */}
      {clip.startFrame > 0 && (
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white/50 pointer-events-none" />
      )}
      {clip.endFrame < framesCount - 1 && (
        <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-white/50 pointer-events-none" />
      )}
    </div>
  );
}

export function AudioTimeline({ frames, currentIndex, onFrameClick }: AudioTimelineProps) {
  const [audioClips, setAudioClips] = useState<AudioClip[]>(INITIAL_AUDIO_CLIPS);

  const sortedFrames = useMemo(() => 
    [...frames].sort((a, b) => a.frameNumber - b.frameNumber),
    [frames]
  );

  const frameTimings = useMemo(() => {
    let cumulative = 0;
    return sortedFrames.map(frame => {
      const start = cumulative;
      cumulative += frame.duration;
      return { start, end: cumulative, duration: frame.duration };
    });
  }, [sortedFrames]);

  const totalDuration = frameTimings[frameTimings.length - 1]?.end || 0;

  const getTrackClips = (type: 'dialogue' | 'music' | 'sfx') => 
    audioClips.filter(clip => clip.type === type && clip.endFrame < sortedFrames.length);

  const getClipStyle = (clip: AudioClip) => {
    const startTime = frameTimings[clip.startFrame]?.start || 0;
    const endTime = frameTimings[Math.min(clip.endFrame, sortedFrames.length - 1)]?.end || 0;
    const left = (startTime / totalDuration) * 100;
    const width = ((endTime - startTime) / totalDuration) * 100;
    return { left: `${left}%`, width: `${Math.max(width, 2)}%` };
  };

  const isClipActive = (clip: AudioClip) => 
    currentIndex >= clip.startFrame && currentIndex <= clip.endFrame;

  const handleDrag = useCallback((clipId: string, deltaFrames: number) => {
    setAudioClips(prev => prev.map(clip => {
      if (clip.id !== clipId) return clip;
      
      const clipLength = clip.endFrame - clip.startFrame;
      let newStart = Math.max(0, clip.startFrame + deltaFrames);
      let newEnd = newStart + clipLength;
      
      // Clamp to timeline bounds
      if (newEnd >= sortedFrames.length) {
        newEnd = sortedFrames.length - 1;
        newStart = newEnd - clipLength;
      }
      
      return { ...clip, startFrame: Math.max(0, newStart), endFrame: newEnd };
    }));
  }, [sortedFrames.length]);

  const handleResize = useCallback((clipId: string, edge: 'start' | 'end', deltaFrames: number) => {
    setAudioClips(prev => prev.map(clip => {
      if (clip.id !== clipId) return clip;
      
      if (edge === 'start') {
        const newStart = Math.max(0, Math.min(clip.endFrame, clip.startFrame + deltaFrames));
        return { ...clip, startFrame: newStart };
      } else {
        const newEnd = Math.max(clip.startFrame, Math.min(sortedFrames.length - 1, clip.endFrame + deltaFrames));
        return { ...clip, endFrame: newEnd };
      }
    }));
  }, [sortedFrames.length]);

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
              <div className="track-lane flex-1 relative h-8 bg-muted/20 rounded-r overflow-hidden">
                {clips.map(clip => (
                  <DraggableClip
                    key={clip.id}
                    clip={clip}
                    style={getClipStyle(clip)}
                    active={isClipActive(clip)}
                    framesCount={sortedFrames.length}
                    onDrag={handleDrag}
                    onResize={handleResize}
                    totalDuration={totalDuration}
                    frameTimings={frameTimings}
                  />
                ))}
                
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
        <span className="ml-auto italic text-muted-foreground/70">
          Drag clips to move • Drag edges to resize
        </span>
        <span>
          Total: {Math.floor(totalDuration / 60)}:{String(Math.floor(totalDuration % 60)).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}