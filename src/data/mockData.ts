import { Project, Scene, StoryboardFrame, Shot, User } from '@/types';

// Import Luna & The Starkeeper storyboard images
import lunaFrame1 from '@/assets/storyboard/luna-frame-1.png';
import lunaFrame2 from '@/assets/storyboard/luna-frame-2.png';
import lunaFrame3 from '@/assets/storyboard/luna-frame-3.png';
import lunaFrame4 from '@/assets/storyboard/luna-frame-4.png';
import lunaFrame5 from '@/assets/storyboard/luna-frame-5.png';
import lunaFrame6 from '@/assets/storyboard/luna-frame-6.png';
import lunaFrame7 from '@/assets/storyboard/luna-frame-7.png';
import lunaFrame8 from '@/assets/storyboard/luna-frame-8.png';
import lunaFrame9 from '@/assets/storyboard/luna-frame-9.png';
import lunaFrame10 from '@/assets/storyboard/luna-frame-10.png';
import lunaFrame11 from '@/assets/storyboard/luna-frame-11.png';
import lunaFrame12 from '@/assets/storyboard/luna-frame-12.png';
import lunaFrame13 from '@/assets/storyboard/luna-frame-13.png';
import lunaFrame14 from '@/assets/storyboard/luna-frame-14.png';
import lunaFrame15 from '@/assets/storyboard/luna-frame-15.png';

// Import project thumbnails
import lunaThumb from '@/assets/thumbnails/luna-starkeeper-thumb.png';
import robotThumb from '@/assets/thumbnails/robot-garden-thumb.png';
import felixThumb from '@/assets/thumbnails/felix-fox-thumb.png';

export const mockUser: User = {
  id: 'user-1',
  name: 'Alex Director',
  email: 'alex@storyboard.ai',
  avatar: undefined,
};

export const mockProjects: Project[] = [
  {
    id: 'project-1',
    title: 'Luna & The Starkeeper',
    description: 'An animated short about a lonely girl who befriends the keeper of the stars',
    thumbnail: lunaThumb,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-18'),
    frameCount: 24,
    status: 'in-progress',
  },
  {
    id: 'project-2',
    title: 'The Robot\'s Garden',
    description: 'A heartwarming tale of a robot learning to grow flowers in a post-apocalyptic world',
    thumbnail: robotThumb,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-12'),
    frameCount: 18,
    status: 'completed',
  },
  {
    id: 'project-3',
    title: 'Felix the Fearful Fox',
    description: 'A young fox overcomes his fears to save his forest friends',
    thumbnail: felixThumb,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
    frameCount: 0,
    status: 'draft',
  },
];

export const sampleScript = `INT. LUNA'S BEDROOM - NIGHT

A small, cozy attic bedroom. Stars visible through a circular window. LUNA (10, imaginative, curious, dark curly hair) lies in bed, unable to sleep. She stares at the ceiling, covered in glow-in-the-dark stars.

LUNA
(whispering to herself)
Forty-seven stars on my ceiling... but none of them twinkle.

She sits up, looking out the window at the real stars.

LUNA
I wonder who puts them up there every night.

A shooting star streaks across the sky. Luna gasps and rushes to the window.

EXT. LUNA'S ROOFTOP - CONTINUOUS

Luna climbs through the window onto the roof. The night sky is impossibly vast and beautiful. She notices an old wooden ladder that wasn't there before, stretching up into the clouds.

LUNA
(breathless)
That's... that's new.

She looks around, then begins to climb.

EXT. CLOUD PLATFORM - NIGHT

Luna emerges onto a fluffy cloud platform. Lanterns made of captured starlight illuminate a whimsical workshop. THE STARKEEPER (ancient, kind, made of constellations) tends to a garden of baby stars.

STARKEEPER
(without turning around)
I wondered when you'd find your way up here, Luna.

LUNA
(startled)
You... you know my name?

STARKEEPER
(chuckling, turning to face her)
I placed the star above your window the night you were born. I know every child who wishes on my stars.

Luna's eyes widen as she takes in the magical workshop - jars of stardust, a telescope made of moonbeams, and thousands of tiny stars waiting to be hung.

LUNA
This is where stars come from?

STARKEEPER
This is where stars begin. But lately... I've been having trouble.

The Starkeeper gestures to a corner where several dim, flickering stars huddle together.

STARKEEPER (CONT'D)
These little ones have lost their shine. They've forgotten how to glow.

LUNA
What makes a star forget?

STARKEEPER
(sadly)
When children stop believing in wishes.

Luna approaches the dim stars gently.

FADE OUT.`;

