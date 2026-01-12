import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Header } from '@/components/layout/Header';
import { useProject } from '@/contexts/ProjectContext';
import { Plus, Search, Film, Calendar, Layers } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Dashboard() {
  const { projects, createProject } = useProject();
  const [search, setSearch] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredProjects = projects.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateProject = () => {
    if (!newTitle.trim()) return;
    createProject(newTitle, newDescription);
    toast({ title: 'Project created!', description: `"${newTitle}" is ready to go.` });
    setNewTitle('');
    setNewDescription('');
    setDialogOpen(false);
  };

  const statusColors = {
    draft: 'bg-muted text-muted-foreground',
    'in-progress': 'bg-primary/10 text-primary',
    completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Projects</h1>
            <p className="text-muted-foreground">Manage your storyboard projects</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-primary">
                <Plus className="mr-2 h-4 w-4" /> New Project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>Start a new storyboard project</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input id="title" placeholder="My Awesome Film" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="A brief description..." value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button className="gradient-primary" onClick={handleCreateProject}>Create Project</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search projects..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Link key={project.id} to={`/project/${project.id}`}>
              <Card className="group cursor-pointer overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg">
                <div className="aspect-video w-full overflow-hidden bg-muted">
                  {project.thumbnail ? (
                    <img 
                      src={project.thumbnail} 
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Film className="h-12 w-12 text-muted-foreground/50" />
                    </div>
                  )}
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg group-hover:text-primary">{project.title}</CardTitle>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[project.status]}`}>
                      {project.status}
                    </span>
                  </div>
                  <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Layers className="h-4 w-4" />
                      {project.frameCount} frames
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {project.updatedAt.toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="py-16 text-center">
            <Film className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
            <h3 className="mb-2 text-lg font-medium">No projects found</h3>
            <p className="text-muted-foreground">Create your first project to get started</p>
          </div>
        )}
      </main>
    </div>
  );
}
