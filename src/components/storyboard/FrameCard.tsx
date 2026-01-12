import { useState } from 'react';
import { StoryboardFrame, FrameStyle } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
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
  Wand2, 
  Loader2, 
  Edit2, 
  Trash2, 
  Camera, 
  Move, 
  MessageSquare,
  StickyNote,
  RefreshCw,
  ImageIcon
} from 'lucide-react';

interface FrameCardProps {
  frame: StoryboardFrame;
  onUpdate: (id: string, updates: Partial<StoryboardFrame>) => void;
  onDelete: (id: string) => void;
  onGenerate: (id: string, prompt: string, style: FrameStyle) => Promise<void>;
  sceneHeading?: string;
}

const PLACEHOLDER_COLORS = [
  'from-violet-500/20 to-purple-500/20',
  'from-blue-500/20 to-cyan-500/20',
  'from-emerald-500/20 to-teal-500/20',
  'from-orange-500/20 to-amber-500/20',
  'from-pink-500/20 to-rose-500/20',
];

export function FrameCard({ frame, onUpdate, onDelete, onGenerate, sceneHeading }: FrameCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [editedFrame, setEditedFrame] = useState(frame);
  const [generationPrompt, setGenerationPrompt] = useState(frame.description);

  const placeholderColor = PLACEHOLDER_COLORS[frame.frameNumber % PLACEHOLDER_COLORS.length];

  const handleSave = () => {
    onUpdate(frame.id, editedFrame);
    setIsEditing(false);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      await onGenerate(frame.id, generationPrompt, frame.style);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerate = async () => {
    setIsGenerating(true);
    try {
      await onGenerate(frame.id, frame.description, frame.style);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
        {/* Frame Image Area */}
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          {frame.imageUrl ? (
            <img
              src={frame.imageUrl}
              alt={`Frame ${frame.frameNumber}`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${placeholderColor}`}>
              {isGenerating || frame.isGenerating ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="text-xs text-muted-foreground">Generating...</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 p-4 text-center">
                  <ImageIcon className="h-8 w-8 text-muted-foreground/50" />
                  <span className="text-xs text-muted-foreground">Click Generate</span>
                </div>
              )}
            </div>
          )}

          {/* Frame Number Badge */}
          <Badge className="absolute left-2 top-2 bg-background/80 backdrop-blur-sm">
            {frame.frameNumber}
          </Badge>

          {/* Style Badge */}
          <Badge variant="secondary" className="absolute right-2 top-2 bg-background/80 text-xs backdrop-blur-sm">
            {frame.style}
          </Badge>

          {/* Hover Actions */}
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
            {frame.imageUrl ? (
              <Button size="sm" variant="secondary" onClick={handleRegenerate} disabled={isGenerating}>
                <RefreshCw className={`mr-1 h-3 w-3 ${isGenerating ? 'animate-spin' : ''}`} />
                Regenerate
              </Button>
            ) : (
              <Button size="sm" onClick={handleGenerate} disabled={isGenerating} className="gradient-primary">
                <Wand2 className="mr-1 h-3 w-3" />
                Generate
              </Button>
            )}
            <Button size="sm" variant="secondary" onClick={() => setIsEditing(true)}>
              <Edit2 className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Frame Info */}
        <CardContent className="p-3">
          <p className="mb-2 line-clamp-2 text-sm">{frame.description}</p>
          
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            {frame.cameraAngle && (
              <div className="flex items-center gap-1">
                <Camera className="h-3 w-3" />
                {frame.cameraAngle}
              </div>
            )}
            {frame.cameraMovement && (
              <div className="flex items-center gap-1">
                <Move className="h-3 w-3" />
                {frame.cameraMovement}
              </div>
            )}
          </div>

          {frame.dialogue && (
            <div className="mt-2 flex items-start gap-1 rounded bg-muted p-2 text-xs">
              <MessageSquare className="mt-0.5 h-3 w-3 flex-shrink-0" />
              <span className="line-clamp-2">{frame.dialogue}</span>
            </div>
          )}

          {frame.notes && (
            <div className="mt-2 flex items-start gap-1 text-xs text-muted-foreground">
              <StickyNote className="mt-0.5 h-3 w-3 flex-shrink-0" />
              <span className="line-clamp-1">{frame.notes}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Frame {frame.frameNumber}</DialogTitle>
            <DialogDescription>
              {sceneHeading || 'Update frame details and generation settings'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Description / Generation Prompt</Label>
              <Textarea
                value={editedFrame.description}
                onChange={(e) => {
                  setEditedFrame({ ...editedFrame, description: e.target.value });
                  setGenerationPrompt(e.target.value);
                }}
                placeholder="Describe what should appear in this frame..."
                className="min-h-[80px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Camera Angle</Label>
                <Input
                  value={editedFrame.cameraAngle}
                  onChange={(e) => setEditedFrame({ ...editedFrame, cameraAngle: e.target.value })}
                  placeholder="e.g., Wide, Close-up, OTS"
                />
              </div>
              <div className="space-y-2">
                <Label>Camera Movement</Label>
                <Input
                  value={editedFrame.cameraMovement}
                  onChange={(e) => setEditedFrame({ ...editedFrame, cameraMovement: e.target.value })}
                  placeholder="e.g., Static, Pan, Dolly"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Style</Label>
              <Select
                value={editedFrame.style}
                onValueChange={(value: FrameStyle) => setEditedFrame({ ...editedFrame, style: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="realistic">Realistic</SelectItem>
                  <SelectItem value="illustrated">Illustrated</SelectItem>
                  <SelectItem value="sketch">Sketch</SelectItem>
                  <SelectItem value="anime">Anime</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Dialogue</Label>
              <Input
                value={editedFrame.dialogue || ''}
                onChange={(e) => setEditedFrame({ ...editedFrame, dialogue: e.target.value })}
                placeholder="Character dialogue for this frame..."
              />
            </div>

            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea
                value={editedFrame.notes}
                onChange={(e) => setEditedFrame({ ...editedFrame, notes: e.target.value })}
                placeholder="Director notes, references, etc..."
                className="min-h-[60px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Duration (seconds)</Label>
              <Input
                type="number"
                min={1}
                max={30}
                value={editedFrame.duration}
                onChange={(e) => setEditedFrame({ ...editedFrame, duration: parseInt(e.target.value) || 2 })}
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="destructive" onClick={() => onDelete(frame.id)} className="mr-auto">
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