export const mockScenes: Scene[] = [
  // Project 1 - Luna & The Starkeeper
  {
    id: 'scene-1-1',
    projectId: 'project-1',
    sceneNumber: 1,
    heading: 'INT. LUNA\'S BEDROOM - NIGHT',
    location: 'Luna\'s Bedroom',
    timeOfDay: 'Night',
    description: 'A small, cozy attic bedroom. Stars visible through a circular window. Luna lies in bed, unable to sleep, counting the glow-in-the-dark stars on her ceiling.',
    characters: ['Luna'],
    dialogue: [
      { id: 'd1-1', character: 'Luna', text: 'Forty-seven stars on my ceiling... but none of them twinkle.', parenthetical: 'whispering to herself' },
      { id: 'd1-2', character: 'Luna', text: 'I wonder who puts them up there every night.' },
    ],
  },
  {
    id: 'scene-1-2',
    projectId: 'project-1',
    sceneNumber: 2,
    heading: 'EXT. LUNA\'S ROOFTOP - CONTINUOUS',
    location: 'Rooftop',
    timeOfDay: 'Night',
    description: 'Luna climbs through the window onto the roof. A mysterious wooden ladder stretches up into the clouds, glowing faintly with starlight.',
    characters: ['Luna'],
    dialogue: [
      { id: 'd1-3', character: 'Luna', text: 'That\'s... that\'s new.', parenthetical: 'breathless' },
    ],
  },
  {
    id: 'scene-1-3',
    projectId: 'project-1',
    sceneNumber: 3,
    heading: 'EXT. CLOUD PLATFORM - NIGHT',
    location: 'Cloud Workshop',
    timeOfDay: 'Night',
    description: 'Luna emerges onto a fluffy cloud platform. Lanterns of starlight illuminate a whimsical workshop where The Starkeeper tends a garden of baby stars.',
    characters: ['Luna', 'The Starkeeper'],
    dialogue: [
      { id: 'd1-4', character: 'The Starkeeper', text: 'I wondered when you\'d find your way up here, Luna.', parenthetical: 'without turning around' },
      { id: 'd1-5', character: 'Luna', text: 'You... you know my name?', parenthetical: 'startled' },
      { id: 'd1-6', character: 'The Starkeeper', text: 'I placed the star above your window the night you were born.', parenthetical: 'chuckling, turning to face her' },
    ],
  },
  {
    id: 'scene-1-4',
    projectId: 'project-1',
    sceneNumber: 4,
    heading: 'INT. STAR WORKSHOP - CONTINUOUS',
    location: 'Star Workshop',
    timeOfDay: 'Night',
    description: 'The Starkeeper shows Luna around the magical workshop - jars of stardust, a telescope made of moonbeams, and dim stars that have lost their shine.',
    characters: ['Luna', 'The Starkeeper'],
    dialogue: [
      { id: 'd1-7', character: 'Luna', text: 'This is where stars come from?' },
      { id: 'd1-8', character: 'The Starkeeper', text: 'This is where stars begin. But lately... I\'ve been having trouble.' },
      { id: 'd1-9', character: 'Luna', text: 'What makes a star forget?' },
      { id: 'd1-10', character: 'The Starkeeper', text: 'When children stop believing in wishes.', parenthetical: 'sadly' },
    ],
  },
  // Project 2 - The Robot's Garden
  {
    id: 'scene-2-1',
    projectId: 'project-2',
    sceneNumber: 1,
    heading: 'EXT. RUINED CITY - DAY',
    location: 'Ruined City',
    timeOfDay: 'Day',
    description: 'A desolate cityscape, buildings crumbling, covered in rust and dust. RUSTY (a small, dented gardening robot with kind optical sensors) wheels through the debris, carrying an empty pot.',
    characters: ['Rusty'],
    dialogue: [],
  },
  {
    id: 'scene-2-2',
    projectId: 'project-2',
    sceneNumber: 2,
    heading: 'EXT. ABANDONED GREENHOUSE - DAY',
    location: 'Abandoned Greenhouse',
    timeOfDay: 'Day',
    description: 'Rusty discovers a cracked greenhouse. Inside, among the dead plants, a single seed packet remains. Hope flickers in Rusty\'s sensors.',
    characters: ['Rusty'],
    dialogue: [],
  },
  {
    id: 'scene-2-3',
    projectId: 'project-2',
    sceneNumber: 3,
    heading: 'EXT. RUSTY\'S GARDEN PLOT - VARIOUS',
    location: 'Garden Plot',
    timeOfDay: 'Various',
    description: 'Montage of Rusty carefully preparing soil, planting seeds, and protecting the sprouts. CLOVER (a curious rabbit, the only animal in the area) watches from a distance.',
    characters: ['Rusty', 'Clover'],
    dialogue: [],
  },
  {
    id: 'scene-2-4',
    projectId: 'project-2',
    sceneNumber: 4,
    heading: 'EXT. RUSTY\'S GARDEN - SUNRISE',
    location: 'Garden Plot',
    timeOfDay: 'Sunrise',
    description: 'The first flower blooms - a bright sunflower. Rusty and Clover watch together as color returns to the grey world.',
    characters: ['Rusty', 'Clover'],
    dialogue: [],
  },
  // Project 3 - Felix the Fearful Fox
  {
    id: 'scene-3-1',
    projectId: 'project-3',
    sceneNumber: 1,
    heading: 'INT. FOX DEN - MORNING',
    location: 'Fox Den',
    timeOfDay: 'Morning',
    description: 'A cozy underground fox den. FELIX (young fox, anxious, big expressive eyes) hides under a blanket while his sister FERN (confident, adventurous) tries to coax him out.',
    characters: ['Felix', 'Fern'],
    dialogue: [
      { id: 'd3-1', character: 'Fern', text: 'Come on Felix! The forest is beautiful today!' },
      { id: 'd3-2', character: 'Felix', text: 'What if there are... hawks? Or bears? Or... or loud noises?', parenthetical: 'trembling' },
      { id: 'd3-3', character: 'Fern', text: 'You can\'t hide forever, little brother.', parenthetical: 'sighing' },
    ],
  },
  {
    id: 'scene-3-2',
    projectId: 'project-3',
    sceneNumber: 2,
    heading: 'EXT. FOREST CLEARING - DAY',
    location: 'Forest Clearing',
    timeOfDay: 'Day',
    description: 'Felix cautiously explores the clearing. He meets OLIVER (a wise old owl) who notices his nervous nature.',
    characters: ['Felix', 'Oliver'],
    dialogue: [
      { id: 'd3-4', character: 'Oliver', text: 'Jumping at shadows, little fox?' },
      { id: 'd3-5', character: 'Felix', text: 'Everything is scary when you\'re small.' },
      { id: 'd3-6', character: 'Oliver', text: 'Bravery isn\'t about not being scared. It\'s about being scared and doing it anyway.' },
    ],
  },
  {
    id: 'scene-3-3',
    projectId: 'project-3',
    sceneNumber: 3,
    heading: 'EXT. RIVER CROSSING - DAY',
    location: 'River',
    timeOfDay: 'Day',
    description: 'A flooding river has trapped POPPY (a young rabbit) on a rock. Felix must overcome his fear of water to help.',
    characters: ['Felix', 'Poppy'],
    dialogue: [
      { id: 'd3-7', character: 'Poppy', text: 'Help! Someone please help!', parenthetical: 'crying' },
      { id: 'd3-8', character: 'Felix', text: 'I... I don\'t know if I can...', parenthetical: 'to himself' },
    ],
  },
];

