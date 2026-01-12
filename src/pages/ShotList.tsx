import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { ShotGrid } from '@/components/shots/ShotGrid';
import { Button } from '@/components/ui/button';
import { useProject } from '@/contexts/ProjectContext';
import { ArrowLeft, ArrowRight, Layers } from 'lucide-react';

export default function ShotList() {
  const { projectId } = useParams<{ projectId: string }>();
  const { 
    projects, 
    scenes, 
    shots,
    frames,
    setCurrentProject,
    addShot,
    updateShot,
    deleteShot
  } = useProject();

  const project = projects.find(p => p.id === projectId);
  const projectScenes = scenes.filter(s => s.projectId === projectId);
  const projectShots = shots.filter(s => s.projectId === projectId);
  const projectFrames = frames.filter(f => 
    projectScenes.some(s => s.id === f.sceneId)
  );

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
              to={`/project/${projectId}/storyboard`}
              className="mb-2 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Storyboard
            </Link>
            <h1 className="text-2xl font-bold">{project.title} — Shot List</h1>
            <p className="text-muted-foreground">
              {projectShots.length} shots • {projectScenes.length} scenes • Visual editor with audio
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to={`/project/${projectId}/storyboard`}>
                <Layers className="mr-2 h-4 w-4" />
                Storyboard
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

        {/* Shot Grid */}
        <ShotGrid
          shots={projectShots}
          frames={projectFrames}
          projectId={projectId!}
          sceneIds={projectScenes.map(s => s.id)}
          onAddShot={addShot}
          onUpdateShot={updateShot}
          onDeleteShot={deleteShot}
        />
      </main>
    </div>
  );
}
