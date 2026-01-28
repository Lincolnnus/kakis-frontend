import React, { createContext, useContext, useState, ReactNode } from 'react';

export type WorkspaceType = 'personal' | 'team';

export interface Workspace {
  id: string;
  name: string;
  type: WorkspaceType;
  avatar?: string;
  plan?: 'free' | 'pro' | 'studio';
  memberCount?: number;
}

interface WorkspaceContextType {
  currentWorkspace: Workspace;
  workspaces: Workspace[];
  setCurrentWorkspace: (workspace: Workspace) => void;
  isPersonal: boolean;
}

const mockWorkspaces: Workspace[] = [
  { 
    id: 'personal', 
    name: 'Personal', 
    type: 'personal',
    plan: 'pro'
  },
  { 
    id: 'org-1', 
    name: 'Creative Studio', 
    type: 'team',
    plan: 'studio',
    memberCount: 8
  },
  { 
    id: 'org-2', 
    name: 'Client ABC', 
    type: 'team',
    plan: 'pro',
    memberCount: 3
  },
];

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [workspaces] = useState<Workspace[]>(mockWorkspaces);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace>(mockWorkspaces[0]);

  const isPersonal = currentWorkspace.type === 'personal';

  return (
    <WorkspaceContext.Provider
      value={{
        currentWorkspace,
        workspaces,
        setCurrentWorkspace,
        isPersonal,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (context === undefined) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
}
