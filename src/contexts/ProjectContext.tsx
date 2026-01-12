import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Project, Scene, StoryboardFrame, Shot } from '@/types';
import { mockProjects, mockScenes, mockFrames, mockShots, generateId } from '@/data/mockData';

interface ProjectContextType {
  projects: Project[];
  currentProject: Project | null;
  scenes: Scene[];
  frames: StoryboardFrame[];
  shots: Shot[];
  setCurrentProject: (project: Project | null) => void;
  createProject: (title: string, description: string) => Project;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addScene: (scene: Omit<Scene, 'id'>) => Scene;
  updateScene: (id: string, updates: Partial<Scene>) => void;
  deleteScene: (id: string) => void;
  reorderScenes: (sceneIds: string[]) => void;
  addFrame: (frame: Omit<StoryboardFrame, 'id'>) => StoryboardFrame;
  updateFrame: (id: string, updates: Partial<StoryboardFrame>) => void;
  deleteFrame: (id: string) => void;
  reorderFrames: (frameIds: string[]) => void;
  addShot: (shot: Omit<Shot, 'id'>) => Shot;
  updateShot: (id: string, updates: Partial<Shot>) => void;
  deleteShot: (id: string) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [scenes, setScenes] = useState<Scene[]>(mockScenes);
  const [frames, setFrames] = useState<StoryboardFrame[]>(mockFrames);
  const [shots, setShots] = useState<Shot[]>(mockShots);

  const createProject = useCallback((title: string, description: string): Project => {
    const newProject: Project = {
      id: `project-${generateId()}`,
      title,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
      frameCount: 0,
      status: 'draft',
    };
    setProjects(prev => [newProject, ...prev]);
    return newProject;
  }, []);

  const updateProject = useCallback((id: string, updates: Partial<Project>) => {
    setProjects(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates, updatedAt: new Date() } : p))
    );
    if (currentProject?.id === id) {
      setCurrentProject(prev => prev ? { ...prev, ...updates } : null);
    }
  }, [currentProject]);

  const deleteProject = useCallback((id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    if (currentProject?.id === id) {
      setCurrentProject(null);
    }
  }, [currentProject]);

  const addScene = useCallback((scene: Omit<Scene, 'id'>): Scene => {
    const newScene: Scene = { ...scene, id: `scene-${generateId()}` };
    setScenes(prev => [...prev, newScene]);
    return newScene;
  }, []);

  const updateScene = useCallback((id: string, updates: Partial<Scene>) => {
    setScenes(prev => prev.map(s => (s.id === id ? { ...s, ...updates } : s)));
  }, []);

  const deleteScene = useCallback((id: string) => {
    setScenes(prev => prev.filter(s => s.id !== id));
  }, []);

  const reorderScenes = useCallback((sceneIds: string[]) => {
    setScenes(prev => {
      const sceneMap = new Map(prev.map(s => [s.id, s]));
      return sceneIds
        .map((id, index) => {
          const scene = sceneMap.get(id);
          return scene ? { ...scene, sceneNumber: index + 1 } : null;
        })
        .filter((s): s is Scene => s !== null);
    });
  }, []);

  const addFrame = useCallback((frame: Omit<StoryboardFrame, 'id'>): StoryboardFrame => {
    const newFrame: StoryboardFrame = { ...frame, id: `frame-${generateId()}` };
    setFrames(prev => [...prev, newFrame]);
    return newFrame;
  }, []);

  const updateFrame = useCallback((id: string, updates: Partial<StoryboardFrame>) => {
    setFrames(prev => prev.map(f => (f.id === id ? { ...f, ...updates } : f)));
  }, []);

  const deleteFrame = useCallback((id: string) => {
    setFrames(prev => prev.filter(f => f.id !== id));
  }, []);

  const reorderFrames = useCallback((frameIds: string[]) => {
    setFrames(prev => {
      const frameMap = new Map(prev.map(f => [f.id, f]));
      return frameIds
        .map((id, index) => {
          const frame = frameMap.get(id);
          return frame ? { ...frame, frameNumber: index + 1 } : null;
        })
        .filter((f): f is StoryboardFrame => f !== null);
    });
  }, []);

  const addShot = useCallback((shot: Omit<Shot, 'id'>): Shot => {
    const newShot: Shot = { ...shot, id: `shot-${generateId()}` };
    setShots(prev => [...prev, newShot]);
    return newShot;
  }, []);

  const updateShot = useCallback((id: string, updates: Partial<Shot>) => {
    setShots(prev => prev.map(s => (s.id === id ? { ...s, ...updates } : s)));
  }, []);

  const deleteShot = useCallback((id: string) => {
    setShots(prev => prev.filter(s => s.id !== id));
  }, []);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        currentProject,
        scenes,
        frames,
        shots,
        setCurrentProject,
        createProject,
        updateProject,
        deleteProject,
        addScene,
        updateScene,
        deleteScene,
        reorderScenes,
        addFrame,
        updateFrame,
        deleteFrame,
        reorderFrames,
        addShot,
        updateShot,
        deleteShot,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}
