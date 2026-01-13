import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, User, Mic, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface CharacterCreatorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCharacterCreate?: (character: NewCharacter) => void;
}

interface NewCharacter {
  name: string;
  description: string;
  avatar: string | null;
  voiceProfile: string;
  category: string;
}

const VOICE_PROFILES = [
  { id: "warm-narrator", name: "Warm Narrator", description: "Gentle, storytelling voice" },
  { id: "energetic-child", name: "Energetic Child", description: "Playful, youthful tone" },
  { id: "wise-elder", name: "Wise Elder", description: "Deep, thoughtful voice" },
  { id: "friendly-companion", name: "Friendly Companion", description: "Cheerful, supportive tone" },
  { id: "mysterious-guide", name: "Mysterious Guide", description: "Intriguing, whispery voice" },
  { id: "heroic-adventurer", name: "Heroic Adventurer", description: "Bold, confident voice" },
];

const CATEGORIES = [
  "Hero",
  "Sidekick",
  "Mentor",
  "Villain",
  "Magical Creature",
  "Animal",
  "Robot",
  "Narrator",
  "Supporting",
  "Other",
];

export function CharacterCreatorDialog({ open, onOpenChange, onCharacterCreate }: CharacterCreatorDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [voiceProfile, setVoiceProfile] = useState("");
  const [category, setCategory] = useState("");
  const [isGeneratingAvatar, setIsGeneratingAvatar] = useState(false);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatarPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateAvatar = async () => {
    if (!name.trim()) {
      toast.error("Please enter a character name first");
      return;
    }
    setIsGeneratingAvatar(true);
    // Simulate AI avatar generation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // Use a placeholder for the mock
    setAvatarPreview(`https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(name)}`);
    setIsGeneratingAvatar(false);
    toast.success("Avatar generated!");
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      toast.error("Please enter a character name");
      return;
    }
    if (!category) {
      toast.error("Please select a category");
      return;
    }

    const newCharacter: NewCharacter = {
      name: name.trim(),
      description: description.trim(),
      avatar: avatarPreview,
      voiceProfile,
      category,
    };

    onCharacterCreate?.(newCharacter);
    toast.success(`Character "${name}" created!`);
    
    // Reset form
    setName("");
    setDescription("");
    setAvatarPreview(null);
    setVoiceProfile("");
    setCategory("");
    onOpenChange(false);
  };

  const handleClose = () => {
    setName("");
    setDescription("");
    setAvatarPreview(null);
    setVoiceProfile("");
    setCategory("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Create New Character
          </DialogTitle>
          <DialogDescription>
            Design a custom character for your stories with a unique look and voice.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24 border-2 border-dashed border-muted-foreground/30">
              <AvatarImage src={avatarPreview || undefined} alt="Character avatar" />
              <AvatarFallback className="bg-muted">
                <User className="h-10 w-10 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="relative" asChild>
                <label>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleAvatarUpload}
                  />
                </label>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleGenerateAvatar}
                disabled={isGeneratingAvatar}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                {isGeneratingAvatar ? "Generating..." : "AI Generate"}
              </Button>
            </div>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="character-name">Character Name *</Label>
            <Input
              id="character-name"
              placeholder="e.g., Captain Starlight"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="character-category">Category *</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="character-category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="character-description">Description</Label>
            <Textarea
              id="character-description"
              placeholder="Describe your character's personality, backstory, and role in your stories..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          {/* Voice Profile */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Mic className="h-4 w-4" />
              Voice Profile
            </Label>
            <Select value={voiceProfile} onValueChange={setVoiceProfile}>
              <SelectTrigger>
                <SelectValue placeholder="Select a voice profile (optional)" />
              </SelectTrigger>
              <SelectContent>
                {VOICE_PROFILES.map((voice) => (
                  <SelectItem key={voice.id} value={voice.id}>
                    <div className="flex flex-col">
                      <span>{voice.name}</span>
                      <span className="text-xs text-muted-foreground">{voice.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Create Character
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
