import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { StoryboardFrame, FrameStyle } from '@/types';
import { FrameCard } from './FrameCard';
import { GripVertical } from 'lucide-react';

interface SortableFrameCardProps {
  frame: StoryboardFrame;
  onUpdate: (id: string, updates: Partial<StoryboardFrame>) => void;
  onDelete: (id: string) => void;
  onGenerate: (id: string, prompt: string, style: FrameStyle) => Promise<void>;
  sceneHeading?: string;
  sceneNumber?: number;
  frameInScene?: number;
}

export function SortableFrameCard({ frame, onUpdate, onDelete, onGenerate, sceneHeading, sceneNumber, frameInScene }: SortableFrameCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: frame.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 'auto',
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute -left-1 top-1/2 z-10 -translate-y-1/2 cursor-grab rounded bg-background/80 p-1 opacity-0 shadow-sm backdrop-blur-sm transition-opacity hover:opacity-100 group-hover:opacity-100 active:cursor-grabbing md:-left-3"
        style={{ opacity: isDragging ? 1 : undefined }}
      >
        <GripVertical className="h-5 w-5 text-muted-foreground" />
      </div>
      
      <FrameCard
        frame={frame}
        onUpdate={onUpdate}
        onDelete={onDelete}
        onGenerate={onGenerate}
        sceneHeading={sceneHeading}
        sceneNumber={sceneNumber}
        frameInScene={frameInScene}
      />
    </div>
  );
}
