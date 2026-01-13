import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Pencil, 
  RefreshCw, 
  Check, 
  X, 
  MapPin, 
  Sun, 
  Users, 
  Lightbulb,
  Loader2
} from 'lucide-react';

interface ExpandedScene {
  sceneNumber: number;
  heading: string;
  location: string;
  timeOfDay: string;
  description: string;
  characters: string[];
  dialogue: { character: string; text: string }[];
  lighting: string;
}

interface ExpandedSceneCardProps {
  scene: ExpandedScene;
  onUpdate: (scene: ExpandedScene) => void;
  onRegenerate: (sceneNumber: number) => Promise<void>;
  isRegenerating?: boolean;
}

export function ExpandedSceneCard({ 
  scene, 
  onUpdate, 
  onRegenerate,
  isRegenerating = false 
}: ExpandedSceneCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedScene, setEditedScene] = useState(scene);

  const handleSave = () => {
    onUpdate(editedScene);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedScene(scene);
    setIsEditing(false);
  };

  const handleRegenerate = async () => {
    await onRegenerate(scene.sceneNumber);
  };

  if (isRegenerating) {
    return (
      <Card className="border-primary/20 bg-card/50">
        <CardContent className="flex items-center justify-center py-8">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Regenerating scene...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group border-border/50 bg-card/50 transition-all hover:border-primary/30">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                Scene {scene.sceneNumber}
              </Badge>
              {isEditing ? (
                <Input
                  value={editedScene.heading}
                  onChange={(e) => setEditedScene({ ...editedScene, heading: e.target.value })}
                  className="h-7 text-sm font-medium"
                />
              ) : (
                <span className="text-sm font-medium">{scene.heading}</span>
              )}
            </div>
          </div>
          
          <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            {isEditing ? (
              <>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleSave}>
                  <Check className="h-3.5 w-3.5 text-green-500" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleCancel}>
                  <X className="h-3.5 w-3.5 text-destructive" />
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsEditing(true)}>
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleRegenerate}>
                  <RefreshCw className="h-3.5 w-3.5" />
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {/* Metadata row */}
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {isEditing ? (
              <Input
                value={editedScene.location}
                onChange={(e) => setEditedScene({ ...editedScene, location: e.target.value })}
                className="h-6 w-24 text-xs"
              />
            ) : (
              scene.location
            )}
          </span>
          <span className="flex items-center gap-1">
            <Sun className="h-3 w-3" />
            {isEditing ? (
              <Input
                value={editedScene.timeOfDay}
                onChange={(e) => setEditedScene({ ...editedScene, timeOfDay: e.target.value })}
                className="h-6 w-20 text-xs"
              />
            ) : (
              scene.timeOfDay
            )}
          </span>
          <span className="flex items-center gap-1">
            <Lightbulb className="h-3 w-3" />
            {isEditing ? (
              <Input
                value={editedScene.lighting}
                onChange={(e) => setEditedScene({ ...editedScene, lighting: e.target.value })}
                className="h-6 w-24 text-xs"
              />
            ) : (
              scene.lighting
            )}
          </span>
        </div>

        {/* Description */}
        {isEditing ? (
          <Textarea
            value={editedScene.description}
            onChange={(e) => setEditedScene({ ...editedScene, description: e.target.value })}
            className="min-h-[60px] text-sm"
          />
        ) : (
          <p className="text-sm text-foreground/90">{scene.description}</p>
        )}

        {/* Characters */}
        {scene.characters.length > 0 && (
          <div className="flex items-center gap-2">
            <Users className="h-3 w-3 text-muted-foreground" />
            <div className="flex flex-wrap gap-1">
              {scene.characters.map((char, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {char}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Dialogue preview */}
        {scene.dialogue.length > 0 && (
          <div className="rounded-md bg-muted/50 p-2 text-xs">
            {scene.dialogue.slice(0, 2).map((d, i) => (
              <p key={i} className="mb-1">
                <span className="font-medium text-primary">{d.character}:</span>{' '}
                <span className="text-muted-foreground">"{d.text}"</span>
              </p>
            ))}
            {scene.dialogue.length > 2 && (
              <p className="text-muted-foreground/60">+{scene.dialogue.length - 2} more lines...</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
