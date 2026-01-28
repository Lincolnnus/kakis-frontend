import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Download, 
  FileText, 
  Image, 
  Film, 
  Table2, 
  Share2, 
  Copy, 
  Check,
  Loader2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ExportPanelProps {
  projectTitle: string;
  frameCount: number;
  shotCount: number;
}

export function ExportPanel({ projectTitle, frameCount, shotCount }: ExportPanelProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportType, setExportType] = useState<string | null>(null);
  const [includeNotes, setIncludeNotes] = useState(true);
  const [quality, setQuality] = useState('high');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleExport = async (type: string) => {
    setExportType(type);
    setIsExporting(true);

    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsExporting(false);
    setExportType(null);

    toast({
      title: 'Export Ready!',
      description: `Your ${type.toUpperCase()} file is ready for download.`,
    });
  };

  const handleCopyLink = async () => {
    const shareUrl = `https://kakis.ai/share/${Math.random().toString(36).substring(7)}`;
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: 'Link Copied!',
      description: 'Share link copied to clipboard.',
    });
  };

  const exportOptions = [
    {
      id: 'pdf',
      icon: FileText,
      title: 'PDF Storyboard',
      description: 'High-quality PDF with all frames and notes',
      action: () => handleExport('pdf'),
    },
    {
      id: 'images',
      icon: Image,
      title: 'Image Package',
      description: 'ZIP file with all frame images',
      action: () => handleExport('zip'),
    },
    {
      id: 'video',
      icon: Film,
      title: 'Animatic Video',
      description: 'MP4 video of your animatic',
      action: () => handleExport('mp4'),
    },
    {
      id: 'csv',
      icon: Table2,
      title: 'Shot List CSV',
      description: 'Spreadsheet with all shot details',
      action: () => handleExport('csv'),
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export Options
          </CardTitle>
          <CardDescription>
            Download your storyboard in various formats
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Export Settings */}
          <div className="flex flex-wrap gap-4 rounded-lg bg-muted p-4">
            <div className="space-y-2">
              <Label>Quality</Label>
              <Select value={quality} onValueChange={setQuality}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low (Fast)</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High (Best)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2 pt-6">
              <Checkbox 
                id="notes" 
                checked={includeNotes}
                onCheckedChange={(checked) => setIncludeNotes(!!checked)}
              />
              <Label htmlFor="notes" className="cursor-pointer">Include notes & dialogue</Label>
            </div>
          </div>

          {/* Export Buttons */}
          <div className="grid gap-4 sm:grid-cols-2">
            {exportOptions.map((option) => (
              <Button
                key={option.id}
                variant="outline"
                className="h-auto flex-col items-start gap-1 p-4 text-left"
                onClick={option.action}
                disabled={isExporting}
              >
                <div className="flex w-full items-center gap-2">
                  {isExporting && exportType === option.id ? (
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  ) : (
                    <option.icon className="h-5 w-5 text-primary" />
                  )}
                  <span className="font-medium">{option.title}</span>
                </div>
                <span className="text-xs text-muted-foreground">{option.description}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Share */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Share Project
          </CardTitle>
          <CardDescription>
            Share a view-only link with collaborators
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <div className="flex-1 rounded-lg border bg-muted px-4 py-2">
              <span className="text-sm text-muted-foreground">
                https://kakis.ai/share/...
              </span>
            </div>
            <Button onClick={handleCopyLink}>
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Link
                </>
              )}
            </Button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Anyone with this link can view the storyboard (read-only)
          </p>
        </CardContent>
      </Card>

      {/* Project Stats */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">{frameCount}</p>
              <p className="text-sm text-muted-foreground">Frames</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{shotCount}</p>
              <p className="text-sm text-muted-foreground">Shots</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{frameCount * 2}</p>
              <p className="text-sm text-muted-foreground">Est. Duration (s)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
