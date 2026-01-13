import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { StyleSelector } from '@/components/script/StyleSelector';
import { CharacterLibrary } from '@/components/script/CharacterLibrary';
import { Send, Sparkles, Plus, Palette, Bot, User, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProject } from '@/contexts/ProjectContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ExpandedSceneCard } from './ExpandedSceneCard';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ExpandedScene {
  sceneNumber: number;
  heading: string;
  location: string;
  timeOfDay: string;
  description: string;
  characters: string[];
  dialogue: { character: string; text: string }[];
  lighting: string;
}

interface StoryResponse {
  summary: string;
  scenes: ExpandedScene[];
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function HomeTab() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [expandedStory, setExpandedStory] = useState<StoryResponse | null>(null);
  const [originalPrompt, setOriginalPrompt] = useState('');
  const [regeneratingScene, setRegeneratingScene] = useState<number | null>(null);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState('anime');
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);
  const [showStyleDialog, setShowStyleDialog] = useState(false);
  const [showCharacterDialog, setShowCharacterDialog] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { createProject, addScene } = useProject();
  const { toast } = useToast();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setOriginalPrompt(input);
    setIsLoading(true);
    setExpandedStory(null);

    try {
      const { data, error } = await supabase.functions.invoke('expand-story', {
        body: {
          description: input,
          style: selectedStyle,
          characters: selectedCharacters,
        },
      });

      if (error) throw error;

      const storyData = data as StoryResponse;
      setExpandedStory(storyData);

      const sceneList = storyData.scenes
        .map(s => `**Scene ${s.sceneNumber}: ${s.heading}**\n${s.description}`)
        .join('\n\n');

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `✨ **I've expanded your story idea!**\n\n${storyData.summary}\n\n---\n\n${sceneList}\n\n---\n\n🎨 **Style:** ${selectedStyle}\n👥 **Characters:** ${storyData.scenes.flatMap(s => s.characters).filter((v, i, a) => a.indexOf(v) === i).join(', ') || 'To be designed'}\n\nReady to create your project with these ${storyData.scenes.length} scenes?`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error('Error expanding story:', error);
      const errorMessage = error?.message || 'Failed to expand story. Please try again.';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      // Remove the user message if we failed
      setMessages(prev => prev.filter(m => m.id !== userMessage.id));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateFromScript = async () => {
    if (!expandedStory) return;

    setIsCreatingProject(true);
    
    try {
      // Create the project with the story summary
      const project = createProject('New Story Project', expandedStory.summary);
      
      // Convert expanded scenes to project scenes
      expandedStory.scenes.forEach((scene) => {
        addScene({
          projectId: project.id,
          sceneNumber: scene.sceneNumber,
          heading: scene.heading,
          location: scene.location,
          timeOfDay: scene.timeOfDay,
          description: scene.description,
          characters: scene.characters,
          dialogue: scene.dialogue.map((d, i) => ({
            id: `dialogue-${Date.now()}-${i}`,
            character: d.character,
            text: d.text,
          })),
          lighting: scene.lighting,
        });
      });

      toast({ 
        title: 'Project created!', 
        description: `Created ${expandedStory.scenes.length} scenes from your story. Ready for storyboarding!` 
      });
      
      // Navigate to project with scenes tab active
      navigate(`/project/${project.id}?tab=scenes`);
    } catch (error) {
      toast({ 
        title: 'Error creating project', 
        description: 'Something went wrong while creating your project.',
        variant: 'destructive'
      });
    } finally {
      setIsCreatingProject(false);
    }
  };

  const handleSceneUpdate = (updatedScene: ExpandedScene) => {
    if (!expandedStory) return;
    setExpandedStory({
      ...expandedStory,
      scenes: expandedStory.scenes.map(s => 
        s.sceneNumber === updatedScene.sceneNumber ? updatedScene : s
      ),
    });
    toast({ title: 'Scene updated', description: `Scene ${updatedScene.sceneNumber} has been saved.` });
  };

  const handleSceneRegenerate = async (sceneNumber: number) => {
    if (!expandedStory) return;
    
    setRegeneratingScene(sceneNumber);
    const originalScene = expandedStory.scenes.find(s => s.sceneNumber === sceneNumber);
    
    try {
      const { data, error } = await supabase.functions.invoke('regenerate-scene', {
        body: {
          sceneNumber,
          originalDescription: originalScene?.description || '',
          style: selectedStyle,
          storyContext: originalPrompt,
        },
      });

      if (error) throw error;

      const newScene = data as ExpandedScene;
      setExpandedStory({
        ...expandedStory,
        scenes: expandedStory.scenes.map(s => 
          s.sceneNumber === sceneNumber ? newScene : s
        ),
      });
      
      toast({ title: 'Scene regenerated!', description: `Scene ${sceneNumber} has been refreshed with a new take.` });
    } catch (error: any) {
      console.error('Error regenerating scene:', error);
      toast({
        title: 'Error',
        description: error?.message || 'Failed to regenerate scene.',
        variant: 'destructive',
      });
    } finally {
      setRegeneratingScene(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const hasConversation = messages.length > 0;

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col items-center justify-center">
      {/* Chat Messages - Only show when there's a conversation */}
      {hasConversation && (
        <div className="mb-6 w-full max-w-4xl flex-1 overflow-y-auto rounded-xl border bg-card/50 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                  message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                }`}>
                  {message.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted'
                }`}>
                  {message.role === 'assistant' && expandedStory ? (
                    <div className="space-y-3">
                      <p className="text-sm font-medium">✨ I've expanded your story idea!</p>
                      <p className="text-sm text-foreground/80">{expandedStory.summary}</p>
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="rounded-2xl bg-muted px-4 py-3">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-foreground/50" style={{ animationDelay: '0ms' }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-foreground/50" style={{ animationDelay: '150ms' }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-foreground/50" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Editable Scene Cards */}
          {expandedStory && !isLoading && (
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Generated Scenes ({expandedStory.scenes.length})
                </h3>
                <p className="text-xs text-muted-foreground">
                  Click edit ✏️ to modify or refresh 🔄 to regenerate
                </p>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {expandedStory.scenes.map((scene) => (
                  <ExpandedSceneCard
                    key={scene.sceneNumber}
                    scene={scene}
                    onUpdate={handleSceneUpdate}
                    onRegenerate={handleSceneRegenerate}
                    isRegenerating={regeneratingScene === scene.sceneNumber}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Create Project Button */}
          {expandedStory && !isLoading && (
            <div className="mt-6 flex justify-center">
              <Button 
                onClick={handleCreateFromScript} 
                className="gradient-primary"
                disabled={isCreatingProject || regeneratingScene !== null}
              >
                {isCreatingProject ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Project...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Create Project with {expandedStory.scenes.length} Scenes
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Main Input Area - Centered when no conversation */}
      <div className={`w-full max-w-3xl ${!hasConversation ? 'flex-1 flex flex-col justify-center' : ''}`}>
        {!hasConversation && (
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-semibold text-foreground">What story will you bring to life?</h1>
            <p className="mt-2 text-muted-foreground">From script to screen — let's create something magical together.</p>
          </div>
        )}
        
        {/* Dark Input Container with Glow */}
        <div className="relative">
          {/* Glow Effect */}
          <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-b from-cyan-500/20 via-cyan-500/5 to-transparent blur-xl" />
          
          <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/95 shadow-xl backdrop-blur-sm">
            {/* Input Area */}
            <div className="relative p-4">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe your story, paste a script, or share an idea..."
                className="min-h-[120px] resize-none border-0 bg-transparent text-base placeholder:text-muted-foreground/60 focus-visible:ring-0"
                disabled={isLoading}
              />
            </div>

            {/* Bottom Action Bar */}
            <div className="flex items-center gap-2 border-t border-border/30 px-4 py-3">
              {/* Plus Button */}
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 shrink-0 rounded-lg border-border/50 bg-muted/50 hover:bg-muted"
              >
                <Plus className="h-4 w-4" />
              </Button>

              {/* Style Button */}
              <Button
                variant="outline"
                onClick={() => setShowStyleDialog(true)}
                className="h-9 gap-2 rounded-lg border-border/50 bg-muted/50 px-3 hover:bg-muted"
              >
                <Palette className="h-4 w-4" />
                <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
                  {selectedStyle ? '1' : '0'} Style
                </span>
              </Button>

              {/* Characters Button */}
              <Button
                variant="outline"
                onClick={() => setShowCharacterDialog(true)}
                className="h-9 gap-2 rounded-lg border-border/50 bg-muted/50 px-3 hover:bg-muted"
              >
                <span className="text-base">😊</span>
                <span>Characters</span>
                {selectedCharacters.length > 0 && (
                  <span className="rounded-full bg-primary/20 px-1.5 text-xs text-primary">
                    {selectedCharacters.length}
                  </span>
                )}
              </Button>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Send Button */}
              <Button 
                onClick={handleSend} 
                disabled={!input.trim() || isLoading}
                size="icon"
                className="h-9 w-9 shrink-0 rounded-lg bg-primary hover:bg-primary/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Style Dialog */}
      <Dialog open={showStyleDialog} onOpenChange={setShowStyleDialog}>
        <DialogContent className="max-h-[80vh] max-w-4xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Select Visual Style</DialogTitle>
          </DialogHeader>
          <StyleSelector selectedStyle={selectedStyle} onStyleSelect={(style) => {
            setSelectedStyle(style);
            setShowStyleDialog(false);
          }} />
        </DialogContent>
      </Dialog>

      {/* Character Dialog */}
      <Dialog open={showCharacterDialog} onOpenChange={setShowCharacterDialog}>
        <DialogContent className="max-h-[80vh] max-w-4xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Select Characters</DialogTitle>
          </DialogHeader>
          <CharacterLibrary 
            selectedCharacters={selectedCharacters} 
            onCharacterToggle={(id) => {
              setSelectedCharacters(prev => 
                prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
              );
            }} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
