import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Shot, CameraAngle, CameraMovement, Framing } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TableCell, TableRow } from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { GripVertical, Edit2, Trash2, Check, X } from 'lucide-react';
import { useState } from 'react';

interface SortableShotRowProps {
  shot: Shot;
  onUpdate: (id: string, updates: Partial<Shot>) => void;
  onDelete: (id: string) => void;
  cameraAngles: CameraAngle[];
  cameraMovements: CameraMovement[];
  framings: Framing[];
  lensTypes: string[];
}

const formatLabel = (value: string) => {
  return value.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
};

export function SortableShotRow({ 
  shot, 
  onUpdate, 
  onDelete,
  cameraAngles,
  cameraMovements,
  framings,
  lensTypes
}: SortableShotRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedShot, setEditedShot] = useState<Shot>(shot);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: shot.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 'auto',
  };

  const startEditing = () => {
    setIsEditing(true);
    setEditedShot({ ...shot });
  };

  const saveEdit = () => {
    onUpdate(shot.id, editedShot);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditedShot(shot);
  };

  return (
    <TableRow ref={setNodeRef} style={style} className={isDragging ? 'bg-muted' : ''}>
      <TableCell>
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </div>
      </TableCell>
      <TableCell className="font-mono font-medium">{shot.shotNumber}</TableCell>
      
      {isEditing ? (
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
                {framings.map((f) => (
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
                {cameraAngles.map((a) => (
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
                {lensTypes.map((l) => (
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
                {cameraMovements.map((m) => (
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
              <Button size="icon" variant="ghost" className="h-8 w-8" onClick={startEditing}>
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-8 w-8 text-destructive" 
                onClick={() => onDelete(shot.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </TableCell>
        </>
      )}
    </TableRow>
  );
}
