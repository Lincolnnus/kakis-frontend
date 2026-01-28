import React, { createContext, useContext, useState, ReactNode } from 'react';

export type WorkspaceType = 'personal' | 'team';
export type WorkspacePlan = 'free' | 'pro' | 'studio';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  status: 'active' | 'pending';
  joinedAt: string;
}

export interface Workspace {
  id: string;
  name: string;
  type: WorkspaceType;
  avatar?: string;
  plan: WorkspacePlan;
  memberCount?: number;
  projectCount?: number;
  members?: TeamMember[];
}

interface WorkspaceContextType {
  currentWorkspace: Workspace;
  workspaces: Workspace[];
  setCurrentWorkspace: (workspace: Workspace) => void;
  isPersonal: boolean;
}

const personalMembers: TeamMember[] = [
  {
    id: 'personal-1',
    name: 'You',
    email: 'you@example.com',
    role: 'owner',
    status: 'active',
    joinedAt: '2024-01-01',
  },
];

const creativeStudioMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Alex Director',
    email: 'alex@creativestudio.com',
    role: 'owner',
    status: 'active',
    joinedAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Jordan Lee',
    email: 'jordan@creativestudio.com',
    role: 'admin',
    status: 'active',
    joinedAt: '2024-02-20',
  },
  {
    id: '3',
    name: 'Sam Rivera',
    email: 'sam@creativestudio.com',
    role: 'member',
    status: 'active',
    joinedAt: '2024-03-10',
  },
  {
    id: '4',
    name: 'Taylor Chen',
    email: 'taylor@creativestudio.com',
    role: 'member',
    status: 'active',
    joinedAt: '2024-04-05',
  },
  {
    id: '5',
    name: 'Morgan Kim',
    email: 'morgan@example.com',
    role: 'viewer',
    status: 'pending',
    joinedAt: '2024-06-01',
  },
];

const clientABCMembers: TeamMember[] = [
  {
    id: 'abc-1',
    name: 'Client Manager',
    email: 'manager@clientabc.com',
    role: 'owner',
    status: 'active',
    joinedAt: '2024-03-01',
  },
  {
    id: 'abc-2',
    name: 'You',
    email: 'you@example.com',
    role: 'member',
    status: 'active',
    joinedAt: '2024-03-15',
  },
  {
    id: 'abc-3',
    name: 'Designer',
    email: 'designer@clientabc.com',
    role: 'member',
    status: 'active',
    joinedAt: '2024-04-01',
  },
];

const mockWorkspaces: Workspace[] = [
  { 
    id: 'personal', 
    name: 'Personal', 
    type: 'personal',
    plan: 'pro',
    projectCount: 5,
    memberCount: 1,
    members: personalMembers,
  },
  { 
    id: 'org-1', 
    name: 'Creative Studio', 
    type: 'team',
    plan: 'studio',
    memberCount: 5,
    projectCount: 12,
    members: creativeStudioMembers,
  },
  { 
    id: 'org-2', 
    name: 'Client ABC', 
    type: 'team',
    plan: 'pro',
    memberCount: 3,
    projectCount: 4,
    members: clientABCMembers,
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
