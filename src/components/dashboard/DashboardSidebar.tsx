import { Home, FolderKanban, Users, UsersRound, CreditCard, LogOut, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import kakisLogo from '@/assets/kakis-logo.png';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { WorkspaceSwitcher } from './WorkspaceSwitcher';
import { Separator } from '@/components/ui/separator';

const navItems = [
  { title: 'Home', value: 'home', icon: Home },
  { title: 'Projects', value: 'projects', icon: FolderKanban },
  { title: 'Characters', value: 'characters', icon: Users },
  { title: 'Team', value: 'team', icon: UsersRound },
];

interface DashboardSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function DashboardSidebar({ activeTab, onTabChange }: DashboardSidebarProps) {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';
  const { user, logout } = useAuth();
  const { currentPlan } = useSubscription();

  return (
    <Sidebar collapsible="icon" className="border-r">
      {/* Logo Header */}
      <SidebarHeader className="px-3 py-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={kakisLogo} alt="Kakis AI" className="h-10 w-10 shrink-0" />
          {!isCollapsed && <span className="text-xl font-bold">Kakis AI</span>}
        </Link>
      </SidebarHeader>

      {/* Workspace Switcher */}
      {!isCollapsed && (
        <div className="px-3 pb-2">
          <WorkspaceSwitcher />
          <Separator className="mt-3" />
        </div>
      )}

      {/* Navigation */}
      <SidebarContent className="pt-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.value}>
                  <SidebarMenuButton
                    onClick={() => onTabChange(item.value)}
                    isActive={activeTab === item.value}
                    tooltip={item.title}
                    className="w-full"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* User Profile Footer */}
      <SidebarFooter className="border-t p-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              tooltip={user?.name || 'User'}
              className="w-full justify-start"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <span className="text-xs font-medium text-primary">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              {!isCollapsed && (
                <div className="flex flex-1 items-center justify-between overflow-hidden">
                  <div className="flex flex-col items-start overflow-hidden">
                    <span className="truncate text-sm font-medium">{user?.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {currentPlan.name}
                    </Badge>
                  </div>
                </div>
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="start" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span>{user?.name}</span>
                <span className="text-xs font-normal text-muted-foreground">{user?.email}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/billing" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Billing
                {currentPlan.id === 'free' && (
                  <Badge className="ml-auto text-xs" variant="secondary">
                    <Sparkles className="mr-1 h-3 w-3" />
                    Upgrade
                  </Badge>
                )}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
