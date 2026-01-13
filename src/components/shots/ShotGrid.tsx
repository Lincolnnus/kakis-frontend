import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { Shot, StoryboardFrame, CameraAngle, CameraMovement, Framing } from '@/types';
import { ShotCard } from './ShotCard';
import { GlobalAudioTimeline } from './GlobalAudioTimeline';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Plus, 
  Wand2, 
  Download, 
  ListChecks,
  Grid3X3,
  LayoutList,
  Mic,
  Volume2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShotGridProps {
  shots: Shot[];
  frames: StoryboardFrame[];
  projectId: string;
  sceneIds: string[];
  onAddShot: (shot: Omit<Shot, 'id'>) => void;
  onUpdateShot: (id: string, updates: Partial<Shot>) => void;
  onDeleteShot: (id: string) => void;
}

const CAMERA_ANGLES: CameraAngle[] = [
  'eye-level', 'high-angle', 'low-angle', 'birds-eye', 
  'worms-eye', 'dutch-angle', 'over-the-shoulder',
];

const CAMERA_MOVEMENTS: CameraMovement[] = [
  'static', 'pan-left', 'pan-right', 'tilt-up', 'tilt-down',
  'dolly-in', 'dolly-out', 'tracking', 'crane', 'handheld',
];

const FRAMINGS: Framing[] = [
  'extreme-wide', 'wide', 'medium-wide', 'medium',
  'medium-close-up', 'close-up', 'extreme-close-up',
];

const LENS_TYPES = ['14mm', '24mm', '35mm', '50mm', '85mm', '100mm', '135mm', '200mm'];

export function ShotGrid({
  shots,
  frames,
  projectId,
  sceneIds,
  onAddShot,
  onUpdateShot,
  onDeleteShot,
}: ShotGridProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { toast } = useToast();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const sortedShots = [...shots]
    .filter(s => s.projectId === projectId)
    .sort((a, b) => a.shotNumber - b.shotNumber);

  const getFrameForShot = (shot: Shot) => {
    return frames.find(f => f.id === shot.frameId);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = sortedShots.findIndex((s) => s.id === active.id);
      const newIndex = sortedShots.findIndex((s) => s.id === over.id);

      const newOrder = arrayMove(sortedShots, oldIndex, newIndex);
      
      newOrder.forEach((shot, index) => {
        onUpdateShot(shot.id, { shotNumber: index + 1 });
      });

      toast({
        title: 'Shots reordered',
        description: `Moved shot ${oldIndex + 1} to position ${newIndex + 1}`,
      });
    }
  };

  const handleAddShot = () => {
    const newShot: Omit<Shot, 'id'> = {
      projectId,
      shotNumber: sortedShots.length + 1,
      sceneId: sceneIds[0] || '',
      cameraAngle: 'eye-level',
      lensType: '50mm',
      cameraMovement: 'static',
      framing: 'medium',
      notes: '',
    };
    onAddShot(newShot);
    toast({ title: 'Shot added', description: `Shot ${newShot.shotNumber} created.` });
  };

  const handleAutoGenerate = () => {
    let shotNumber = sortedShots.length;
    sceneIds.forEach((sceneId) => {
      const shotsPerScene = 2 + Math.floor(Math.random() * 2);
      for (let i = 0; i < shotsPerScene; i++) {
        shotNumber++;
        const newShot: Omit<Shot, 'id'> = {
          projectId,
          shotNumber,
          sceneId,
          cameraAngle: CAMERA_ANGLES[Math.floor(Math.random() * CAMERA_ANGLES.length)],
          lensType: LENS_TYPES[Math.floor(Math.random() * LENS_TYPES.length)],
          cameraMovement: CAMERA_MOVEMENTS[Math.floor(Math.random() * CAMERA_MOVEMENTS.length)],
          framing: FRAMINGS[Math.floor(Math.random() * FRAMINGS.length)],
          notes: i === 0 ? 'Establishing shot' : '',
        };
        onAddShot(newShot);
      }
    });
    toast({ 
      title: 'Shots generated!', 
      description: `Created ${shotNumber - sortedShots.length} shots from scenes.` 
    });
  };

  const handleGenerateAllAudio = () => {
    toast({
      title: 'Audio generation started',
      description: 'Generating dialogue, music, and SFX for all shots...',
    });
    // Mock - would call ElevenLabs APIs with Cloud enabled
    setTimeout(() => {
      toast({
        title: 'Audio generated!',
        description: `Generated audio for ${sortedShots.length} shots.`,
      });
    }, 2000);
  };

  const handleExportCSV = () => {
    const headers = ['Shot #', 'Framing', 'Camera Angle', 'Lens', 'Movement', 'Notes'];
    const rows = sortedShots.map(s => [
      s.shotNumber, s.framing, s.cameraAngle, s.lensType, s.cameraMovement, s.notes
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'shot-list.csv';
    a.click();
    
    toast({ title: 'Exported!', description: 'Shot list downloaded as CSV.' });
  };

  if (sortedShots.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <ListChecks className="mb-4 h-12 w-12 text-muted-foreground/50" />
          <h3 className="mb-2 text-lg font-medium">No Shots Yet</h3>
          <p className="mb-4 text-center text-muted-foreground">
            Generate shots from your scenes or add them manually
          </p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleAddShot}>
              <Plus className="mr-2 h-4 w-4" />
              Add Shot
            </Button>
            {sceneIds.length > 0 && (
              <Button onClick={handleAutoGenerate} className="gradient-primary">
                <Wand2 className="mr-2 h-4 w-4" />
                Auto-Generate from Scenes
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border bg-card p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <ListChecks className="h-5 w-5 text-primary" />
            <span className="font-medium">{sortedShots.length} Shots</span>
          </div>
          
          <div className="flex rounded-md border">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="sm"
              className="rounded-r-none"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="sm"
              className="rounded-l-none"
              onClick={() => setViewMode('list')}
            >
              <LayoutList className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={handleAutoGenerate}>
            <Wand2 className="mr-2 h-4 w-4" />
            Auto-Generate
          </Button>
        </div>
      </div>

      {/* Shot Grid/List */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sortedShots.map(s => s.id)}
          strategy={rectSortingStrategy}
        >
          <div className={
            viewMode === 'grid'
              ? 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'grid gap-4 grid-cols-1 lg:grid-cols-2'
          }>
            {sortedShots.map((shot) => (
              <ShotCard
                key={shot.id}
                shot={shot}
                frame={getFrameForShot(shot)}
                onUpdate={onUpdateShot}
                onDelete={onDeleteShot}
                cameraAngles={CAMERA_ANGLES}
                cameraMovements={CAMERA_MOVEMENTS}
                framings={FRAMINGS}
                lensTypes={LENS_TYPES}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* Global Audio Timeline - Music & SFX across shots */}
      <GlobalAudioTimeline shots={sortedShots} frames={frames} />

      {/* Summary */}
      <div className="flex items-center justify-between rounded-lg border bg-muted/50 p-4 text-sm">
        <div className="flex items-center gap-4 text-muted-foreground">
          <span>{sortedShots.length} shots</span>
          <span className="flex items-center gap-1">
            <Mic className="h-3 w-3" />
            Dialogue: per shot
          </span>
          <span className="flex items-center gap-1">
            <Volume2 className="h-3 w-3" />
            Music/SFX: timeline above
          </span>
        </div>
        <span className="text-xs text-muted-foreground">Drag cards to reorder</span>
      </div>
    </div>
  );
}
