import { useState } from 'react';
import { Scene } from '@/types';
import { SceneCard } from './SceneCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Layers, ArrowRight } from 'lucide-react';
import { generateId } from '@/data/mockData';
import { Link } from 'react-router-dom';

interface SceneListProps {
  scenes: Scene[];
  projectId: string;
  onUpdate: (id: string, updates: Partial<Scene>) => void;
  onDelete: (id: string) => void;
  onAdd: (scene: Omit<Scene, 'id'>) => void;
  onReorder: (sceneIds: string[]) => void;
}

export function SceneList({ scenes, projectId, onUpdate, onDelete, onAdd, onReorder }: SceneListProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const sortedScenes = [...scenes]
    .filter(s => s.projectId === projectId)
    .sort((a, b) => a.sceneNumber - b.sceneNumber);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newScenes = [...sortedScenes];
    const draggedScene = newScenes[draggedIndex];
    newScenes.splice(draggedIndex, 1);
    newScenes.splice(index, 0, draggedScene);
    
    onReorder(newScenes.map(s => s.id));
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleAddScene = () => {
    const newScene: Omit<Scene, 'id'> = {
      projectId,
      sceneNumber: sortedScenes.length + 1,
      heading: 'INT. NEW LOCATION - DAY',
      location: 'New Location',
      timeOfDay: 'Day',
      description: 'Add scene description here...',
      characters: [],
      dialogue: [],
    };
    onAdd(newScene);
  };

  if (sortedScenes.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <Layers className="mb-4 h-12 w-12 text-muted-foreground/50" />
          <h3 className="mb-2 text-lg font-medium">No Scenes Yet</h3>
          <p className="mb-4 text-center text-muted-foreground">
            Parse a script above or add scenes manually
          </p>
          <Button onClick={handleAddScene}>
            <Plus className="mr-2 h-4 w-4" />
            Add First Scene
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <Layers className="h-5 w-5" />
          Scenes ({sortedScenes.length})
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleAddScene}>
            <Plus className="mr-2 h-4 w-4" />
            Add Scene
          </Button>
          <Button className="gradient-primary" asChild>
            <Link to={`/project/${projectId}/storyboard`}>
              Generate Storyboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Drag scenes to reorder. Click on a scene to expand and edit details.
      </p>

      <div className="space-y-3">
        {sortedScenes.map((scene, index) => (
          <div
            key={scene.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
          >
            <SceneCard
              scene={scene}
              onUpdate={onUpdate}
              onDelete={onDelete}
              isDragging={draggedIndex === index}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
