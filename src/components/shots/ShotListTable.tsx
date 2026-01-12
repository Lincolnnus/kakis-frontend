import { useState } from 'react';
import { Shot, CameraAngle, CameraMovement, Framing } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Plus, 
  Trash2, 
  Wand2, 
  Download, 
  ListChecks,
  GripVertical,
  Check,
  X,
  Edit2
} from 'lucide-react';
import { generateId } from '@/data/mockData';
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedShot, setEditedShot] = useState<Shot | null>(null);
  const { toast } = useToast();

  const sortedShots = [...shots]
    .filter(s => s.projectId === projectId)
    .sort((a, b) => a.shotNumber - b.shotNumber);

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

  const startEditing = (shot: Shot) => {
    setEditingId(shot.id);
    setEditedShot({ ...shot });
  };

  const saveEdit = () => {
    if (editedShot) {
      onUpdateShot(editedShot.id, editedShot);
      setEditingId(null);
      setEditedShot(null);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditedShot(null);
  };

  const formatLabel = (value: string) => {
    return value.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
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
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleAutoGenerate}>
            <Wand2 className="mr-2 h-4 w-4" />
            Auto-Generate
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button onClick={handleAddShot} className="gradient-primary">
            <Plus className="mr-2 h-4 w-4" />
            Add Shot
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card">
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
            {sortedShots.map((shot) => (
              <TableRow key={shot.id}>
                <TableCell>
                  <GripVertical className="h-4 w-4 cursor-grab text-muted-foreground" />
                </TableCell>
                <TableCell className="font-mono font-medium">{shot.shotNumber}</TableCell>
                
                {editingId === shot.id && editedShot ? (
                  <>
                    <TableCell>
                      <Select
                        value={editedShot.framing}
                        onValueChange={(v: Framing) => setEditedShot({ ...editedShot, framing: v })}
                      >
                        <SelectTrigger className="h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {FRAMINGS.map((f) => (
                            <SelectItem key={f} value={f}>{formatLabel(f)}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={editedShot.cameraAngle}
                        onValueChange={(v: CameraAngle) => setEditedShot({ ...editedShot, cameraAngle: v })}
                      >
                        <SelectTrigger className="h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {CAMERA_ANGLES.map((a) => (
                            <SelectItem key={a} value={a}>{formatLabel(a)}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={editedShot.lensType}
                        onValueChange={(v) => setEditedShot({ ...editedShot, lensType: v })}
                      >
                        <SelectTrigger className="h-8 w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {LENS_TYPES.map((l) => (
                            <SelectItem key={l} value={l}>{l}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={editedShot.cameraMovement}
                        onValueChange={(v: CameraMovement) => setEditedShot({ ...editedShot, cameraMovement: v })}
                      >
                        <SelectTrigger className="h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {CAMERA_MOVEMENTS.map((m) => (
                            <SelectItem key={m} value={m}>{formatLabel(m)}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        value={editedShot.notes}
                        onChange={(e) => setEditedShot({ ...editedShot, notes: e.target.value })}
                        className="h-8"
                        placeholder="Notes..."
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button size="icon" variant="ghost" className="h-8 w-8" onClick={saveEdit}>
                          <Check className="h-4 w-4 text-green-600" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8" onClick={cancelEdit}>
                          <X className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{formatLabel(shot.framing)}</TableCell>
                    <TableCell>{formatLabel(shot.cameraAngle)}</TableCell>
                    <TableCell>{shot.lensType}</TableCell>
                    <TableCell>{formatLabel(shot.cameraMovement)}</TableCell>
                    <TableCell className="max-w-[200px] truncate text-muted-foreground">
                      {shot.notes || '—'}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => startEditing(shot)}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-8 w-8 text-destructive" 
                          onClick={() => onDeleteShot(shot.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
