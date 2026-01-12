import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { AnimaticPlayer } from '@/components/animatic/AnimaticPlayer';
import { ExportPanel } from '@/components/export/ExportPanel';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProject } from '@/contexts/ProjectContext';
import { ArrowLeft, Film, Download, ListChecks } from 'lucide-react';

export default function Animatic() {
  const { projectId } = useParams<{ projectId: string }>();
  const { 
    projects, 
    scenes, 
    frames,
    shots,
    setCurrentProject,
    updateFrame
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
              to={`/project/${projectId}/shots`}
              className="mb-2 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Shot List
            </Link>
            <h1 className="text-2xl font-bold">{project.title} — Animatic & Export</h1>
            <p className="text-muted-foreground">
              {projectFrames.length} frames • {projectFrames.reduce((acc, f) => acc + f.duration, 0)}s total
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to={`/project/${projectId}/shots`}>
                <ListChecks className="mr-2 h-4 w-4" />
                Shot List
              </Link>
            </Button>
          </div>
        </div>

        {/* Tabs for Animatic and Export */}
        <Tabs defaultValue="animatic" className="space-y-6">
          <TabsList>
            <TabsTrigger value="animatic" className="gap-2">
              <Film className="h-4 w-4" />
              Animatic Preview
            </TabsTrigger>
            <TabsTrigger value="export" className="gap-2">
              <Download className="h-4 w-4" />
              Export & Share
            </TabsTrigger>
          </TabsList>

          <TabsContent value="animatic">
            <AnimaticPlayer 
              frames={projectFrames}
              onUpdateFrame={updateFrame}
            />
          </TabsContent>

          <TabsContent value="export">
            <ExportPanel 
              projectTitle={project.title}
              frameCount={projectFrames.length}
              shotCount={projectShots.length}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
