import { Project, Scene, StoryboardFrame, Shot, User } from '@/types';

export const mockUser: User = {
  id: 'user-1',
  name: 'Alex Director',
  email: 'alex@storyboard.ai',
  avatar: undefined,
};

export const mockProjects: Project[] = [
  {
    id: 'project-1',
    title: 'The Last Sunrise',
    description: 'A sci-fi short about humanity\'s final day on Earth',
    thumbnail: undefined,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-18'),
    frameCount: 24,
    status: 'in-progress',
  },
  {
    id: 'project-2',
    title: 'Coffee Shop Romance',
    description: 'A heartwarming love story set in a cozy café',
    thumbnail: undefined,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-12'),
    frameCount: 18,
    status: 'completed',
  },
  {
    id: 'project-3',
    title: 'Urban Chase',
    description: 'Action-packed pursuit through city streets',
    thumbnail: undefined,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
    frameCount: 0,
    status: 'draft',
  },
];

export const sampleScript = `INT. COFFEE SHOP - MORNING

A cozy neighborhood coffee shop. Morning light streams through large windows. SARAH (28, creative, warm) sits alone at a corner table, sketchbook open, coffee untouched.

JAMES (30, thoughtful, slightly disheveled) enters, scanning for a seat. The shop is full except for the chair across from Sarah.

JAMES
(hesitant)
Excuse me, is this seat taken?

SARAH
(looking up, surprised)
Oh, no. Go ahead.

James sits, pulls out a worn paperback. Sarah notices the title - it's her favorite book.

SARAH
That's a great book.

JAMES
(smiling)
You've read it?

SARAH
Three times. The ending still gets me.

They share a moment of connection. Outside, rain begins to fall.

EXT. CITY STREET - CONTINUOUS

Rain pours down on the busy street. Pedestrians rush by with umbrellas.

INT. COFFEE SHOP - CONTINUOUS

James and Sarah look out at the rain, then back at each other.

JAMES
Looks like we're stuck here for a while.

SARAH
(smiling)
I can think of worse places to be stuck.

She closes her sketchbook, giving him her full attention.

FADE OUT.`;

export const mockScenes: Scene[] = [
  {
    id: 'scene-1',
    projectId: 'project-2',
    sceneNumber: 1,
    heading: 'INT. COFFEE SHOP - MORNING',
    location: 'Coffee Shop',
    timeOfDay: 'Morning',
    description: 'A cozy neighborhood coffee shop. Morning light streams through large windows. SARAH (28, creative, warm) sits alone at a corner table, sketchbook open, coffee untouched.',
    characters: ['Sarah', 'James'],
    dialogue: [
      { id: 'd1', character: 'James', text: 'Excuse me, is this seat taken?', parenthetical: 'hesitant' },
      { id: 'd2', character: 'Sarah', text: 'Oh, no. Go ahead.', parenthetical: 'looking up, surprised' },
      { id: 'd3', character: 'Sarah', text: "That's a great book." },
      { id: 'd4', character: 'James', text: "You've read it?", parenthetical: 'smiling' },
      { id: 'd5', character: 'Sarah', text: 'Three times. The ending still gets me.' },
    ],
  },
  {
    id: 'scene-2',
    projectId: 'project-2',
    sceneNumber: 2,
    heading: 'EXT. CITY STREET - CONTINUOUS',
    location: 'City Street',
    timeOfDay: 'Day',
    description: 'Rain pours down on the busy street. Pedestrians rush by with umbrellas.',
    characters: [],
    dialogue: [],
  },
  {
    id: 'scene-3',
    projectId: 'project-2',
    sceneNumber: 3,
    heading: 'INT. COFFEE SHOP - CONTINUOUS',
    location: 'Coffee Shop',
    timeOfDay: 'Day',
    description: 'James and Sarah look out at the rain, then back at each other.',
    characters: ['James', 'Sarah'],
    dialogue: [
      { id: 'd6', character: 'James', text: "Looks like we're stuck here for a while." },
      { id: 'd7', character: 'Sarah', text: 'I can think of worse places to be stuck.', parenthetical: 'smiling' },
    ],
  },
];

