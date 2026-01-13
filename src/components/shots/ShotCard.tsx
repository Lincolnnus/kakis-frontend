import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Shot, StoryboardFrame } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  GripVertical, 
  Edit2, 
  Trash2, 
  Play, 
  Pause,
  Volume2,
  VolumeX,
  Mic,
  Sparkles,
  Camera,
  Move,
  ImageIcon
} from 'lucide-react';
import { CameraAngle, CameraMovement, Framing } from '@/types';

interface ShotCardProps {
  shot: Shot;
  frame?: StoryboardFrame;
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

const PLACEHOLDER_COLORS = [
  'from-violet-500/20 to-purple-500/20',
  'from-blue-500/20 to-cyan-500/20',
  'from-emerald-500/20 to-teal-500/20',
  'from-orange-500/20 to-amber-500/20',
  'from-pink-500/20 to-rose-500/20',
];

export function ShotCard({ 
  shot, 
  frame,
  onUpdate, 
  onDelete,
  cameraAngles,
  cameraMovements,
  framings,
  lensTypes
}: ShotCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedShot, setEditedShot] = useState(shot);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioVolume, setAudioVolume] = useState(80);

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
  };

  const placeholderColor = PLACEHOLDER_COLORS[shot.shotNumber % PLACEHOLDER_COLORS.length];

  const handleSave = () => {
    onUpdate(shot.id, editedShot);
    setIsEditing(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // Mock playback - in real implementation would play audio
  };

  return (
    <>
      <Card 
        ref={setNodeRef} 
        style={style} 
        className={`group overflow-hidden transition-all hover:shadow-lg ${isDragging ? 'ring-2 ring-primary' : ''}`}
      >
        {/* Image/Video Area */}
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          {frame?.imageUrl ? (
            <img
              src={frame.imageUrl}
              alt={`Shot ${shot.shotNumber}`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${placeholderColor}`}>
              <div className="flex flex-col items-center gap-2 p-4 text-center">
                <ImageIcon className="h-8 w-8 text-muted-foreground/50" />
                <span className="text-xs text-muted-foreground">No frame linked</span>
              </div>
            </div>
          )}

          {/* Drag Handle */}
          <div
            {...attributes}
            {...listeners}
            className="absolute left-2 top-2 cursor-grab rounded bg-background/80 p-1 opacity-0 shadow-sm backdrop-blur-sm transition-opacity group-hover:opacity-100 active:cursor-grabbing"
          >
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </div>

          {/* Shot Number Badge */}
          <Badge className="absolute right-2 top-2 bg-background/80 backdrop-blur-sm">
            Shot {shot.shotNumber}
          </Badge>

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Button 
              size="icon" 
              variant="secondary" 
              className="h-12 w-12 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
            </Button>
          </div>

          {/* Camera Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-8">
            <div className="flex flex-wrap gap-2 text-xs text-white/90">
              <span className="flex items-center gap-1">
                <Camera className="h-3 w-3" />
                {formatLabel(shot.framing)}
              </span>
              <span className="flex items-center gap-1">
                <Move className="h-3 w-3" />
                {formatLabel(shot.cameraMovement)}
              </span>
              <span>{shot.lensType}</span>
            </div>
          </div>
        </div>

        {/* Audio Controls - Dialogue Only (shot-level) */}
        <CardContent className="p-3 space-y-3">
          {/* Dialogue Track - Shot Level */}
          <div className="flex items-center gap-2 rounded-lg bg-primary/10 border border-primary/20 p-2">
            <Mic className="h-4 w-4 text-primary" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium">Dialogue</p>
              <p className="text-xs text-muted-foreground truncate">
                {frame?.dialogue || 'No dialogue for this shot'}
              </p>
            </div>
            <Button size="icon" variant="ghost" className="h-6 w-6 shrink-0" title="Generate with AI">
              <Sparkles className="h-3 w-3" />
            </Button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-6 w-6"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
            </Button>
            <Slider
              value={[isMuted ? 0 : audioVolume]}
              max={100}
              step={1}
              className="flex-1"
              onValueChange={([v]) => setAudioVolume(v)}
            />
            <span className="text-xs text-muted-foreground w-8">{isMuted ? 0 : audioVolume}%</span>
          </div>

          {/* Actions */}
          <div className="flex justify-between pt-1">
            <p className="text-xs text-muted-foreground">
              {shot.notes?.replace(/music:.*?(,|$)/, '').replace(/sfx:.*?(,|$)/, '').trim() || formatLabel(shot.cameraAngle)}
            </p>
            <div className="flex gap-1">
              <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setIsEditing(true)}>
                <Edit2 className="h-3 w-3" />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-7 w-7 text-destructive" 
                onClick={() => onDelete(shot.id)}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Shot {shot.shotNumber}</DialogTitle>
            <DialogDescription>
              Configure camera settings and audio tracks
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Framing</Label>
                <Select
                  value={editedShot.framing}
                  onValueChange={(v: Framing) => setEditedShot({ ...editedShot, framing: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {framings.map((f) => (
                      <SelectItem key={f} value={f}>{formatLabel(f)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Camera Angle</Label>
                <Select
                  value={editedShot.cameraAngle}
                  onValueChange={(v: CameraAngle) => setEditedShot({ ...editedShot, cameraAngle: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {cameraAngles.map((a) => (
                      <SelectItem key={a} value={a}>{formatLabel(a)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Lens</Label>
                <Select
                  value={editedShot.lensType}
                  onValueChange={(v) => setEditedShot({ ...editedShot, lensType: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {lensTypes.map((l) => (
                      <SelectItem key={l} value={l}>{l}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Movement</Label>
                <Select
                  value={editedShot.cameraMovement}
                  onValueChange={(v: CameraMovement) => setEditedShot({ ...editedShot, cameraMovement: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {cameraMovements.map((m) => (
                      <SelectItem key={m} value={m}>{formatLabel(m)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Notes</Label>
              <Input
                value={editedShot.notes}
                onChange={(e) => setEditedShot({ ...editedShot, notes: e.target.value })}
                placeholder="Director notes..."
              />
            </div>

            <div className="space-y-3 rounded-lg border p-3">
              <h4 className="font-medium text-sm flex items-center gap-2">
                <Volume2 className="h-4 w-4" />
                Audio Configuration
              </h4>
              <div className="space-y-2">
                <Label className="text-xs">Music Mood</Label>
                <Select defaultValue="none">
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="Select mood..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="tense">Tense / Suspenseful</SelectItem>
                    <SelectItem value="romantic">Romantic</SelectItem>
                    <SelectItem value="action">Action / Energetic</SelectItem>
                    <SelectItem value="sad">Melancholic</SelectItem>
                    <SelectItem value="happy">Uplifting</SelectItem>
                    <SelectItem value="ambient">Ambient / Atmospheric</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Sound Effects</Label>
                <Input 
                  placeholder="e.g., footsteps, rain, cafe ambience..."
                  className="h-8"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="destructive" onClick={() => onDelete(shot.id)} className="mr-auto">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="gradient-primary">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
