import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Skeleton } from '@/components/ui/skeleton';
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
  Trash2,
  Sun,
  Sparkles
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
  const [isGeneratingBg, setIsGeneratingBg] = useState(false);
  const [mockBgGenerated, setMockBgGenerated] = useState(!!scene.backgroundImageUrl);

  // Auto-generate background on mount if not already generated
  useEffect(() => {
    if (!mockBgGenerated && !scene.backgroundImageUrl) {
      setIsGeneratingBg(true);
      const timer = setTimeout(() => {
        setIsGeneratingBg(false);
        setMockBgGenerated(true);
        // Update scene with mock background and lighting
        onUpdate(scene.id, {
          backgroundImageUrl: getMockBackgroundUrl(scene),
          lighting: getMockLighting(scene),
        });
      }, 1200 + Math.random() * 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSave = () => {
    onUpdate(scene.id, editedScene);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedScene(scene);
    setIsEditing(false);
  };

  // Mock background URLs based on scene location/time
  function getMockBackgroundUrl(scene: Scene): string {
    const locationKey = scene.location.toLowerCase();
    const timeKey = scene.timeOfDay.toLowerCase();
    
    // Return gradient placeholders that represent the scene mood
    if (timeKey.includes('night')) {
      return 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=200&fit=crop';
    } else if (timeKey.includes('sunrise') || timeKey.includes('sunset')) {
      return 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=400&h=200&fit=crop';
    } else if (locationKey.includes('forest') || locationKey.includes('garden')) {
      return 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=200&fit=crop';
    } else if (locationKey.includes('city') || locationKey.includes('ruin')) {
      return 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=400&h=200&fit=crop';
    } else if (locationKey.includes('cloud') || locationKey.includes('sky')) {
      return 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=400&h=200&fit=crop';
    } else if (locationKey.includes('room') || locationKey.includes('bedroom') || locationKey.includes('den')) {
      return 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=200&fit=crop';
    } else {
      return 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop';
    }
  }

  // Mock lighting descriptions based on time of day
  function getMockLighting(scene: Scene): string {
    const time = scene.timeOfDay.toLowerCase();
    const location = scene.location.toLowerCase();
    
    if (time.includes('night')) {
      if (location.includes('cloud') || location.includes('star')) {
        return 'Ethereal starlight with soft constellation glows, deep blue ambient';
      }
      return 'Cool moonlight through window, soft shadows, warm lamp accents';
    } else if (time.includes('sunrise')) {
      return 'Golden hour warmth, long shadows, pink and orange sky gradients';
    } else if (time.includes('sunset')) {
      return 'Rich amber light, dramatic shadows, warm color temperature';
    } else if (time.includes('morning')) {
      return 'Soft diffused daylight, gentle shadows, neutral color balance';
    } else {
      return 'Bright natural daylight, defined shadows, balanced exposure';
    }
  }

  const displayBgUrl = scene.backgroundImageUrl || (mockBgGenerated ? getMockBackgroundUrl(scene) : undefined);
  const displayLighting = scene.lighting || (mockBgGenerated ? getMockLighting(scene) : undefined);

  return (
    <Card 
      className={`transition-all overflow-hidden ${isDragging ? 'rotate-2 scale-105 shadow-xl' : ''} ${
        isEditing ? 'ring-2 ring-primary' : ''
      }`}
    >
      {/* Background Image Preview */}
      <div className="relative h-32 w-full bg-muted overflow-hidden">
        {isGeneratingBg ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted">
            <Sparkles className="h-6 w-6 text-primary animate-pulse mb-2" />
            <p className="text-xs text-muted-foreground">Generating background...</p>
          </div>
        ) : displayBgUrl ? (
          <>
            <img 
              src={displayBgUrl} 
              alt={`${scene.location} background`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
            
            {/* Lighting Badge */}
            {displayLighting && (
              <div className="absolute bottom-2 left-2 right-2">
                <div className="flex items-start gap-1.5 rounded-md bg-background/80 backdrop-blur-sm px-2 py-1.5">
                  <Sun className="h-3 w-3 text-amber-500 mt-0.5 shrink-0" />
                  <p className="text-xs text-muted-foreground line-clamp-2">{displayLighting}</p>
                </div>
              </div>
            )}
            
            {/* AI Generated Badge */}
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="text-[10px] bg-background/80 backdrop-blur-sm">
                <Sparkles className="h-2.5 w-2.5 mr-1" />
                AI Background
              </Badge>
            </div>
          </>
        ) : (
          <Skeleton className="w-full h-full" />
        )}
      </div>

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
