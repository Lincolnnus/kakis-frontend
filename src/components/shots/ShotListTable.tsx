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
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Shot, CameraAngle, CameraMovement, Framing } from '@/types';
import { SortableShotRow } from './SortableShotRow';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Plus, 
  Wand2, 
  Download, 
  ListChecks,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShotListTableProps {
  shots: Shot[];
  projectId: string;
  sceneIds: string[];
  onAddShot: (shot: Omit<Shot, 'id'>) => void;
  onUpdateShot: (id: string, updates: Partial<Shot>) => void;
  onDeleteShot: (id: string) => void;
}

const CAMERA_ANGLES: CameraAngle[] = [
  'eye-level',
  'high-angle',
  'low-angle',
  'birds-eye',
  'worms-eye',
  'dutch-angle',
  'over-the-shoulder',
];

const CAMERA_MOVEMENTS: CameraMovement[] = [
  'static',
  'pan-left',
  'pan-right',
  'tilt-up',
  'tilt-down',
  'dolly-in',
  'dolly-out',
  'tracking',
  'crane',
  'handheld',
];

const FRAMINGS: Framing[] = [
  'extreme-wide',
  'wide',
  'medium-wide',
  'medium',
  'medium-close-up',
  'close-up',
  'extreme-close-up',
];

const LENS_TYPES = ['14mm', '24mm', '35mm', '50mm', '85mm', '100mm', '135mm', '200mm'];

export function ShotListTable({
  shots,
  projectId,
  sceneIds,
  onAddShot,
  onUpdateShot,
  onDeleteShot,
}: ShotListTableProps) {
  const { toast } = useToast();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const sortedShots = [...shots]
    .filter(s => s.projectId === projectId)
    .sort((a, b) => a.shotNumber - b.shotNumber);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = sortedShots.findIndex((s) => s.id === active.id);
      const newIndex = sortedShots.findIndex((s) => s.id === over.id);

      const newOrder = arrayMove(sortedShots, oldIndex, newIndex);
      
      // Update shot numbers
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
    // Generate shots for each scene
    let shotNumber = sortedShots.length;
    sceneIds.forEach((sceneId) => {
      // Create 2-3 shots per scene
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

  const handleExportCSV = () => {
    const headers = ['Shot #', 'Framing', 'Camera Angle', 'Lens', 'Movement', 'Notes'];
    const rows = sortedShots.map(s => [
      s.shotNumber,
      s.framing,
      s.cameraAngle,
      s.lensType,
      s.cameraMovement,
      s.notes
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
        <div className="flex items-center gap-2">
          <ListChecks className="h-5 w-5 text-primary" />
          <span className="font-medium">{sortedShots.length} Shots</span>
          <span className="text-sm text-muted-foreground">• Drag to reorder</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleAutoGenerate}>
            <Wand2 className="mr-2 h-4 w-4" />
            Auto-Generate
          </Button>
          <Button variant="outline" onClick={handleExportCSV}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button onClick={handleAddShot} className="gradient-primary">
            <Plus className="mr-2 h-4 w-4" />
            Add Shot
          </Button>
        </div>
      </div>

      {/* Table with Drag and Drop */}
      <div className="rounded-lg border bg-card">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead className="w-16">Shot #</TableHead>
                <TableHead>Framing</TableHead>
                <TableHead>Camera Angle</TableHead>
                <TableHead>Lens</TableHead>
                <TableHead>Movement</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <SortableContext
                items={sortedShots.map(s => s.id)}
                strategy={verticalListSortingStrategy}
              >
                {sortedShots.map((shot) => (
                  <SortableShotRow
                    key={shot.id}
                    shot={shot}
                    onUpdate={onUpdateShot}
                    onDelete={onDeleteShot}
                    cameraAngles={CAMERA_ANGLES}
                    cameraMovements={CAMERA_MOVEMENTS}
                    framings={FRAMINGS}
                    lensTypes={LENS_TYPES}
                  />
                ))}
              </SortableContext>
            </TableBody>
          </Table>
        </DndContext>
      </div>
    </div>
  );
}
