import { Scene, DialogueLine } from '@/types';
import { generateId } from '@/data/mockData';

// Mock AI script parser - simulates parsing screenplay format
export function parseScript(scriptText: string, projectId: string): Scene[] {
  const scenes: Scene[] = [];
  const lines = scriptText.split('\n');
  
  let currentScene: Partial<Scene> | null = null;
  let currentDialogue: DialogueLine[] = [];
  let sceneNumber = 0;
  let currentCharacter = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Scene heading pattern: INT./EXT. LOCATION - TIME
    const sceneHeadingMatch = line.match(/^(INT\.|EXT\.|INT\/EXT\.)\s*(.+?)\s*-\s*(.+)$/i);
    
    if (sceneHeadingMatch) {
      // Save previous scene
      if (currentScene) {
        scenes.push({
          id: `scene-${generateId()}`,
          projectId,
          sceneNumber,
          heading: currentScene.heading || '',
          location: currentScene.location || '',
          timeOfDay: currentScene.timeOfDay || '',
          description: currentScene.description || '',
          characters: extractCharacters(currentDialogue),
          dialogue: currentDialogue,
        });
      }
      
      sceneNumber++;
      currentDialogue = [];
      currentScene = {
        heading: line,
        location: sceneHeadingMatch[2].trim(),
        timeOfDay: sceneHeadingMatch[3].trim(),
        description: '',
      };
      continue;
    }
    
    if (!currentScene) continue;
    
    // Character name (all caps, possibly with parenthetical)
    const characterMatch = line.match(/^([A-Z][A-Z\s]+)(\s*\(.*\))?$/);
    if (characterMatch && line.length < 40) {
      currentCharacter = characterMatch[1].trim();
      continue;
    }
    
    // Parenthetical
    const parentheticalMatch = line.match(/^\((.+)\)$/);
    if (parentheticalMatch && currentCharacter) {
      continue;
    }
    
    // Dialogue line (after character name)
    if (currentCharacter && line && !line.match(/^(INT\.|EXT\.)/i)) {
      const lastDialogue = currentDialogue[currentDialogue.length - 1];
      if (lastDialogue && lastDialogue.character === currentCharacter) {
        lastDialogue.text += ' ' + line;
      } else if (line.length > 0 && !line.match(/^[A-Z\s]+$/)) {
        currentDialogue.push({
          id: `dialogue-${generateId()}`,
          character: currentCharacter,
          text: line,
        });
      }
      continue;
    }
    
    // Action/description lines
    if (line && !line.match(/^[A-Z\s]+$/) && line.length > 5) {
      currentScene.description = currentScene.description 
        ? currentScene.description + ' ' + line 
        : line;
      currentCharacter = '';
    }
  }
  
  // Save last scene
  if (currentScene) {
    scenes.push({
      id: `scene-${generateId()}`,
      projectId,
      sceneNumber,
      heading: currentScene.heading || '',
      location: currentScene.location || '',
      timeOfDay: currentScene.timeOfDay || '',
      description: currentScene.description || '',
      characters: extractCharacters(currentDialogue),
      dialogue: currentDialogue,
    });
  }
  
  return scenes;
}

function extractCharacters(dialogue: DialogueLine[]): string[] {
  const characters = new Set<string>();
  dialogue.forEach(d => characters.add(d.character));
  return Array.from(characters);
}

// Simulate async AI parsing with delay
export async function parseScriptAsync(scriptText: string, projectId: string): Promise<Scene[]> {
  // Simulate AI processing time
  await new Promise(resolve => setTimeout(resolve, 1500));
  return parseScript(scriptText, projectId);
}
