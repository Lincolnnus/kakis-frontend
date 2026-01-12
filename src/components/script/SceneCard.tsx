import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Scene } from '@/types';
import { 
  GripVertical, 
  ChevronDown, 
  ChevronUp, 
  Edit2, 
  Check, 
  X, 
  MapPin, 
  Clock, 
  Users,
  MessageSquare,
  Trash2
} from 'lucide-react';

interface SceneCardProps {
  scene: Scene;
  onUpdate: (id: string, updates: Partial<Scene>) => void;
  onDelete: (id: string) => void;
  isDragging?: boolean;
}

export function SceneCard({ scene, onUpdate, onDelete, isDragging }: SceneCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedScene, setEditedScene] = useState(scene);

  const handleSave = () => {
    onUpdate(scene.id, editedScene);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedScene(scene);
    setIsEditing(false);
  };

  return (
    <Card 
      className={`transition-all ${isDragging ? 'rotate-2 scale-105 shadow-xl' : ''} ${
        isEditing ? 'ring-2 ring-primary' : ''
      }`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start gap-3">
          <div className="mt-1 cursor-grab text-muted-foreground hover:text-foreground">
            <GripVertical className="h-5 w-5" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="font-mono">
                {scene.sceneNumber}
              </Badge>
              
              {isEditing ? (
                <Input
                  value={editedScene.heading}
                  onChange={(e) => setEditedScene({ ...editedScene, heading: e.target.value })}
                  className="h-8 font-mono text-sm"
                />
              ) : (
                <span className="font-mono text-sm font-medium">{scene.heading}</span>
              )}
            </div>
            
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {isEditing ? (
                  <Input
                    value={editedScene.location}
                    onChange={(e) => setEditedScene({ ...editedScene, location: e.target.value })}
                    className="h-6 w-32 text-xs"
                  />
                ) : (
                  scene.location
                )}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {isEditing ? (
                  <Input
                    value={editedScene.timeOfDay}
                    onChange={(e) => setEditedScene({ ...editedScene, timeOfDay: e.target.value })}
                    className="h-6 w-24 text-xs"
                  />
                ) : (
                  scene.timeOfDay
                )}
              </div>
              {scene.characters.length > 0 && (
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {scene.characters.join(', ')}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            {isEditing ? (
              <>
                <Button size="icon" variant="ghost" className="h-8 w-8" onClick={handleSave}>
                  <Check className="h-4 w-4 text-green-600" />
                </Button>
                <Button size="icon" variant="ghost" className="h-8 w-8" onClick={handleCancel}>
                  <X className="h-4 w-4 text-destructive" />
                </Button>
              </>
            ) : (
              <>
                <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setIsEditing(true)}>
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={() => onDelete(scene.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardContent className="pt-0">
          {/* Description preview/edit */}
          <div className="mb-3">
            {isEditing ? (
              <Textarea
                value={editedScene.description}
                onChange={(e) => setEditedScene({ ...editedScene, description: e.target.value })}
                className="min-h-[80px] text-sm"
                placeholder="Scene description..."
              />
            ) : (
              <p className="line-clamp-2 text-sm text-muted-foreground">
                {scene.description || 'No description'}
              </p>
            )}
          </div>
          
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-full">
              {isOpen ? (
                <>
                  <ChevronUp className="mr-2 h-4 w-4" />
                  Hide Details
                </>
              ) : (
                <>
                  <ChevronDown className="mr-2 h-4 w-4" />
                  Show Details ({scene.dialogue.length} dialogue lines)
                </>
              )}
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="mt-4 space-y-3">
            {scene.dialogue.length > 0 ? (
              <div className="space-y-2">
                <h4 className="flex items-center gap-2 text-sm font-medium">
                  <MessageSquare className="h-4 w-4" />
                  Dialogue
                </h4>
                {scene.dialogue.map((line) => (
                  <div key={line.id} className="rounded-lg bg-muted/50 p-3">
                    <div className="mb-1 text-xs font-semibold uppercase text-primary">
                      {line.character}
                      {line.parenthetical && (
                        <span className="ml-2 font-normal normal-case text-muted-foreground">
                          ({line.parenthetical})
                        </span>
                      )}
                    </div>
                    <p className="text-sm">{line.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-sm text-muted-foreground">
                No dialogue in this scene
              </p>
            )}
          </CollapsibleContent>
        </CardContent>
      </Collapsible>
    </Card>
  );
}
