// Core types for AI Storyboard Creator

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  createdAt: Date;
  updatedAt: Date;
  frameCount: number;
  status: 'draft' | 'in-progress' | 'completed';
}

export interface Scene {
  id: string;
  projectId: string;
  sceneNumber: number;
  heading: string;
  location: string;
  timeOfDay: string;
  description: string;
  characters: string[];
  dialogue: DialogueLine[];
  backgroundImageUrl?: string;
  lighting?: string;
}

export interface DialogueLine {
  id: string;
  character: string;
  text: string;
  parenthetical?: string;
}

export interface StoryboardFrame {
  id: string;
  sceneId: string;
  shotId?: string; // Optional: groups multiple frames within the same shot
  frameNumber: number;
  imageUrl?: string;
  description: string;
  cameraAngle: string;
  cameraMovement: string;
  dialogue?: string;
  notes: string;
  duration: number; // in seconds for animatic
  style: FrameStyle;
  isGenerating?: boolean;
}

export type FrameStyle = 'realistic' | 'illustrated' | 'sketch' | 'anime';

export interface Shot {
  id: string;
  projectId: string;
  shotNumber: number;
  frameId?: string;
  sceneId: string;
  cameraAngle: CameraAngle;
  lensType: string;
  cameraMovement: CameraMovement;
  framing: Framing;
  notes: string;
}

export type CameraAngle = 
  | 'eye-level' 
  | 'high-angle' 
  | 'low-angle' 
  | 'birds-eye' 
  | 'worms-eye' 
  | 'dutch-angle'
  | 'over-the-shoulder';

export type CameraMovement = 
  | 'static' 
  | 'pan-left' 
  | 'pan-right' 
  | 'tilt-up' 
  | 'tilt-down' 
  | 'dolly-in' 
  | 'dolly-out' 
  | 'tracking' 
  | 'crane'
  | 'handheld';

export type Framing = 
  | 'extreme-wide' 
  | 'wide' 
  | 'medium-wide' 
  | 'medium' 
  | 'medium-close-up' 
  | 'close-up' 
  | 'extreme-close-up';

export interface Animatic {
  id: string;
  projectId: string;
  frames: AnimaticFrame[];
  totalDuration: number;
  audioTrack?: string;
}

export interface AnimaticFrame {
  id: string;
  frameId: string;
  duration: number;
  transition: TransitionType;
  panZoom?: PanZoomEffect;
}

export type TransitionType = 'cut' | 'fade' | 'dissolve' | 'wipe';

export interface PanZoomEffect {
  type: 'pan' | 'zoom-in' | 'zoom-out' | 'pan-zoom';
  startX?: number;
  startY?: number;
  endX?: number;
  endY?: number;
  startScale?: number;
  endScale?: number;
}

export interface ExportOptions {
  format: 'pdf' | 'png' | 'jpg' | 'mp4' | 'csv';
  quality: 'low' | 'medium' | 'high';
  includeNotes: boolean;
  includeShotList: boolean;
}
