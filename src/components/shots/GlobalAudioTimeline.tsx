import { useState, useRef, useCallback } from 'react';
import { Shot, StoryboardFrame } from '@/types';
import { Music, Volume2, GripVertical, Plus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AudioClip {
  id: string;
  name: string;
  type: 'music' | 'sfx';
  startShot: number; // Shot number where clip starts
  endShot: number;   // Shot number where clip ends
  color: string;
}

interface GlobalAudioTimelineProps {
  shots: Shot[];
  frames: StoryboardFrame[];
}

const INITIAL_AUDIO_CLIPS: AudioClip[] = [
  { id: 'm1', name: 'Main Theme - Orchestral', type: 'music', startShot: 1, endShot: 8, color: 'bg-amber-500' },
  { id: 'm2', name: 'Tension Build', type: 'music', startShot: 9, endShot: 12, color: 'bg-amber-600' },
  { id: 's1', name: 'Night Ambience', type: 'sfx', startShot: 1, endShot: 4, color: 'bg-emerald-500' },
  { id: 's2', name: 'Magical Shimmer', type: 'sfx', startShot: 3, endShot: 3, color: 'bg-emerald-600' },
  { id: 's3', name: 'Footsteps', type: 'sfx', startShot: 5, endShot: 7, color: 'bg-emerald-500' },
  { id: 's4', name: 'Wind Whoosh', type: 'sfx', startShot: 8, endShot: 10, color: 'bg-emerald-600' },
];

const TRACK_CONFIG = [
  { type: 'music' as const, label: 'Music', icon: Music, colorClass: 'text-amber-500' },
  { type: 'sfx' as const, label: 'SFX', icon: Volume2, colorClass: 'text-emerald-500' },
];

interface DraggableClipProps {
  clip: AudioClip;
  style: { left: string; width: string };
  shotsCount: number;
  onDrag: (clipId: string, deltaShots: number) => void;
  onResize: (clipId: string, edge: 'start' | 'end', deltaShots: number) => void;
}

function DraggableClip({ 
  clip, 
  style, 
  shotsCount,
  onDrag, 
  onResize
}: DraggableClipProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState<'start' | 'end' | null>(null);
  const dragStartX = useRef(0);

  const getShotFromX = useCallback((clientX: number) => {
    if (!containerRef.current) return 1;
    const parent = containerRef.current.closest('.track-lane') as HTMLElement;
    if (!parent) return 1;
    
    const rect = parent.getBoundingClientRect();
    const relativeX = clientX - rect.left;
    const percent = relativeX / rect.width;
    return Math.max(1, Math.min(shotsCount, Math.round(percent * shotsCount) + 1));
  }, [shotsCount]);

  const handleMouseDown = (e: React.MouseEvent, action: 'drag' | 'resize-start' | 'resize-end') => {
    e.preventDefault();
    e.stopPropagation();
    dragStartX.current = e.clientX;
    
    if (action === 'drag') {
      setIsDragging(true);
    } else {
      setIsResizing(action === 'resize-start' ? 'start' : 'end');
    }

    const initialStartShot = clip.startShot;
    const initialEndShot = clip.endShot;

    const handleMouseMove = (moveE: MouseEvent) => {
      const currentShot = getShotFromX(moveE.clientX);
      const startShotFromX = getShotFromX(dragStartX.current);
      const deltaShots = currentShot - startShotFromX;

      if (action === 'drag') {
        onDrag(clip.id, deltaShots);
      } else if (action === 'resize-start') {
        onResize(clip.id, 'start', deltaShots);
      } else {
        onResize(clip.id, 'end', deltaShots);
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
        isDragging && "cursor-grabbing z-10 ring-2 ring-white",
        isResizing && "z-10"
      )}
      style={style}
      title={`${clip.name} (Shots ${clip.startShot}-${clip.endShot})`}
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
    </div>
  );
}

export function GlobalAudioTimeline({ shots, frames }: GlobalAudioTimelineProps) {
  const [audioClips, setAudioClips] = useState<AudioClip[]>(INITIAL_AUDIO_CLIPS);

  const sortedShots = [...shots].sort((a, b) => a.shotNumber - b.shotNumber);
  const shotsCount = sortedShots.length;

  if (shotsCount === 0) return null;

  const getTrackClips = (type: 'music' | 'sfx') => 
    audioClips.filter(clip => clip.type === type && clip.startShot <= shotsCount);

  const getClipStyle = (clip: AudioClip) => {
    const clampedStart = Math.max(1, clip.startShot);
    const clampedEnd = Math.min(shotsCount, clip.endShot);
    const left = ((clampedStart - 1) / shotsCount) * 100;
    const width = ((clampedEnd - clampedStart + 1) / shotsCount) * 100;
    return { left: `${left}%`, width: `${Math.max(width, 3)}%` };
  };

  const handleDrag = useCallback((clipId: string, deltaShots: number) => {
    setAudioClips(prev => prev.map(clip => {
      if (clip.id !== clipId) return clip;
      
      const clipLength = clip.endShot - clip.startShot;
      let newStart = Math.max(1, clip.startShot + deltaShots);
      let newEnd = newStart + clipLength;
      
      if (newEnd > shotsCount) {
        newEnd = shotsCount;
        newStart = newEnd - clipLength;
      }
      
      return { ...clip, startShot: Math.max(1, newStart), endShot: newEnd };
    }));
  }, [shotsCount]);

  const handleResize = useCallback((clipId: string, edge: 'start' | 'end', deltaShots: number) => {
    setAudioClips(prev => prev.map(clip => {
      if (clip.id !== clipId) return clip;
      
      if (edge === 'start') {
        const newStart = Math.max(1, Math.min(clip.endShot, clip.startShot + deltaShots));
        return { ...clip, startShot: newStart };
      } else {
        const newEnd = Math.max(clip.startShot, Math.min(shotsCount, clip.endShot + deltaShots));
        return { ...clip, endShot: newEnd };
      }
    }));
  }, [shotsCount]);

  const getFrameForShot = (shot: Shot) => frames.find(f => f.id === shot.frameId);

  return (
    <div className="rounded-lg border bg-card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Music className="h-5 w-5 text-amber-500" />
          <h3 className="font-medium">Global Audio Tracks</h3>
          <span className="text-xs text-muted-foreground">(Music & SFX span across shots)</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Plus className="h-3 w-3 mr-1" />
            Add Track
          </Button>
          <Button variant="outline" size="sm">
            <Sparkles className="h-3 w-3 mr-1" />
            Generate
          </Button>
        </div>
      </div>

      {/* Shot Ruler */}
      <div className="relative">
        <div className="flex">
          {sortedShots.map((shot, index) => {
            const frame = getFrameForShot(shot);
            return (
              <div
                key={shot.id}
                className="flex-1 h-10 relative border-r border-border/50 last:border-r-0 bg-muted/30 overflow-hidden"
                style={{ minWidth: '40px' }}
              >
                {frame?.imageUrl && (
                  <img 
                    src={frame.imageUrl} 
                    alt="" 
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10px] font-medium text-foreground/80 bg-background/50 px-1 rounded">
                    {shot.shotNumber}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Audio Tracks */}
      <div className="space-y-2">
        {TRACK_CONFIG.map(({ type, label, icon: Icon, colorClass }) => {
          const clips = getTrackClips(type);
          
          return (
            <div key={type} className="flex items-stretch gap-2">
              {/* Track Label */}
              <div className="w-20 shrink-0 flex items-center gap-2 px-2 py-1 bg-muted/30 rounded-l border-r">
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
                    shotsCount={shotsCount}
                    onDrag={handleDrag}
                    onResize={handleResize}
                  />
                ))}
                
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
      <div className="flex items-center gap-4 text-xs text-muted-foreground border-t pt-3">
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
      </div>
    </div>
  );
}
