import { Check, ChevronDown, Plus, Settings, User, Users } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useWorkspace, Workspace } from '@/contexts/WorkspaceContext';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export function WorkspaceSwitcher() {
  const { currentWorkspace, workspaces, setCurrentWorkspace, isPersonal } = useWorkspace();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const handleCreateTeam = async () => {
    if (!newTeamName.trim()) return;
    
    setIsCreating(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: 'Team Created',
      description: `"${newTeamName}" has been created successfully.`,
    });
    
    setIsCreating(false);
    setNewTeamName('');
    setCreateDialogOpen(false);
  };

  const planColors = {
    free: 'bg-muted text-muted-foreground',
    pro: 'bg-primary/10 text-primary',
    studio: 'bg-amber-500/10 text-amber-600',
  };

  const personalWorkspaces = workspaces.filter(w => w.type === 'personal');
  const teamWorkspaces = workspaces.filter(w => w.type === 'team');

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-full justify-between gap-2 px-2 h-auto py-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                {isPersonal ? (
                  <User className="h-4 w-4 text-primary" />
                ) : (
                  <Users className="h-4 w-4 text-primary" />
                )}
              </div>
              <div className="flex flex-col items-start min-w-0">
                <span className="text-sm font-medium truncate max-w-[120px]">
                  {currentWorkspace.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {isPersonal ? 'Personal account' : `${currentWorkspace.memberCount} members`}
                </span>
              </div>
            </div>
            <ChevronDown className="h-4 w-4 opacity-50 shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-64">
          {/* Personal Section */}
          <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
            Personal Account
          </DropdownMenuLabel>
          {personalWorkspaces.map((workspace) => (
            <WorkspaceItem
              key={workspace.id}
              workspace={workspace}
              isSelected={currentWorkspace.id === workspace.id}
              onSelect={() => setCurrentWorkspace(workspace)}
              planColors={planColors}
            />
          ))}
          
          <DropdownMenuSeparator />
          
          {/* Teams Section */}
          <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
            Teams
          </DropdownMenuLabel>
          {teamWorkspaces.length > 0 ? (
            teamWorkspaces.map((workspace) => (
              <WorkspaceItem
                key={workspace.id}
                workspace={workspace}
                isSelected={currentWorkspace.id === workspace.id}
                onSelect={() => setCurrentWorkspace(workspace)}
                planColors={planColors}
              />
            ))
          ) : (
            <div className="px-2 py-3 text-sm text-muted-foreground text-center">
              No teams yet
            </div>
          )}
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={() => setCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Team
          </DropdownMenuItem>
          
          {!isPersonal && (
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Team Settings
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Create Team
            </DialogTitle>
            <DialogDescription>
              Create a new team to collaborate with others on projects
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="team-name">Team Name</Label>
              <Input
                id="team-name"
                placeholder="My Creative Team"
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
              />
            </div>

            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
              <div className="flex items-start gap-3">
                <Users className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">Collaborate Together</p>
                  <p className="text-sm text-muted-foreground">
                    Teams let you share projects, characters, and assets with collaborators. 
                    Each team member can have different permission levels.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleCreateTeam} 
              disabled={!newTeamName.trim() || isCreating}
            >
              {isCreating ? 'Creating...' : 'Create Team'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

interface WorkspaceItemProps {
  workspace: Workspace;
  isSelected: boolean;
  onSelect: () => void;
  planColors: Record<string, string>;
}

function WorkspaceItem({ workspace, isSelected, onSelect, planColors }: WorkspaceItemProps) {
  const isPersonal = workspace.type === 'personal';
  
  return (
    <DropdownMenuItem
      onClick={onSelect}
      className="flex items-center justify-between py-2"
    >
      <div className="flex items-center gap-2 min-w-0">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-muted">
          {isPersonal ? (
            <User className="h-3.5 w-3.5" />
          ) : (
            <Users className="h-3.5 w-3.5" />
          )}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-sm truncate">{workspace.name}</span>
          {!isPersonal && workspace.memberCount && (
            <span className="text-xs text-muted-foreground">
              {workspace.memberCount} members
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {workspace.plan && (
          <Badge variant="secondary" className={`text-xs ${planColors[workspace.plan]}`}>
            {workspace.plan}
          </Badge>
        )}
        {isSelected && (
          <Check className="h-4 w-4 text-primary" />
        )}
      </div>
    </DropdownMenuItem>
  );
}
