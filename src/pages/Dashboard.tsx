import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProjectsTab } from '@/components/dashboard/ProjectsTab';
import { HomeTab } from '@/components/dashboard/HomeTab';
import { CharactersTab } from '@/components/dashboard/CharactersTab';
import { Home, FolderKanban, Users } from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="home" className="gap-2">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="gap-2">
              <FolderKanban className="h-4 w-4" />
              <span className="hidden sm:inline">Projects</span>
            </TabsTrigger>
            <TabsTrigger value="characters" className="gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Characters</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home">
            <HomeTab />
          </TabsContent>

          <TabsContent value="projects">
            <ProjectsTab />
          </TabsContent>

          <TabsContent value="characters">
            <CharactersTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
