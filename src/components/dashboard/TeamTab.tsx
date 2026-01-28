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
  Clock
} from 'lucide-react';
import { InviteMemberDialog } from './InviteMemberDialog';
import { OrganizationSwitcher } from './OrganizationSwitcher';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  status: 'active' | 'pending';
  joinedAt: string;
}

interface Organization {
  id: string;
  name: string;
  plan: 'free' | 'pro' | 'studio';
  memberCount: number;
  projectCount: number;
}

const mockOrganization: Organization = {
  id: 'org-1',
  name: 'Creative Studio',
  plan: 'pro',
  memberCount: 5,
  projectCount: 12,
};

const mockMembers: TeamMember[] = [
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

const roleConfig = {
  owner: { label: 'Owner', icon: Crown, variant: 'default' as const, color: 'text-amber-500' },
  admin: { label: 'Admin', icon: Shield, variant: 'secondary' as const, color: 'text-primary' },
  member: { label: 'Member', icon: Users, variant: 'outline' as const, color: 'text-muted-foreground' },
  viewer: { label: 'Viewer', icon: Users, variant: 'outline' as const, color: 'text-muted-foreground' },
};

export function TeamTab() {
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [members] = useState<TeamMember[]>(mockMembers);
  const [organization] = useState<Organization>(mockOrganization);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Team</h1>
          <p className="text-muted-foreground">Manage your organization and team members</p>
        </div>
        <div className="flex items-center gap-3">
          <OrganizationSwitcher />
          <Button onClick={() => setInviteDialogOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Invite Member
          </Button>
        </div>
      </div>

      {/* Organization Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Organization</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{organization.name}</div>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="text-xs">
                <Sparkles className="mr-1 h-3 w-3" />
                {organization.plan.charAt(0).toUpperCase() + organization.plan.slice(1)} Plan
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
            <div className="text-2xl font-bold">{organization.memberCount}</div>
            <p className="text-xs text-muted-foreground">
              {members.filter(m => m.status === 'pending').length} pending invitations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Projects</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{organization.projectCount}</div>
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
