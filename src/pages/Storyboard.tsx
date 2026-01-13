import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { StoryboardCanvas } from '@/components/storyboard/StoryboardCanvas';
import { ShotGrid } from '@/components/shots/ShotGrid';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProject } from '@/contexts/ProjectContext';
import { ArrowLeft, ArrowRight, Layers, Film, Clapperboard } from 'lucide-react';

export default function Storyboard() {
  const { projectId } = useParams<{ projectId: string }>();
  const [activeTab, setActiveTab] = useState<'frames' | 'shots'>('frames');
  const { 
    projects, 
    scenes, 
    frames,
    shots,
    setCurrentProject,
    addFrame,
    updateFrame,
    deleteFrame,
    addShot,
    updateShot,
    deleteShot
  } = useProject();

  const project = projects.find(p => p.id === projectId);
  const projectScenes = scenes.filter(s => s.projectId === projectId);
  const projectFrames = frames.filter(f => 
    projectScenes.some(s => s.id === f.sceneId) || f.sceneId === ''
  );
  const projectShots = shots.filter(s => s.projectId === projectId);

  useEffect(() => {
    if (project) {
      setCurrentProject(project);
    }
  }, [project, setCurrentProject]);

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
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <Link 
              to={`/project/${projectId}`}
              className="mb-2 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Project
            </Link>
            <h1 className="text-2xl font-bold">{project.title} — Storyboard</h1>
            <p className="text-muted-foreground">
              {projectScenes.length} scenes • {projectShots.length} shots • {projectFrames.length} frames
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to={`/project/${projectId}?tab=scenes`}>
                <Layers className="mr-2 h-4 w-4" />
                Scenes
              </Link>
            </Button>
            <Button className="gradient-primary" asChild>
              <Link to={`/project/${projectId}/animatic`}>
                Animatic
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Tabs for Frames and Shots */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'frames' | 'shots')} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="frames" className="flex items-center gap-2">
              <Film className="h-4 w-4" />
              Frames
              <span className="ml-1 rounded-full bg-muted px-2 py-0.5 text-xs">
                {projectFrames.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="shots" className="flex items-center gap-2">
              <Clapperboard className="h-4 w-4" />
              Shots
              <span className="ml-1 rounded-full bg-muted px-2 py-0.5 text-xs">
                {projectShots.length}
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="frames" className="mt-6">
            <StoryboardCanvas
              frames={projectFrames}
              scenes={projectScenes}
              shots={projectShots}
              projectId={projectId!}
              onAddFrame={addFrame}
              onUpdateFrame={updateFrame}
              onDeleteFrame={deleteFrame}
            />
          </TabsContent>

          <TabsContent value="shots" className="mt-6">
            <ShotGrid
              shots={projectShots}
              frames={projectFrames}
              projectId={projectId!}
              sceneIds={projectScenes.map(s => s.id)}
              onAddShot={addShot}
              onUpdateShot={updateShot}
              onDeleteShot={deleteShot}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