export const mockFrames: StoryboardFrame[] = [
  // Project 1 - Luna & The Starkeeper - Scene 1 (4 frames)
  {
    id: 'frame-1-1-1',
    sceneId: 'scene-1-1',
    frameNumber: 1,
    imageUrl: lunaFrame1,
    description: 'Wide shot of Luna\'s cozy attic bedroom. Moonlight streams through circular window. Glow stars on ceiling.',
    cameraAngle: 'Wide',
    cameraMovement: 'Static',
    notes: 'Establish warm, magical atmosphere. Soft blue lighting.',
    duration: 4,
    style: 'illustrated',
  },
  {
    id: 'frame-1-1-2',
    sceneId: 'scene-1-1',
    frameNumber: 2,
    imageUrl: lunaFrame2,
    description: 'Close-up of Luna\'s face, eyes open, looking up at ceiling stars. Expression of wonder and loneliness.',
    cameraAngle: 'Close-up',
    cameraMovement: 'Slow push in',
    dialogue: 'Forty-seven stars on my ceiling...',
    notes: 'Character introduction - show her imaginative, curious nature.',
    duration: 3,
    style: 'illustrated',
  },
  {
    id: 'frame-1-1-3',
    sceneId: 'scene-1-1',
    frameNumber: 3,
    imageUrl: lunaFrame3,
    description: 'Luna sits up in bed, looking toward the window. Real stars visible outside, contrasting with plastic ones.',
    cameraAngle: 'Medium',
    cameraMovement: 'Pan to window',
    dialogue: 'I wonder who puts them up there every night.',
    notes: 'Visual contrast between fake/real stars.',
    duration: 3,
    style: 'illustrated',
  },
  {
    id: 'frame-1-1-4',
    sceneId: 'scene-1-1',
    frameNumber: 4,
    imageUrl: lunaFrame4,
    description: 'Shooting star streaks across the sky through the window. Luna\'s eyes light up with excitement.',
    cameraAngle: 'Over-shoulder',
    cameraMovement: 'Static',
    notes: 'Inciting incident - the call to adventure.',
    duration: 2,
    style: 'illustrated',
  },
  
  // Scene 2 - Rooftop (3 frames)
  {
    id: 'frame-1-2-1',
    sceneId: 'scene-1-2',
    frameNumber: 5,
    imageUrl: lunaFrame5,
    description: 'Luna climbing through window onto moonlit rooftop. Town visible below, vast starry sky above.',
    cameraAngle: 'Wide',
    cameraMovement: 'Tilt up',
    notes: 'Show the scale of the night sky vs small Luna.',
    duration: 3,
    style: 'illustrated',
  },
  {
    id: 'frame-1-2-2',
    sceneId: 'scene-1-2',
    frameNumber: 6,
    imageUrl: lunaFrame6,
    description: 'Luna discovers the mysterious glowing ladder stretching up into the clouds.',
    cameraAngle: 'Low angle',
    cameraMovement: 'Slow tilt up',
    dialogue: 'That\'s... that\'s new.',
    notes: 'Magical realism moment - ladder appears ethereal.',
    duration: 4,
    style: 'illustrated',
  },
  {
    id: 'frame-1-2-3',
    sceneId: 'scene-1-2',
    frameNumber: 7,
    imageUrl: lunaFrame7,
    description: 'Luna\'s small hand grasps the first rung. Determination on her face.',
    cameraAngle: 'Close-up',
    cameraMovement: 'Static',
    notes: 'Hero takes action - leaving the ordinary world.',
    duration: 2,
    style: 'illustrated',
  },
  
  // Scene 3 - Cloud Platform (4 frames)
  {
    id: 'frame-1-3-1',
    sceneId: 'scene-1-3',
    frameNumber: 8,
    imageUrl: lunaFrame8,
    description: 'Wide establishing shot of cloud workshop. Floating lanterns, star gardens, The Starkeeper\'s silhouette.',
    cameraAngle: 'Extreme Wide',
    cameraMovement: 'Slow drift',
    notes: 'Reveal the magical world - maximum wonder.',
    duration: 5,
    style: 'illustrated',
  },
  {
    id: 'frame-1-3-2',
    sceneId: 'scene-1-3',
    frameNumber: 9,
    imageUrl: lunaFrame9,
    description: 'Luna emerges from clouds, jaw dropped, taking in the impossible workshop.',
    cameraAngle: 'Medium',
    cameraMovement: 'Arc around Luna',
    notes: 'Audience experiences wonder through Luna.',
    duration: 3,
    style: 'illustrated',
  },
  {
    id: 'frame-1-3-3',
    sceneId: 'scene-1-3',
    frameNumber: 10,
    imageUrl: lunaFrame10,
    description: 'The Starkeeper turns - his body is made of flowing constellations, ancient and kind.',
    cameraAngle: 'Medium',
    cameraMovement: 'Static',
    dialogue: 'I wondered when you\'d find your way up here, Luna.',
    notes: 'Mentor character introduction - warm, grandfatherly energy.',
    duration: 4,
    style: 'illustrated',
  },
  {
    id: 'frame-1-3-4',
    sceneId: 'scene-1-3',
    frameNumber: 11,
    imageUrl: lunaFrame11,
    description: 'Two-shot of Luna and Starkeeper, size contrast emphasized. Luna looks tiny but brave.',
    cameraAngle: 'Wide',
    cameraMovement: 'Static',
    dialogue: 'You... you know my name?',
    notes: 'Establish their dynamic - child and ancient being.',
    duration: 3,
    style: 'illustrated',
  },
  
  // Scene 4 - Workshop Interior (4 frames)
  {
    id: 'frame-1-4-1',
    sceneId: 'scene-1-4',
    frameNumber: 12,
    imageUrl: lunaFrame12,
    description: 'Wide shot of workshop interior - shelves of stardust jars, moonbeam telescope, sleeping baby stars.',
    cameraAngle: 'Wide',
    cameraMovement: 'Pan across',
    notes: 'World-building details, Easter eggs for repeat viewers.',
    duration: 4,
    style: 'illustrated',
  },
  {
    id: 'frame-1-4-2',
    sceneId: 'scene-1-4',
    frameNumber: 13,
    imageUrl: lunaFrame13,
    description: 'Close-up of Luna\'s hand touching a jar of glittering stardust, colors reflecting in her eyes.',
    cameraAngle: 'Close-up',
    cameraMovement: 'Static',
    dialogue: 'This is where stars come from?',
    notes: 'Tactile magic moment.',
    duration: 3,
    style: 'illustrated',
  },
  {
    id: 'frame-1-4-3',
    sceneId: 'scene-1-4',
    frameNumber: 14,
    imageUrl: lunaFrame14,
    description: 'Starkeeper gestures sadly toward corner where dim, flickering stars huddle together.',
    cameraAngle: 'Medium',
    cameraMovement: 'Dolly to corner',
    dialogue: 'These little ones have lost their shine.',
    notes: 'Introduce the problem/stakes.',
    duration: 4,
    style: 'illustrated',
  },
  {
    id: 'frame-1-4-4',
    sceneId: 'scene-1-4',
    frameNumber: 15,
    imageUrl: lunaFrame15,
    description: 'Luna kneels beside the dim stars, reaching out gently. Starkeeper watches with hope.',
    cameraAngle: 'Medium',
    cameraMovement: 'Static',
    dialogue: 'When children stop believing in wishes.',
    notes: 'Emotional core of the story - Luna as potential savior.',
    duration: 4,
    style: 'illustrated',
  },

  // Project 2 - The Robot's Garden - Scene 1 (3 frames)
  {
    id: 'frame-2-1-1',
    sceneId: 'scene-2-1',
    frameNumber: 1,
    imageUrl: undefined,
    description: 'Extreme wide shot of desolate, rust-colored cityscape. Everything is dead and grey.',
    cameraAngle: 'Extreme Wide',
    cameraMovement: 'Slow pan',
    notes: 'Establish post-apocalyptic mood - lonely, desolate.',
    duration: 4,
    style: 'illustrated',
  },
  {
    id: 'frame-2-1-2',
    sceneId: 'scene-2-1',
    frameNumber: 2,
    imageUrl: undefined,
    description: 'Rusty wheels into frame carrying empty pot. Small, dented, but his optical sensors are bright.',
    cameraAngle: 'Medium',
    cameraMovement: 'Tracking',
    notes: 'Character intro - Rusty is hopeful despite surroundings.',
    duration: 3,
    style: 'illustrated',
  },
  {
    id: 'frame-2-1-3',
    sceneId: 'scene-2-1',
    frameNumber: 3,
    imageUrl: undefined,
    description: 'Close-up of Rusty\'s optical sensors reflecting the grey world. A flicker of determination.',
    cameraAngle: 'Close-up',
    cameraMovement: 'Static',
    notes: 'Eyes are the window to the robot soul.',
    duration: 2,
    style: 'illustrated',
  },
  
  // Scene 2 - Greenhouse (3 frames)
  {
    id: 'frame-2-2-1',
    sceneId: 'scene-2-2',
    frameNumber: 4,
    imageUrl: undefined,
    description: 'Wide shot of cracked, overgrown greenhouse. Glass mostly shattered, structure crumbling.',
    cameraAngle: 'Wide',
    cameraMovement: 'Static',
    notes: 'Beautiful decay aesthetic.',
    duration: 3,
    style: 'illustrated',
  },
  {
    id: 'frame-2-2-2',
    sceneId: 'scene-2-2',
    frameNumber: 5,
    imageUrl: undefined,
    description: 'Rusty inside greenhouse, scanning rows of dead plants. Dusty sunbeam highlights the decay.',
    cameraAngle: 'Medium',
    cameraMovement: 'Slow dolly',
    notes: 'Contrast of Rusty\'s hope vs. dead environment.',
    duration: 3,
    style: 'illustrated',
  },
  {
    id: 'frame-2-2-3',
    sceneId: 'scene-2-2',
    frameNumber: 6,
    imageUrl: undefined,
    description: 'Close-up of Rusty\'s gripper arm finding a seed packet. His sensors light up bright.',
    cameraAngle: 'Close-up',
    cameraMovement: 'Static',
    notes: 'The turning point - discovery of hope.',
    duration: 4,
    style: 'illustrated',
  },
  
  // Scene 3 - Garden Montage (4 frames)
  {
    id: 'frame-2-3-1',
    sceneId: 'scene-2-3',
    frameNumber: 7,
    imageUrl: undefined,
    description: 'Rusty carefully preparing soil, using his gripper arms to clear rubble.',
    cameraAngle: 'Medium',
    cameraMovement: 'Static',
    notes: 'Montage beat 1 - preparation.',
    duration: 2,
    style: 'illustrated',
  },
  {
    id: 'frame-2-3-2',
    sceneId: 'scene-2-3',
    frameNumber: 8,
    imageUrl: undefined,
    description: 'Rusty planting seeds with extreme care, almost reverently.',
    cameraAngle: 'Close-up',
    cameraMovement: 'Static',
    notes: 'Montage beat 2 - planting.',
    duration: 2,
    style: 'illustrated',
  },
  {
    id: 'frame-2-3-3',
    sceneId: 'scene-2-3',
    frameNumber: 9,
    imageUrl: undefined,
    description: 'Rusty shields tiny sprouts from acid rain using his own body. Clover the rabbit watches from distance.',
    cameraAngle: 'Wide',
    cameraMovement: 'Static',
    notes: 'Montage beat 3 - protection and sacrifice.',
    duration: 3,
    style: 'illustrated',
  },
  {
    id: 'frame-2-3-4',
    sceneId: 'scene-2-3',
    frameNumber: 10,
    imageUrl: undefined,
    description: 'Clover cautiously approaches. Rusty notices but doesn\'t scare her away. First connection.',
    cameraAngle: 'Two-shot',
    cameraMovement: 'Static',
    notes: 'Friendship begins - both lonely souls.',
    duration: 3,
    style: 'illustrated',
  },
  
  // Scene 4 - First Bloom (3 frames)
  {
    id: 'frame-2-4-1',
    sceneId: 'scene-2-4',
    frameNumber: 11,
    imageUrl: undefined,
    description: 'Dawn light. Rusty and Clover sleeping by the garden. A closed sunflower bud is visible.',
    cameraAngle: 'Wide',
    cameraMovement: 'Static',
    notes: 'Quiet moment before the payoff.',
    duration: 3,
    style: 'illustrated',
  },
  {
    id: 'frame-2-4-2',
    sceneId: 'scene-2-4',
    frameNumber: 12,
    imageUrl: undefined,
    description: 'Time-lapse style: the sunflower slowly opens, bright yellow against the grey world.',
    cameraAngle: 'Close-up',
    cameraMovement: 'Static',
    notes: 'The payoff - color returns to the world.',
    duration: 4,
    style: 'illustrated',
  },
  {
    id: 'frame-2-4-3',
    sceneId: 'scene-2-4',
    frameNumber: 13,
    imageUrl: undefined,
    description: 'Wide shot: Rusty and Clover look up at the sunflower together. Color radiates outward from the flower.',
    cameraAngle: 'Wide',
    cameraMovement: 'Slow zoom out',
    notes: 'Emotional climax - hope restored, friendship forged.',
    duration: 5,
    style: 'illustrated',
  },

  // Project 3 - Felix the Fearful Fox - Scene 1 (3 frames)
  {
    id: 'frame-3-1-1',
    sceneId: 'scene-3-1',
    frameNumber: 1,
    imageUrl: undefined,
    description: 'Cozy underground fox den, warm lighting. Felix is a ball of fur under a blanket.',
    cameraAngle: 'Wide',
    cameraMovement: 'Static',
    notes: 'Establish safe space - contrast with scary outside world.',
    duration: 3,
    style: 'anime',
  },
  {
    id: 'frame-3-1-2',
    sceneId: 'scene-3-1',
    frameNumber: 2,
    imageUrl: undefined,
    description: 'Fern tugging at the blanket, grinning. Felix\'s nervous eyes peek out.',
    cameraAngle: 'Medium',
    cameraMovement: 'Static',
    dialogue: 'Come on Felix! The forest is beautiful today!',
    notes: 'Sibling dynamic - confident vs anxious.',
    duration: 3,
    style: 'anime',
  },
  {
    id: 'frame-3-1-3',
    sceneId: 'scene-3-1',
    frameNumber: 3,
    imageUrl: undefined,
    description: 'Close-up of Felix, big worried eyes, ears flat. Imaginary shadows of hawks and bears loom.',
    cameraAngle: 'Close-up',
    cameraMovement: 'Slow push in',
    dialogue: 'What if there are... hawks?',
    notes: 'Visualize his anxiety - make it tangible.',
    duration: 3,
    style: 'anime',
  },
  
  // Scene 2 - Forest Clearing (4 frames)
  {
    id: 'frame-3-2-1',
    sceneId: 'scene-3-2',
    frameNumber: 4,
    imageUrl: undefined,
    description: 'Beautiful forest clearing, dappled sunlight. Felix moves cautiously, jumping at every sound.',
    cameraAngle: 'Wide',
    cameraMovement: 'Tracking',
    notes: 'Contrast: beautiful world vs Felix\'s fear.',
    duration: 3,
    style: 'anime',
  },
  {
    id: 'frame-3-2-2',
    sceneId: 'scene-3-2',
    frameNumber: 5,
    imageUrl: undefined,
    description: 'Oliver the owl lands on a branch above Felix. Wise, weathered, kind eyes.',
    cameraAngle: 'Low angle',
    cameraMovement: 'Static',
    dialogue: 'Jumping at shadows, little fox?',
    notes: 'Mentor character introduction.',
    duration: 3,
    style: 'anime',
  },
  {
    id: 'frame-3-2-3',
    sceneId: 'scene-3-2',
    frameNumber: 6,
    imageUrl: undefined,
    description: 'Felix looks up, embarrassed. Oliver\'s expression is understanding, not judgmental.',
    cameraAngle: 'Two-shot',
    cameraMovement: 'Static',
    dialogue: 'Everything is scary when you\'re small.',
    notes: 'Vulnerable admission from Felix.',
    duration: 3,
    style: 'anime',
  },
  {
    id: 'frame-3-2-4',
    sceneId: 'scene-3-2',
    frameNumber: 7,
    imageUrl: undefined,
    description: 'Close-up of Oliver, eyes twinkling with wisdom.',
    cameraAngle: 'Close-up',
    cameraMovement: 'Static',
    dialogue: 'Bravery isn\'t about not being scared...',
    notes: 'Theme statement of the film.',
    duration: 4,
    style: 'anime',
  },
  
  // Scene 3 - River Crossing (4 frames)
  {
    id: 'frame-3-3-1',
    sceneId: 'scene-3-3',
    frameNumber: 8,
    imageUrl: undefined,
    description: 'Wide shot of flooded river, rushing water. Poppy trapped on a rock in the middle.',
    cameraAngle: 'Wide',
    cameraMovement: 'Static',
    notes: 'Establish danger and stakes.',
    duration: 3,
    style: 'anime',
  },
  {
    id: 'frame-3-3-2',
    sceneId: 'scene-3-3',
    frameNumber: 9,
    imageUrl: undefined,
    description: 'Close-up of Poppy crying, shivering. Water rising around her rock.',
    cameraAngle: 'Close-up',
    cameraMovement: 'Slight shake',
    dialogue: 'Help! Someone please help!',
    notes: 'Emotional urgency.',
    duration: 2,
    style: 'anime',
  },
  {
    id: 'frame-3-3-3',
    sceneId: 'scene-3-3',
    frameNumber: 10,
    imageUrl: undefined,
    description: 'Felix at the riverbank, frozen with fear. His reflection shows his scared face.',
    cameraAngle: 'Medium',
    cameraMovement: 'Static',
    dialogue: 'I... I don\'t know if I can...',
    notes: 'The moment of truth.',
    duration: 3,
    style: 'anime',
  },
  {
    id: 'frame-3-3-4',
    sceneId: 'scene-3-3',
    frameNumber: 11,
    imageUrl: undefined,
    description: 'Felix takes a deep breath, determination replacing fear in his eyes. He steps into the water.',
    cameraAngle: 'Close-up',
    cameraMovement: 'Static',
    notes: 'Character arc culmination - choosing to be brave.',
    duration: 3,
    style: 'anime',
  },
];

