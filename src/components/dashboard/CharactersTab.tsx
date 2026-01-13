import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Plus, User, Globe, Lock, Mic, Volume2 } from 'lucide-react';
import { CharacterCreatorDialog } from './CharacterCreatorDialog';

// Predefined public characters from platform
const publicCharacters = [
  { id: 'luna', name: 'Luna', description: 'A curious young adventurer with silver hair', category: 'Fantasy', avatar: '/placeholder.svg', voiceProfile: 'Soft, wonder-filled' },
  { id: 'felix', name: 'Felix the Fox', description: 'A clever and mischievous fox who loves riddles', category: 'Animal', avatar: '/placeholder.svg', voiceProfile: 'Witty, playful' },
  { id: 'captain-nova', name: 'Captain Nova', description: 'A brave space explorer from the future', category: 'Sci-Fi', avatar: '/placeholder.svg', voiceProfile: 'Confident, commanding' },
  { id: 'whiskers', name: 'Professor Whiskers', description: 'An elderly wise cat who teaches magic', category: 'Fantasy', avatar: '/placeholder.svg', voiceProfile: 'Warm, grandfatherly' },
  { id: 'spark', name: 'Spark', description: 'A tiny robot with a big heart', category: 'Sci-Fi', avatar: '/placeholder.svg', voiceProfile: 'Cheerful, electronic' },
  { id: 'ivy', name: 'Ivy', description: 'A nature spirit who protects the forest', category: 'Fantasy', avatar: '/placeholder.svg', voiceProfile: 'Ethereal, gentle' },
  { id: 'rex', name: 'Rex Thunder', description: 'A superhero with electric powers', category: 'Action', avatar: '/placeholder.svg', voiceProfile: 'Bold, heroic' },
  { id: 'mimi', name: 'Mimi', description: 'A shy but talented young artist', category: 'Slice of Life', avatar: '/placeholder.svg', voiceProfile: 'Quiet, thoughtful' },
];

// User's created characters (mock data)
const myCharacters = [
  { id: 'my-hero', name: 'Alex', description: 'My custom protagonist', category: 'Custom', avatar: '/placeholder.svg', voiceProfile: 'Determined, young' },
  { id: 'my-villain', name: 'Shadow', description: 'A mysterious antagonist', category: 'Custom', avatar: '/placeholder.svg', voiceProfile: 'Deep, menacing' },
];

interface Character {
  id: string;
  name: string;
  description: string;
  category: string;
  avatar: string;
  voiceProfile: string;
}

function CharacterCard({ character, isOwned }: { character: Character; isOwned?: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVoicePreview = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 2000);
  };

  return (
    <Card className="group overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex items-start gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-full bg-muted">
            <img src={character.avatar} alt={character.name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-primary/10">
              <User className="h-6 w-6 text-muted-foreground" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-base">{character.name}</CardTitle>
              {isOwned ? (
                <Lock className="h-3 w-3 text-muted-foreground" />
              ) : (
                <Globe className="h-3 w-3 text-muted-foreground" />
              )}
            </div>
            <Badge variant="secondary" className="mt-1 text-xs">
              {character.category}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <CardDescription className="line-clamp-2 text-sm">
          {character.description}
        </CardDescription>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Mic className="h-3 w-3" />
            <span>{character.voiceProfile}</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 px-2"
            onClick={handleVoicePreview}
            disabled={isPlaying}
          >
            <Volume2 className={`h-3 w-3 ${isPlaying ? 'animate-pulse text-primary' : ''}`} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function CharactersTab() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [customCharacters, setCustomCharacters] = useState(myCharacters);

  const categories = ['all', ...new Set([...publicCharacters, ...customCharacters].map(c => c.category))];

  const filterCharacters = (characters: Character[]) => {
    return characters.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
                           c.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || c.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  };

  const handleCharacterCreate = (newChar: { name: string; description: string; avatar: string | null; voiceProfile: string; category: string }) => {
    const character: Character = {
      id: `custom-${Date.now()}`,
      name: newChar.name,
      description: newChar.description,
      category: newChar.category,
      avatar: newChar.avatar || '/placeholder.svg',
      voiceProfile: newChar.voiceProfile || 'Default voice',
    };
    setCustomCharacters(prev => [character, ...prev]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Character Library</h2>
          <p className="text-muted-foreground">Manage your characters and explore public ones</p>
        </div>
        <Button className="gradient-primary" onClick={() => setIsCreatorOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Create Character
        </Button>
      </div>

      <CharacterCreatorDialog 
        open={isCreatorOpen} 
        onOpenChange={setIsCreatorOpen}
        onCharacterCreate={handleCharacterCreate}
      />

      {/* Search & Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search characters..." 
            className="pl-10" 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={categoryFilter === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCategoryFilter(category)}
              className={categoryFilter === category ? 'gradient-primary' : ''}
            >
              {category === 'all' ? 'All' : category}
            </Button>
          ))}
        </div>
      </div>

      {/* Character Tabs */}
      <Tabs defaultValue="my-characters" className="space-y-4">
        <TabsList>
          <TabsTrigger value="my-characters" className="gap-2">
            <Lock className="h-4 w-4" />
            My Characters ({customCharacters.length})
          </TabsTrigger>
          <TabsTrigger value="public" className="gap-2">
            <Globe className="h-4 w-4" />
            Public Library ({publicCharacters.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="my-characters">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filterCharacters(customCharacters).map(character => (
              <CharacterCard key={character.id} character={character} isOwned />
            ))}
          </div>
          {filterCharacters(customCharacters).length === 0 && (
            <div className="py-12 text-center">
              <User className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
              <h3 className="mb-2 text-lg font-medium">No characters found</h3>
              <p className="text-muted-foreground">Create your first character to get started</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="public">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filterCharacters(publicCharacters).map(character => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
          {filterCharacters(publicCharacters).length === 0 && (
            <div className="py-12 text-center">
              <Globe className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
              <h3 className="mb-2 text-lg font-medium">No characters found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
