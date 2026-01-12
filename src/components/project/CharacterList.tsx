import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Users, 
  Plus, 
  Edit2, 
  Mic,
  Sparkles
} from 'lucide-react';
import { Scene } from '@/types';

interface Character {
  name: string;
  sceneCount: number;
  dialogueCount: number;
  description?: string;
  voiceType?: string;
  color: string;
}

interface CharacterListProps {
  scenes: Scene[];
  projectId: string;
}

const AVATAR_COLORS = [
  'bg-red-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-purple-500',
  'bg-orange-500',
  'bg-pink-500',
  'bg-cyan-500',
  'bg-yellow-500',
];

const VOICE_TYPES = [
  { value: 'male-deep', label: 'Male (Deep)' },
  { value: 'male-tenor', label: 'Male (Tenor)' },
  { value: 'female-alto', label: 'Female (Alto)' },
  { value: 'female-soprano', label: 'Female (Soprano)' },
  { value: 'child', label: 'Child' },
  { value: 'elderly-male', label: 'Elderly (Male)' },
  { value: 'elderly-female', label: 'Elderly (Female)' },
];

export function CharacterList({ scenes, projectId }: CharacterListProps) {
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newCharacterName, setNewCharacterName] = useState('');

  // Extract unique characters from scenes
  const characters: Character[] = [];
  const characterMap = new Map<string, { sceneCount: number; dialogueCount: number }>();

  scenes.forEach(scene => {
    scene.characters.forEach(char => {
      const existing = characterMap.get(char) || { sceneCount: 0, dialogueCount: 0 };
      existing.sceneCount += 1;
      characterMap.set(char, existing);
    });
    scene.dialogue.forEach(line => {
      const existing = characterMap.get(line.character) || { sceneCount: 0, dialogueCount: 0 };
      existing.dialogueCount += 1;
      characterMap.set(line.character, existing);
    });
  });

  let colorIndex = 0;
  characterMap.forEach((stats, name) => {
    characters.push({
      name,
      sceneCount: stats.sceneCount,
      dialogueCount: stats.dialogueCount,
      color: AVATAR_COLORS[colorIndex % AVATAR_COLORS.length],
    });
    colorIndex++;
  });

  // Sort by dialogue count (most important characters first)
  characters.sort((a, b) => b.dialogueCount - a.dialogueCount);

  const handleAddCharacter = () => {
    if (newCharacterName.trim()) {
      // In a real implementation, this would add to project state
      setNewCharacterName('');
      setIsAddingNew(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Characters
            </CardTitle>
            <CardDescription>
              {characters.length} characters extracted from your script
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={() => setIsAddingNew(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Character
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {characters.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Users className="mb-4 h-12 w-12 text-muted-foreground/50" />
            <p className="text-muted-foreground">
              Parse your script to extract characters automatically
            </p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {characters.map((character) => (
              <Dialog key={character.name}>
                <DialogTrigger asChild>
                  <button 
                    className="flex items-center gap-3 rounded-lg border bg-card p-3 text-left transition-colors hover:bg-muted/50"
                    onClick={() => setEditingCharacter(character)}
                  >
                    <Avatar className={character.color}>
                      <AvatarFallback className="text-white font-medium">
                        {character.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{character.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{character.sceneCount} scenes</span>
                        <span>•</span>
                        <span>{character.dialogueCount} lines</span>
                      </div>
                    </div>
                    <Edit2 className="h-4 w-4 text-muted-foreground" />
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Avatar className={`h-8 w-8 ${character.color}`}>
                        <AvatarFallback className="text-white text-sm">
                          {character.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      Edit Character: {character.name}
                    </DialogTitle>
                    <DialogDescription>
                      Configure character details and voice settings
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Character Name</Label>
                      <Input defaultValue={character.name} />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea 
                        placeholder="Brief character description for AI image generation..."
                        defaultValue={character.description}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Mic className="h-4 w-4" />
                        Voice Type (for AI dialogue)
                      </Label>
                      <Select defaultValue={character.voiceType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select voice type" />
                        </SelectTrigger>
                        <SelectContent>
                          {VOICE_TYPES.map(voice => (
                            <SelectItem key={voice.value} value={voice.value}>
                              {voice.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg border bg-muted/50 p-3">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <p className="text-sm text-muted-foreground">
                        Voice will be used for AI dialogue generation in animatic
                      </p>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button className="flex-1">Save Changes</Button>
                      <Button variant="outline">Preview Voice</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        )}

        {/* Add Character Dialog */}
        <Dialog open={isAddingNew} onOpenChange={setIsAddingNew}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Character</DialogTitle>
              <DialogDescription>
                Add a character that wasn't detected in the script
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Character Name</Label>
                <Input 
                  value={newCharacterName}
                  onChange={(e) => setNewCharacterName(e.target.value)}
                  placeholder="Enter character name"
                />
              </div>
              <Button onClick={handleAddCharacter} className="w-full">
                Add Character
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
