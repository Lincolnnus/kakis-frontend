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
  // Project 1 - The Last Sunrise (Sci-Fi)
  {
    id: 'scene-1-1',
    projectId: 'project-1',
    sceneNumber: 1,
    heading: 'EXT. EARTH ORBIT - DAWN',
    location: 'Space Station',
    timeOfDay: 'Dawn',
    description: 'The space station hangs silently against Earth\'s curvature. The sun begins its final rise over the Pacific.',
    characters: ['Commander Chen'],
    dialogue: [
      { id: 'd1-1', character: 'Commander Chen', text: 'Mission Control, we have visual confirmation. T-minus 6 hours.', parenthetical: 'somber' },
    ],
  },
  {
    id: 'scene-1-2',
    projectId: 'project-1',
    sceneNumber: 2,
    heading: 'INT. SPACE STATION - OBSERVATION DECK',
    location: 'Observation Deck',
    timeOfDay: 'Dawn',
    description: 'Commander Chen floats by the large window, watching Earth. Photos of her family are taped nearby.',
    characters: ['Commander Chen', 'Dr. Okafor'],
    dialogue: [
      { id: 'd1-2', character: 'Dr. Okafor', text: 'The calculations are final. There\'s nothing we can do.' },
      { id: 'd1-3', character: 'Commander Chen', text: 'Then we watch. We bear witness.', parenthetical: 'quietly' },
    ],
  },
  {
    id: 'scene-1-3',
    projectId: 'project-1',
    sceneNumber: 3,
    heading: 'EXT. TOKYO - CONTINUOUS',
    location: 'Tokyo Streets',
    timeOfDay: 'Morning',
    description: 'Streets filled with people looking up at the sky. Some embrace, others stand alone. A child points upward.',
    characters: [],
    dialogue: [],
  },
  // Project 2 - Coffee Shop Romance
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
  // Project 3 - Urban Chase (Action)
  {
    id: 'scene-3-1',
    projectId: 'project-3',
    sceneNumber: 1,
    heading: 'EXT. DOWNTOWN ROOFTOP - NIGHT',
    location: 'Rooftop',
    timeOfDay: 'Night',
    description: 'MAYA (32, athletic, determined) sprints across a rooftop. City lights blur behind her. Sirens echo below.',
    characters: ['Maya'],
    dialogue: [],
  },
  {
    id: 'scene-3-2',
    projectId: 'project-3',
    sceneNumber: 2,
    heading: 'EXT. ALLEY - CONTINUOUS',
    location: 'Alley',
    timeOfDay: 'Night',
    description: 'Maya drops from a fire escape, lands in a crouch. Shadows move at the alley entrance.',
    characters: ['Maya', 'Agent Cole'],
    dialogue: [
      { id: 'd3-1', character: 'Agent Cole', text: 'End of the line, Maya.', parenthetical: 'from shadows' },
      { id: 'd3-2', character: 'Maya', text: 'You know I can\'t let you take this back.', parenthetical: 'gripping a drive' },
    ],
  },
  {
    id: 'scene-3-3',
    projectId: 'project-3',
    sceneNumber: 3,
    heading: 'EXT. SUBWAY ENTRANCE - CONTINUOUS',
    location: 'Subway Entrance',
    timeOfDay: 'Night',
    description: 'Maya bursts through the subway entrance, vaulting the turnstile. A train is leaving the platform.',
    characters: ['Maya'],
    dialogue: [],
  },
];

export const mockFrames: StoryboardFrame[] = [
  // Project 1 Frames
  {
    id: 'frame-1-1',
    sceneId: 'scene-1-1',
    frameNumber: 1,
    imageUrl: undefined,
    description: 'Wide establishing shot of space station orbiting Earth at dawn.',
    cameraAngle: 'Extreme Wide',
    cameraMovement: 'Slow drift',
    notes: 'VFX: Earth atmosphere glow, sun cresting horizon',
    duration: 4,
    style: 'realistic',
  },
  {
    id: 'frame-1-2',
    sceneId: 'scene-1-1',
    frameNumber: 2,
    imageUrl: undefined,
    description: 'Close-up of station exterior with Earth reflection in solar panels.',
    cameraAngle: 'Close-up',
    cameraMovement: 'Static',
    notes: 'Show scale and isolation',
    duration: 3,
    style: 'realistic',
  },
  {
    id: 'frame-1-3',
    sceneId: 'scene-1-2',
    frameNumber: 3,
    imageUrl: undefined,
    description: 'Commander Chen floating by observation window, Earth filling the frame behind her.',
    cameraAngle: 'Medium',
    cameraMovement: 'Slow push in',
    dialogue: 'Mission Control, we have visual confirmation.',
    notes: 'Emotional weight - her silhouette against Earth',
    duration: 4,
    style: 'realistic',
  },
  {
    id: 'frame-1-4',
    sceneId: 'scene-1-3',
    frameNumber: 4,
    imageUrl: undefined,
    description: 'High angle shot of Tokyo streets, crowds looking skyward.',
    cameraAngle: 'High Angle',
    cameraMovement: 'Crane down',
    notes: 'Show humanity united in this moment',
    duration: 3,
    style: 'realistic',
  },
  // Project 2 Frames
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
  // Project 3 Frames
  {
    id: 'frame-3-1',
    sceneId: 'scene-3-1',
    frameNumber: 1,
    imageUrl: undefined,
    description: 'Wide shot: Maya sprinting across rooftop, city skyline behind.',
    cameraAngle: 'Wide',
    cameraMovement: 'Tracking',
    notes: 'High energy, motion blur on background',
    duration: 2,
    style: 'sketch',
  },
  {
    id: 'frame-3-2',
    sceneId: 'scene-3-1',
    frameNumber: 2,
    imageUrl: undefined,
    description: 'Low angle as Maya leaps between buildings.',
    cameraAngle: 'Low Angle',
    cameraMovement: 'Whip pan',
    notes: 'Show athleticism and danger',
    duration: 2,
    style: 'sketch',
  },
  {
    id: 'frame-3-3',
    sceneId: 'scene-3-2',
    frameNumber: 3,
    imageUrl: undefined,
    description: 'Maya lands in alley, crouched, alert.',
    cameraAngle: 'Medium',
    cameraMovement: 'Static',
    notes: 'Dramatic lighting from street above',
    duration: 2,
    style: 'sketch',
  },
  {
    id: 'frame-3-4',
    sceneId: 'scene-3-2',
    frameNumber: 4,
    imageUrl: undefined,
    description: 'Agent Cole emerges from shadows, hand on weapon.',
    cameraAngle: 'Medium',
    cameraMovement: 'Slow dolly',
    dialogue: 'End of the line, Maya.',
    notes: 'Menacing silhouette',
    duration: 3,
    style: 'sketch',
  },
  {
    id: 'frame-3-5',
    sceneId: 'scene-3-3',
    frameNumber: 5,
    imageUrl: undefined,
    description: 'Maya vaults subway turnstile in one fluid motion.',
    cameraAngle: 'Low Angle',
    cameraMovement: 'Static',
    notes: 'Freeze frame potential',
    duration: 2,
    style: 'sketch',
  },
];

