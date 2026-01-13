import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { ProjectsTab } from '@/components/dashboard/ProjectsTab';
import { HomeTab } from '@/components/dashboard/HomeTab';
import { CharactersTab } from '@/components/dashboard/CharactersTab';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab />;
      case 'projects':
        return <ProjectsTab />;
      case 'characters':
        return <CharactersTab />;
      default:
        return <HomeTab />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-muted/30">
        <DashboardSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="flex-1 flex flex-col">
          <Header>
            <SidebarTrigger className="mr-2" />
          </Header>
          <main className="flex-1 container mx-auto px-4 py-8">
            {renderContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
