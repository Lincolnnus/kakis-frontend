import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { StyleSelector } from '@/components/script/StyleSelector';
import { CharacterLibrary } from '@/components/script/CharacterLibrary';
import { Send, Sparkles, Plus, Palette, Bot, User, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProject } from '@/contexts/ProjectContext';
import { useToast } from '@/hooks/use-toast';
import { parseScriptAsync } from '@/utils/scriptParser';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function HomeTab() {
  const [messages, setMessages] = useState<Message[]>([]);
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
    setIsLoading(true);

    // Simulate AI processing
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Great! I've analyzed your script. Here's what I found:\n\n📝 **Script Summary:**\n${userMessage.content.slice(0, 100)}${userMessage.content.length > 100 ? '...' : ''}\n\n🎨 **Selected Style:** ${selectedStyle}\n👥 **Characters:** ${selectedCharacters.length > 0 ? selectedCharacters.join(', ') : 'None selected'}\n\nWould you like me to create a new project and break this down into scenes?`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleCreateFromScript = async () => {
    const lastUserMessage = messages.filter(m => m.role === 'user').pop();
    if (!lastUserMessage) return;

    setIsCreatingProject(true);
    
    try {
      // Create the project
      const project = createProject('New Script Project', lastUserMessage.content.slice(0, 200));
      
      // Parse the script and create scenes
      const parsedScenes = await parseScriptAsync(lastUserMessage.content, project.id);
      
      // Add all parsed scenes to the project
      parsedScenes.forEach(scene => {
        addScene(scene);
      });

      toast({ 
        title: 'Project created!', 
        description: `Created ${parsedScenes.length} scenes from your script. Ready for storyboarding!` 
      });
      
      // Navigate to project with scenes tab active
      navigate(`/project/${project.id}?tab=scenes`);
    } catch (error) {
      toast({ 
        title: 'Error creating project', 
        description: 'Something went wrong while parsing your script.',
        variant: 'destructive'
      });
    } finally {
      setIsCreatingProject(false);
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
        <div className="mb-6 w-full max-w-3xl flex-1 overflow-y-auto rounded-xl border bg-card/50 p-4">
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
                  <p className="whitespace-pre-wrap text-sm">{message.content}</p>
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

          {/* Create Project Button */}
          {messages.length > 1 && !isLoading && (
            <div className="mt-4 flex justify-center">
              <Button 
                onClick={handleCreateFromScript} 
                className="gradient-primary"
                disabled={isCreatingProject}
              >
                {isCreatingProject ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Scenes...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Create Project & Generate Scenes
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
