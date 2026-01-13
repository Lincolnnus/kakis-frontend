import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { StyleSelector } from '@/components/script/StyleSelector';
import { CharacterLibrary } from '@/components/script/CharacterLibrary';
import { Send, Sparkles, Settings2, ChevronDown, ChevronUp, Bot, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProject } from '@/contexts/ProjectContext';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function HomeTab() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm your AI storyboard assistant. Paste your script or describe your story idea, and I'll help you break it down into scenes and storyboards. You can also configure your visual style and characters using the settings panel.",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState('anime');
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { createProject } = useProject();
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
        content: `Great! I've analyzed your script. Here's what I found:\n\n📝 **Script Summary:**\n${input.slice(0, 100)}${input.length > 100 ? '...' : ''}\n\n🎨 **Selected Style:** ${selectedStyle}\n👥 **Characters:** ${selectedCharacters.length > 0 ? selectedCharacters.join(', ') : 'None selected'}\n\nWould you like me to create a new project and break this down into scenes? Click the button below to proceed.`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleCreateFromScript = () => {
    const project = createProject('New Script Project', input.slice(0, 200));
    toast({ title: 'Project created!', description: 'Navigating to your new project...' });
    navigate(`/project/${project.id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-[calc(100vh-12rem)] flex-col">
      {/* Settings Panel */}
      <Collapsible open={settingsOpen} onOpenChange={setSettingsOpen} className="mb-4">
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            <div className="flex items-center gap-2">
              <Settings2 className="h-4 w-4" />
              <span>Style & Characters</span>
              {(selectedStyle || selectedCharacters.length > 0) && (
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                  {selectedCharacters.length > 0 ? `${selectedCharacters.length} selected` : selectedStyle}
                </span>
              )}
            </div>
            {settingsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4 space-y-6">
          <StyleSelector selectedStyle={selectedStyle} onStyleSelect={setSelectedStyle} />
          <CharacterLibrary selectedCharacters={selectedCharacters} onCharacterToggle={(id) => {
            setSelectedCharacters(prev => 
              prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
            );
          }} />
        </CollapsibleContent>
      </Collapsible>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto rounded-lg border bg-background p-4">
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
              <div className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.role === 'user' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted'
              }`}>
                <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                <p className="mt-1 text-xs opacity-60">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                <Bot className="h-4 w-4" />
              </div>
              <div className="rounded-lg bg-muted px-4 py-2">
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
            <Button onClick={handleCreateFromScript} className="gradient-primary">
              <Sparkles className="mr-2 h-4 w-4" />
              Create Project from Script
            </Button>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="mt-4 flex gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Paste your script or describe your story idea..."
          className="min-h-[60px] resize-none"
          disabled={isLoading}
        />
        <Button 
          onClick={handleSend} 
          disabled={!input.trim() || isLoading}
          className="gradient-primary h-auto"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
