import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Building2, 
  Users, 
  UserPlus, 
  Crown, 
  Shield, 
  MoreVertical,
  Mail,
  Settings,
  Sparkles,
  Check,
  Clock,
  User
} from 'lucide-react';
import { InviteMemberDialog } from './InviteMemberDialog';
import { useWorkspace, TeamMember } from '@/contexts/WorkspaceContext';

const roleConfig = {
  owner: { label: 'Owner', icon: Crown, variant: 'default' as const, color: 'text-amber-500' },
  admin: { label: 'Admin', icon: Shield, variant: 'secondary' as const, color: 'text-primary' },
  member: { label: 'Member', icon: Users, variant: 'outline' as const, color: 'text-muted-foreground' },
  viewer: { label: 'Viewer', icon: Users, variant: 'outline' as const, color: 'text-muted-foreground' },
};

export function TeamTab() {
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const { currentWorkspace, isPersonal } = useWorkspace();
  
  const members = currentWorkspace.members || [];
  const pendingCount = members.filter(m => m.status === 'pending').length;

  // Personal workspace view
  if (isPersonal) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Team</h1>
            <p className="text-muted-foreground">You're on a personal account</p>
          </div>
        </div>

        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 rounded-full bg-muted p-4">
              <User className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Personal Account</h3>
            <p className="mb-6 max-w-md text-muted-foreground">
              Your personal workspace is for individual projects. Create or join a team 
              to collaborate with others on shared projects and characters.
            </p>
            <Button>
              <Users className="mr-2 h-4 w-4" />
              Create a Team
            </Button>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <CardTitle>Why Create a Team?</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Share Projects</p>
                  <p className="text-sm text-muted-foreground">
                    Collaborate on storyboards in real-time
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Shared Characters</p>
                  <p className="text-sm text-muted-foreground">
                    Build a common character library
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Team Billing</p>
                  <p className="text-sm text-muted-foreground">
                    One subscription for the whole team
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Team workspace view
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Team</h1>
          <p className="text-muted-foreground">Manage {currentWorkspace.name} members</p>
        </div>
        <Button onClick={() => setInviteDialogOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Invite Member
        </Button>
      </div>

      {/* Organization Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Team</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentWorkspace.name}</div>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="text-xs">
                <Sparkles className="mr-1 h-3 w-3" />
                {currentWorkspace.plan.charAt(0).toUpperCase() + currentWorkspace.plan.slice(1)} Plan
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentWorkspace.memberCount}</div>
            <p className="text-xs text-muted-foreground">
              {pendingCount} pending invitation{pendingCount !== 1 ? 's' : ''}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Projects</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentWorkspace.projectCount}</div>
            <p className="text-xs text-muted-foreground">Shared across team</p>
          </CardContent>
        </Card>
      </div>

      {/* Team Members List */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>
            Manage who has access to your organization and their permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {members.map((member) => {
              const RoleIcon = roleConfig[member.role].icon;
              return (
                <div
                  key={member.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{member.name}</span>
                        {member.status === 'pending' && (
                          <Badge variant="outline" className="text-xs">
                            <Clock className="mr-1 h-3 w-3" />
                            Pending
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        {member.email}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge variant={roleConfig[member.role].variant}>
                      <RoleIcon className={`mr-1 h-3 w-3 ${roleConfig[member.role].color}`} />
                      {roleConfig[member.role].label}
                    </Badge>
                    
                    {member.role !== 'owner' && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem>
                            <Shield className="mr-2 h-4 w-4" />
                            Change Role
                          </DropdownMenuItem>
                          {member.status === 'pending' && (
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Resend Invitation
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            Remove from Team
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* AI Features Card */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle>AI-Powered Team Insights</CardTitle>
          </div>
          <CardDescription>
            Get intelligent recommendations for your team's workflow
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start gap-3 rounded-lg border bg-background p-4">
              <Check className="mt-0.5 h-5 w-5 text-green-500" />
              <div>
                <p className="font-medium">Collaboration Score: Excellent</p>
                <p className="text-sm text-muted-foreground">
                  Your team has great project completion rates
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border bg-background p-4">
              <Sparkles className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Suggestion</p>
                <p className="text-sm text-muted-foreground">
                  Consider adding a dedicated storyboard reviewer
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <InviteMemberDialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen} />
    </div>
  );
}
