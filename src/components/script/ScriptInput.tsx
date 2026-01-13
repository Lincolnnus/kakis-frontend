import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Upload, Wand2, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { sampleScript } from '@/data/mockData';
import { StyleSelector } from './StyleSelector';
import { CharacterLibrary } from './CharacterLibrary';

interface ScriptInputProps {
  onParse: (script: string, options?: { styleId?: string; characterIds?: string[] }) => Promise<void>;
  isLoading: boolean;
}

export function ScriptInput({ onParse, isLoading }: ScriptInputProps) {
  const [script, setScript] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Style and character selection state
  const [selectedStyle, setSelectedStyle] = useState<string | null>('anime');
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);
  const [showOptions, setShowOptions] = useState(true);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setScript(text);
    };
    reader.readAsText(file);
  };

  const handleLoadSample = () => {
    setScript(sampleScript);
    setFileName('sample_script.txt');
  };

  const handleParse = async () => {
    if (!script.trim()) return;
    await onParse(script, { 
      styleId: selectedStyle || undefined, 
      characterIds: selectedCharacters.length > 0 ? selectedCharacters : undefined 
    });
  };

  const handleCharacterToggle = (characterId: string) => {
    setSelectedCharacters(prev => 
      prev.includes(characterId)
        ? prev.filter(id => id !== characterId)
        : [...prev, characterId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Style & Character Options */}
      <Collapsible open={showOptions} onOpenChange={setShowOptions}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Pre-Production Settings</h3>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              {showOptions ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" />
                  Hide Options
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" />
                  Show Options
                </>
              )}
            </Button>
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent className="space-y-6">
          <StyleSelector 
            selectedStyle={selectedStyle} 
            onStyleSelect={setSelectedStyle} 
          />
          <CharacterLibrary 
            selectedCharacters={selectedCharacters} 
            onCharacterToggle={handleCharacterToggle} 
          />
        </CollapsibleContent>
      </Collapsible>

      {/* Script Input Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Script Input
          </CardTitle>
          <CardDescription>
            Paste your script or upload a file. We'll automatically break it down into scenes.
          </CardDescription>
        </CardHeader>
        <CardContent>
        <Tabs defaultValue="paste" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="paste">Paste Script</TabsTrigger>
            <TabsTrigger value="upload">Upload File</TabsTrigger>
          </TabsList>
          
          <TabsContent value="paste" className="space-y-4">
            <Textarea
              placeholder="Paste your screenplay here...

Example format:
INT. COFFEE SHOP - MORNING

A cozy neighborhood coffee shop. Morning light streams through large windows.

SARAH
Hello, is anyone sitting here?

JAMES
No, please sit down."
              className="min-h-[300px] font-mono text-sm"
              value={script}
              onChange={(e) => setScript(e.target.value)}
            />
          </TabsContent>
          
          <TabsContent value="upload" className="space-y-4">
            <div
              className="flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 transition-colors hover:border-primary/50 hover:bg-muted"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mb-4 h-10 w-10 text-muted-foreground" />
              <p className="mb-2 text-sm font-medium">
                {fileName || 'Click to upload or drag and drop'}
              </p>
              <p className="text-xs text-muted-foreground">
                Supports .txt, .fountain, .fdx files
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.fountain,.fdx"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>
            
            {script && (
              <div className="rounded-lg border bg-muted/50 p-4">
                <p className="mb-2 text-sm font-medium">Preview:</p>
                <pre className="max-h-[200px] overflow-auto text-xs text-muted-foreground">
                  {script.slice(0, 500)}
                  {script.length > 500 && '...'}
                </pre>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button
            onClick={handleParse}
            disabled={!script.trim() || isLoading}
            className="gradient-primary"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Parsing Script...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Parse with AI
              </>
            )}
          </Button>
          
          <Button variant="outline" onClick={handleLoadSample}>
            Load Sample Script
          </Button>
          
          {script && (
            <span className="text-sm text-muted-foreground">
              {script.split('\n').length} lines
            </span>
          )}
        </div>
        </CardContent>
      </Card>
    </div>
  );
}
