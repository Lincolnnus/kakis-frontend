import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { StoryboardCanvas } from '@/components/storyboard/StoryboardCanvas';
import { Button } from '@/components/ui/button';
import { useProject } from '@/contexts/ProjectContext';
import { ArrowLeft, ArrowRight, Layers, ListChecks } from 'lucide-react';

export default function Storyboard() {
  const { projectId } = useParams<{ projectId: string }>();
  const { 
    projects, 
    scenes, 
    frames,
    setCurrentProject,
    addFrame,
    updateFrame,
    deleteFrame
  } = useProject();

  const project = projects.find(p => p.id === projectId);
  const projectScenes = scenes.filter(s => s.projectId === projectId);
  const projectFrames = frames.filter(f => 
    projectScenes.some(s => s.id === f.sceneId) || f.sceneId === ''
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
              to={`/project/${projectId}`}
              className="mb-2 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Project
            </Link>
            <h1 className="text-2xl font-bold">{project.title} — Storyboard</h1>
            <p className="text-muted-foreground">
              {projectScenes.length} scenes • {projectFrames.length} frames
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
              <Link to={`/project/${projectId}/shots`}>
                Shot List
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Canvas */}
        <StoryboardCanvas
          frames={projectFrames}
          scenes={projectScenes}
          projectId={projectId!}
          onAddFrame={addFrame}
          onUpdateFrame={updateFrame}
          onDeleteFrame={deleteFrame}
        />
      </main>
    </div>
  );
}