export const mockShots: Shot[] = [
  // Project 1 Shots
  {
    id: 'shot-1-1',
    projectId: 'project-1',
    shotNumber: 1,
    frameId: 'frame-1-1',
    sceneId: 'scene-1-1',
    cameraAngle: 'birds-eye',
    lensType: '14mm',
    cameraMovement: 'crane',
    framing: 'extreme-wide',
    notes: 'VFX heavy - composite Earth and station',
  },
  {
    id: 'shot-1-2',
    projectId: 'project-1',
    shotNumber: 2,
    frameId: 'frame-1-2',
    sceneId: 'scene-1-1',
    cameraAngle: 'eye-level',
    lensType: '85mm',
    cameraMovement: 'static',
    framing: 'close-up',
    notes: 'Practical lighting with LED panels',
  },
  {
    id: 'shot-1-3',
    projectId: 'project-1',
    shotNumber: 3,
    frameId: 'frame-1-3',
    sceneId: 'scene-1-2',
    cameraAngle: 'low-angle',
    lensType: '24mm',
    cameraMovement: 'dolly-in',
    framing: 'medium',
    notes: 'Wire rig for floating effect',
  },
  {
    id: 'shot-1-4',
    projectId: 'project-1',
    shotNumber: 4,
    frameId: 'frame-1-4',
    sceneId: 'scene-1-3',
    cameraAngle: 'high-angle',
    lensType: '35mm',
    cameraMovement: 'crane',
    framing: 'extreme-wide',
    notes: 'Drone shot with extras',
  },
  // Project 2 Shots
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
  // Project 3 Shots
  {
    id: 'shot-3-1',
    projectId: 'project-3',
    shotNumber: 1,
    frameId: 'frame-3-1',
    sceneId: 'scene-3-1',
    cameraAngle: 'eye-level',
    lensType: '24mm',
    cameraMovement: 'tracking',
    framing: 'wide',
    notes: 'Steadicam or gimbal for smooth tracking',
  },
  {
    id: 'shot-3-2',
    projectId: 'project-3',
    shotNumber: 2,
    frameId: 'frame-3-2',
    sceneId: 'scene-3-1',
    cameraAngle: 'low-angle',
    lensType: '14mm',
    cameraMovement: 'handheld',
    framing: 'wide',
    notes: 'Stunt double for leap',
  },
  {
    id: 'shot-3-3',
    projectId: 'project-3',
    shotNumber: 3,
    frameId: 'frame-3-3',
    sceneId: 'scene-3-2',
    cameraAngle: 'high-angle',
    lensType: '35mm',
    cameraMovement: 'static',
    framing: 'medium',
    notes: 'Practical rain effects',
  },
  {
    id: 'shot-3-4',
    projectId: 'project-3',
    shotNumber: 4,
    frameId: 'frame-3-4',
    sceneId: 'scene-3-2',
    cameraAngle: 'dutch-angle',
    lensType: '50mm',
    cameraMovement: 'dolly-in',
    framing: 'medium',
    notes: 'Tension building - slow approach',
  },
  {
    id: 'shot-3-5',
    projectId: 'project-3',
    shotNumber: 5,
    frameId: 'frame-3-5',
    sceneId: 'scene-3-3',
    cameraAngle: 'low-angle',
    lensType: '24mm',
    cameraMovement: 'static',
    framing: 'medium-wide',
    notes: 'Hero shot - possible slow motion',
  },
];

// Helper to generate unique IDs
export const generateId = () => Math.random().toString(36).substring(2, 11);