export const mockFrames: StoryboardFrame[] = [
  {
    id: 'frame-1',
    sceneId: 'scene-1',
    frameNumber: 1,
    imageUrl: undefined,
    description: 'Wide shot of cozy coffee shop interior. Morning light through windows.',
    cameraAngle: 'Wide',
    cameraMovement: 'Static',
    notes: 'Establish warm, inviting atmosphere',
    duration: 3,
    style: 'illustrated',
  },
  {
    id: 'frame-2',
    sceneId: 'scene-1',
    frameNumber: 2,
    imageUrl: undefined,
    description: 'Medium shot of Sarah at corner table, sketching.',
    cameraAngle: 'Medium',
    cameraMovement: 'Slow push in',
    dialogue: '',
    notes: 'Focus on her creative energy',
    duration: 2,
    style: 'illustrated',
  },
  {
    id: 'frame-3',
    sceneId: 'scene-1',
    frameNumber: 3,
    imageUrl: undefined,
    description: 'James enters through door, scanning the room.',
    cameraAngle: 'Medium Wide',
    cameraMovement: 'Pan right',
    notes: 'Show the crowded shop',
    duration: 2,
    style: 'illustrated',
  },
  {
    id: 'frame-4',
    sceneId: 'scene-1',
    frameNumber: 4,
    imageUrl: undefined,
    description: 'Over-the-shoulder from James, seeing Sarah and empty chair.',
    cameraAngle: 'OTS',
    cameraMovement: 'Static',
    notes: 'His POV discovering her',
    duration: 2,
    style: 'illustrated',
  },
  {
    id: 'frame-5',
    sceneId: 'scene-1',
    frameNumber: 5,
    imageUrl: undefined,
    description: 'Two-shot as James asks about the seat.',
    cameraAngle: 'Medium',
    cameraMovement: 'Static',
    dialogue: 'Excuse me, is this seat taken?',
    notes: 'Capture the awkward first interaction',
    duration: 3,
    style: 'illustrated',
  },
  {
    id: 'frame-6',
    sceneId: 'scene-1',
    frameNumber: 6,
    imageUrl: undefined,
    description: 'Close-up on Sarah looking up, surprised.',
    cameraAngle: 'Close-up',
    cameraMovement: 'Static',
    dialogue: 'Oh, no. Go ahead.',
    notes: 'Her expression shows intrigue',
    duration: 2,
    style: 'illustrated',
  },
];

export const mockShots: Shot[] = [
  {
    id: 'shot-1',
    projectId: 'project-2',
    shotNumber: 1,
    frameId: 'frame-1',
    sceneId: 'scene-1',
    cameraAngle: 'eye-level',
    lensType: '24mm',
    cameraMovement: 'static',
    framing: 'wide',
    notes: 'Establish location and mood',
  },
  {
    id: 'shot-2',
    projectId: 'project-2',
    shotNumber: 2,
    frameId: 'frame-2',
    sceneId: 'scene-1',
    cameraAngle: 'eye-level',
    lensType: '50mm',
    cameraMovement: 'dolly-in',
    framing: 'medium',
    notes: 'Slow push to create intimacy',
  },
  {
    id: 'shot-3',
    projectId: 'project-2',
    shotNumber: 3,
    frameId: 'frame-3',
    sceneId: 'scene-1',
    cameraAngle: 'eye-level',
    lensType: '35mm',
    cameraMovement: 'pan-right',
    framing: 'medium-wide',
    notes: 'Follow James into the scene',
  },
  {
    id: 'shot-4',
    projectId: 'project-2',
    shotNumber: 4,
    frameId: 'frame-4',
    sceneId: 'scene-1',
    cameraAngle: 'over-the-shoulder',
    lensType: '85mm',
    cameraMovement: 'static',
    framing: 'medium',
    notes: "James's POV",
  },
  {
    id: 'shot-5',
    projectId: 'project-2',
    shotNumber: 5,
    frameId: 'frame-5',
    sceneId: 'scene-1',
    cameraAngle: 'eye-level',
    lensType: '50mm',
    cameraMovement: 'static',
    framing: 'medium',
    notes: 'Classic two-shot for dialogue',
  },
  {
    id: 'shot-6',
    projectId: 'project-2',
    shotNumber: 6,
    frameId: 'frame-6',
    sceneId: 'scene-1',
    cameraAngle: 'eye-level',
    lensType: '85mm',
    cameraMovement: 'static',
    framing: 'close-up',
    notes: 'Reaction shot - key emotional beat',
  },
];

// Helper to generate unique IDs
export const generateId = () => Math.random().toString(36).substring(2, 11);
