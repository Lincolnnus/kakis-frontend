import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { ScriptInput } from '@/components/script/ScriptInput';
import { SceneList } from '@/components/script/SceneList';
import { WorkflowStepper } from '@/components/project/WorkflowStepper';
import { CharacterList } from '@/components/project/CharacterList';
import { ThemeMusicSection } from '@/components/project/ThemeMusicSection';
import { StoryboardSummaryCard } from '@/components/project/StoryboardSummaryCard';
import { ShotsSummaryCard } from '@/components/project/ShotsSummaryCard';
import { AnimaticSummaryCard } from '@/components/project/AnimaticSummaryCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProject } from '@/contexts/ProjectContext';
import { useToast } from '@/hooks/use-toast';
import { parseScriptAsync } from '@/utils/scriptParser';
import { 
  ArrowLeft, 
  FileText, 
  Layers, 
  Image,
  ListChecks, 
  Film,
  Settings
} from 'lucide-react';

export default function Project() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { 
    projects, 
    scenes,
    frames,
    shots,
    setCurrentProject,
    addScene,
    updateScene,
    deleteScene,
    reorderScenes
  } = useProject();
  const { toast } = useToast();
  const [isParsingScript, setIsParsingScript] = useState(false);
  const [activeTab, setActiveTab] = useState('script');

  const project = projects.find(p => p.id === projectId);
  const projectScenes = scenes.filter(s => s.projectId === projectId);
  const projectFrames = frames.filter(f => projectScenes.some(s => s.id === f.sceneId));
  const projectShots = shots.filter(s => s.projectId === projectId);
  
  // Track if script has been parsed (has scenes)
  const scriptHasContent = projectScenes.length > 0;
  const hasAnimatic = projectFrames.length > 0; // Simple check for now

  useEffect(() => {
    if (project) {
      setCurrentProject(project);
    } else if (projectId) {
      // Project not found, redirect to dashboard
      navigate('/dashboard');
    }
  }, [project, projectId, setCurrentProject, navigate]);

  const handleParseScript = async (script: string) => {
    if (!projectId) return;
    
    setIsParsingScript(true);
    try {
      const parsedScenes = await parseScriptAsync(script, projectId);
      
      // Add all parsed scenes
      parsedScenes.forEach(scene => {
        addScene(scene);
      });

      toast({
        title: 'Script parsed successfully!',
        description: `Found ${parsedScenes.length} scenes in your script.`,
      });

      // Switch to scenes tab
      setActiveTab('scenes');
    } catch (error) {
      toast({
        title: 'Parsing failed',
        description: 'Could not parse the script. Please check the format.',
        variant: 'destructive',
      });
    } finally {
      setIsParsingScript(false);
    }
  };

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading project...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Project Header */}
        <div className="mb-8">
          <Link 
            to="/dashboard" 
            className="mb-4 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold">{project.title}</h1>
              <p className="mt-1 text-muted-foreground">{project.description}</p>
            </div>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Workflow Stepper */}
        <WorkflowStepper
          scriptHasContent={scriptHasContent}
          sceneCount={projectScenes.length}
          frameCount={projectFrames.length}
          shotCount={projectShots.length}
          hasAnimatic={hasAnimatic}
          activeTab={activeTab}
          onStepClick={setActiveTab}
        />

        {/* Project Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-3xl grid-cols-5">
            <TabsTrigger value="script" className="gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Script</span>
            </TabsTrigger>
            <TabsTrigger value="scenes" className="gap-2">
              <Layers className="h-4 w-4" />
              <span className="hidden sm:inline">Scenes</span>
              {projectScenes.length > 0 && (
                <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs">
                  {projectScenes.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="storyboard" className="gap-2">
              <Image className="h-4 w-4" />
              <span className="hidden sm:inline">Storyboard</span>
              {projectFrames.length > 0 && (
                <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs">
                  {projectFrames.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="shots" className="gap-2">
              <ListChecks className="h-4 w-4" />
              <span className="hidden sm:inline">Shots</span>
              {projectShots.length > 0 && (
                <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs">
                  {projectShots.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="animatic" className="gap-2">
              <Film className="h-4 w-4" />
              <span className="hidden sm:inline">Animatic</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="script" className="space-y-6">
            <ScriptInput onParse={handleParseScript} isLoading={isParsingScript} />
          </TabsContent>

          <TabsContent value="scenes" className="space-y-6">
            {/* Character & Theme Section */}
            <div className="grid gap-6 lg:grid-cols-2">
              <CharacterList 
                scenes={projectScenes} 
                projectId={projectId!} 
              />
              <ThemeMusicSection projectId={projectId!} />
            </div>

            {/* Scene List */}
            <SceneList
              scenes={projectScenes}
              projectId={projectId!}
              onUpdate={updateScene}
              onDelete={deleteScene}
              onAdd={addScene}
              onReorder={reorderScenes}
            />
          </TabsContent>

          <TabsContent value="storyboard" className="space-y-6">
            <StoryboardSummaryCard
              projectId={projectId!}
              scenes={projectScenes}
              frames={projectFrames}
            />
          </TabsContent>

          <TabsContent value="shots" className="space-y-6">
            <ShotsSummaryCard
              projectId={projectId!}
              shots={projectShots}
              frames={projectFrames}
              sceneCount={projectScenes.length}
            />
          </TabsContent>

          <TabsContent value="animatic" className="space-y-6">
            <AnimaticSummaryCard
              projectId={projectId!}
              frames={projectFrames}
              sceneCount={projectScenes.length}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
