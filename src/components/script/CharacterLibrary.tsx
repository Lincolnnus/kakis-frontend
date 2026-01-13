import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Users, Search, Plus, Check, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

// Import character images
import lunaImg from '@/assets/characters/luna.png';
import felixImg from '@/assets/characters/felix.png';
import oliverImg from '@/assets/characters/oliver.png';
import fernImg from '@/assets/characters/fern.png';
import rustyImg from '@/assets/characters/rusty.png';
import cloverImg from '@/assets/characters/clover.png';
import starkeeperImg from '@/assets/characters/starkeeper.png';

export interface LibraryCharacter {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: 'hero' | 'sidekick' | 'villain' | 'mentor' | 'comic-relief';
  traits: string[];
  voiceType?: string;
}

const PREDEFINED_CHARACTERS: LibraryCharacter[] = [
  {
    id: 'luna',
    name: 'Luna',
    description: 'A curious young girl with a love for adventure and stars',
    imageUrl: lunaImg,
    category: 'hero',
    traits: ['Curious', 'Brave', 'Kind'],
    voiceType: 'Young Female'
  },
  {
    id: 'felix',
    name: 'Felix',
    description: 'A clever fox with quick wit and a mischievous streak',
    imageUrl: felixImg,
    category: 'sidekick',
    traits: ['Clever', 'Loyal', 'Playful'],
    voiceType: 'Male Mid'
  },
  {
    id: 'oliver',
    name: 'Oliver',
    description: 'A wise old owl who guides heroes on their journey',
    imageUrl: oliverImg,
    category: 'mentor',
    traits: ['Wise', 'Patient', 'Mysterious'],
    voiceType: 'Male Deep'
  },
  {
    id: 'fern',
    name: 'Fern',
    description: 'A nature spirit with the power to communicate with plants',
    imageUrl: fernImg,
    category: 'sidekick',
    traits: ['Gentle', 'Nature-loving', 'Empathetic'],
    voiceType: 'Female Soft'
  },
  {
    id: 'rusty',
    name: 'Rusty',
    description: 'A grumpy but lovable robot with a heart of gold',
    imageUrl: rustyImg,
    category: 'comic-relief',
    traits: ['Sarcastic', 'Protective', 'Loyal'],
    voiceType: 'Robotic'
  },
  {
    id: 'clover',
    name: 'Clover',
    description: 'A lucky rabbit who always finds a way out of trouble',
    imageUrl: cloverImg,
    category: 'hero',
    traits: ['Lucky', 'Optimistic', 'Resourceful'],
    voiceType: 'Young Male'
  },
  {
    id: 'starkeeper',
    name: 'The Starkeeper',
    description: 'An ancient cosmic entity who guards the night sky',
    imageUrl: starkeeperImg,
    category: 'mentor',
    traits: ['Ethereal', 'All-knowing', 'Enigmatic'],
    voiceType: 'Ethereal'
  }
];

const CATEGORY_COLORS: Record<string, string> = {
  'hero': 'bg-blue-500/10 text-blue-600 border-blue-500/30',
  'sidekick': 'bg-green-500/10 text-green-600 border-green-500/30',
  'villain': 'bg-red-500/10 text-red-600 border-red-500/30',
  'mentor': 'bg-purple-500/10 text-purple-600 border-purple-500/30',
  'comic-relief': 'bg-amber-500/10 text-amber-600 border-amber-500/30'
};

interface CharacterLibraryProps {
  selectedCharacters: string[];
  onCharacterToggle: (characterId: string) => void;
}

export function CharacterLibrary({ selectedCharacters, onCharacterToggle }: CharacterLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredCharacters = PREDEFINED_CHARACTERS.filter(char => {
    const matchesSearch = char.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      char.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || char.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Users className="h-5 w-5" />
          Character Library
        </CardTitle>
        <CardDescription>
          Select characters to include in your story, or add custom ones later
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search characters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Category Filter */}
        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
            <TabsTrigger value="hero" className="text-xs">Heroes</TabsTrigger>
            <TabsTrigger value="sidekick" className="text-xs">Sidekicks</TabsTrigger>
            <TabsTrigger value="mentor" className="text-xs">Mentors</TabsTrigger>
            <TabsTrigger value="villain" className="text-xs">Villains</TabsTrigger>
            <TabsTrigger value="comic-relief" className="text-xs">Comic Relief</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Character Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {filteredCharacters.map((character) => {
            const isSelected = selectedCharacters.includes(character.id);
            return (
              <button
                key={character.id}
                onClick={() => onCharacterToggle(character.id)}
                className={cn(
                  'group relative flex flex-col overflow-hidden rounded-lg border-2 bg-card transition-all hover:scale-[1.02]',
                  isSelected
                    ? 'border-primary ring-2 ring-primary/20'
                    : 'border-border hover:border-muted-foreground/30'
                )}
              >
                {/* Character Image */}
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <img
                    src={character.imageUrl}
                    alt={character.name}
                    className="h-full w-full object-cover"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 flex items-center justify-center bg-primary/20">
                      <div className="rounded-full bg-primary p-1.5">
                        <Check className="h-4 w-4 text-primary-foreground" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Character Info */}
                <div className="p-2 text-left">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{character.name}</p>
                    <Badge 
                      variant="outline" 
                      className={cn('text-[10px] px-1.5 py-0 capitalize', CATEGORY_COLORS[character.category])}
                    >
                      {character.category.replace('-', ' ')}
                    </Badge>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                    {character.description}
                  </p>
                </div>
              </button>
            );
          })}

          {/* Add Custom Character */}
          <button
            className="flex aspect-[3/4] flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/30 transition-colors hover:border-primary/50 hover:bg-muted/50"
          >
            <div className="rounded-full bg-muted p-3">
              <Plus className="h-5 w-5 text-muted-foreground" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">Add Custom</span>
          </button>
        </div>

        {/* Selected Summary */}
        {selectedCharacters.length > 0 && (
          <div className="flex items-center justify-between rounded-lg bg-primary/5 px-3 py-2">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">
                {selectedCharacters.length} character{selectedCharacters.length > 1 ? 's' : ''} selected
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => selectedCharacters.forEach(id => onCharacterToggle(id))}
              className="text-xs"
            >
              Clear all
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export { PREDEFINED_CHARACTERS };