export const mockShots: Shot[] = [
  // Project 1 Shots - Luna & The Starkeeper
  {
    id: 'shot-1-1-1',
    projectId: 'project-1',
    shotNumber: 1,
    frameId: 'frame-1-1-1',
    sceneId: 'scene-1-1',
    cameraAngle: 'eye-level',
    lensType: '24mm',
    cameraMovement: 'static',
    framing: 'wide',
    notes: 'Establish cozy bedroom atmosphere, warm practical lighting',
  },
  {
    id: 'shot-1-1-2',
    projectId: 'project-1',
    shotNumber: 2,
    frameId: 'frame-1-1-2',
    sceneId: 'scene-1-1',
    cameraAngle: 'eye-level',
    lensType: '85mm',
    cameraMovement: 'dolly-in',
    framing: 'close-up',
    notes: 'Intimate character moment, shallow depth of field',
  },
  {
    id: 'shot-1-1-3',
    projectId: 'project-1',
    shotNumber: 3,
    frameId: 'frame-1-1-3',
    sceneId: 'scene-1-1',
    cameraAngle: 'eye-level',
    lensType: '35mm',
    cameraMovement: 'pan-right',
    framing: 'medium',
    notes: 'Follow Luna\'s gaze to window',
  },
  {
    id: 'shot-1-2-1',
    projectId: 'project-1',
    shotNumber: 4,
    frameId: 'frame-1-2-1',
    sceneId: 'scene-1-2',
    cameraAngle: 'low-angle',
    lensType: '16mm',
    cameraMovement: 'tilt-up',
    framing: 'wide',
    notes: 'Emphasize vastness of sky, make Luna feel small',
  },
  {
    id: 'shot-1-2-2',
    projectId: 'project-1',
    shotNumber: 5,
    frameId: 'frame-1-2-2',
    sceneId: 'scene-1-2',
    cameraAngle: 'low-angle',
    lensType: '24mm',
    cameraMovement: 'tilt-up',
    framing: 'wide',
    notes: 'Hero shot of magical ladder, VFX glow effect',
  },
  {
    id: 'shot-1-3-1',
    projectId: 'project-1',
    shotNumber: 6,
    frameId: 'frame-1-3-1',
    sceneId: 'scene-1-3',
    cameraAngle: 'birds-eye',
    lensType: '14mm',
    cameraMovement: 'crane',
    framing: 'extreme-wide',
    notes: 'Reveal shot of cloud workshop, maximum visual impact',
  },
  {
    id: 'shot-1-3-2',
    projectId: 'project-1',
    shotNumber: 7,
    frameId: 'frame-1-3-3',
    sceneId: 'scene-1-3',
    cameraAngle: 'eye-level',
    lensType: '50mm',
    cameraMovement: 'static',
    framing: 'medium',
    notes: 'Starkeeper reveal - constellation VFX on body',
  },
  // Project 2 Shots - The Robot's Garden
  {
    id: 'shot-2-1-1',
    projectId: 'project-2',
    shotNumber: 1,
    frameId: 'frame-2-1-1',
    sceneId: 'scene-2-1',
    cameraAngle: 'eye-level',
    lensType: '14mm',
    cameraMovement: 'pan-left',
    framing: 'extreme-wide',
    notes: 'Establish desolate world, grey color palette',
  },
  {
    id: 'shot-2-1-2',
    projectId: 'project-2',
    shotNumber: 2,
    frameId: 'frame-2-1-2',
    sceneId: 'scene-2-1',
    cameraAngle: 'eye-level',
    lensType: '35mm',
    cameraMovement: 'tracking',
    framing: 'medium',
    notes: 'Follow Rusty, steadicam feel',
  },
  {
    id: 'shot-2-2-1',
    projectId: 'project-2',
    shotNumber: 3,
    frameId: 'frame-2-2-3',
    sceneId: 'scene-2-2',
    cameraAngle: 'eye-level',
    lensType: '100mm',
    cameraMovement: 'static',
    framing: 'close-up',
    notes: 'Seed packet discovery - hope emerges',
  },
  {
    id: 'shot-2-4-1',
    projectId: 'project-2',
    shotNumber: 4,
    frameId: 'frame-2-4-2',
    sceneId: 'scene-2-4',
    cameraAngle: 'eye-level',
    lensType: '50mm',
    cameraMovement: 'static',
    framing: 'close-up',
    notes: 'Time-lapse flower bloom, color transition',
  },
  // Project 3 Shots - Felix the Fearful Fox
  {
    id: 'shot-3-1-1',
    projectId: 'project-3',
    shotNumber: 1,
    frameId: 'frame-3-1-1',
    sceneId: 'scene-3-1',
    cameraAngle: 'eye-level',
    lensType: '24mm',
    cameraMovement: 'static',
    framing: 'wide',
    notes: 'Cozy den interior, warm color palette',
  },
  {
    id: 'shot-3-2-1',
    projectId: 'project-3',
    shotNumber: 2,
    frameId: 'frame-3-2-2',
    sceneId: 'scene-3-2',
    cameraAngle: 'low-angle',
    lensType: '35mm',
    cameraMovement: 'static',
    framing: 'medium',
    notes: 'Oliver appears wise and imposing from Felix\'s POV',
  },
  {
    id: 'shot-3-3-1',
    projectId: 'project-3',
    shotNumber: 3,
    frameId: 'frame-3-3-1',
    sceneId: 'scene-3-3',
    cameraAngle: 'high-angle',
    lensType: '24mm',
    cameraMovement: 'static',
    framing: 'wide',
    notes: 'Show danger of flooded river, Poppy isolated',
  },
  {
    id: 'shot-3-3-2',
    projectId: 'project-3',
    shotNumber: 4,
    frameId: 'frame-3-3-4',
    sceneId: 'scene-3-3',
    cameraAngle: 'eye-level',
    lensType: '85mm',
    cameraMovement: 'dolly-in',
    framing: 'close-up',
    notes: 'Felix\'s moment of choice - hero shot',
  },
];

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}
