import { Check, FileText, Layers, Image, Film } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WorkflowStep {
  id: string;
  label: string;
  icon: React.ReactNode;
  count?: number;
  isComplete: boolean;
  isActive: boolean;
}

interface WorkflowStepperProps {
  scriptHasContent: boolean;
  sceneCount: number;
  frameCount: number;
  shotCount: number;
  hasAnimatic: boolean;
  activeTab: string;
  onStepClick: (stepId: string) => void;
}

export function WorkflowStepper({
  scriptHasContent,
  sceneCount,
  frameCount,
  shotCount,
  hasAnimatic,
  activeTab,
  onStepClick,
}: WorkflowStepperProps) {
  const steps: WorkflowStep[] = [
    {
      id: 'script',
      label: 'Script',
      icon: <FileText className="h-4 w-4" />,
      isComplete: scriptHasContent,
      isActive: activeTab === 'script',
    },
    {
      id: 'scenes',
      label: 'Scenes',
      icon: <Layers className="h-4 w-4" />,
      count: sceneCount,
      isComplete: sceneCount > 0,
      isActive: activeTab === 'scenes',
    },
    {
      id: 'storyboard',
      label: 'Storyboard',
      icon: <Image className="h-4 w-4" />,
      count: frameCount + shotCount,
      isComplete: frameCount > 0 || shotCount > 0,
      isActive: activeTab === 'storyboard',
    },
    {
      id: 'animatic',
      label: 'Animatic',
      icon: <Film className="h-4 w-4" />,
      isComplete: hasAnimatic,
      isActive: activeTab === 'animatic',
    },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-1 items-center">
            {/* Step Circle */}
            <button
              onClick={() => onStepClick(step.id)}
              className={cn(
                'relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200',
                step.isActive && 'border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/25',
                step.isComplete && !step.isActive && 'border-primary/50 bg-primary/10 text-primary',
                !step.isComplete && !step.isActive && 'border-muted-foreground/30 bg-muted text-muted-foreground'
              )}
            >
              {step.isComplete && !step.isActive ? (
                <Check className="h-4 w-4" />
              ) : (
                step.icon
              )}
              
              {/* Count Badge */}
              {step.count !== undefined && step.count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium text-primary-foreground">
                  {step.count}
                </span>
              )}
            </button>

            {/* Step Label */}
            <div className="ml-3 hidden sm:block">
              <p className={cn(
                'text-sm font-medium transition-colors',
                step.isActive && 'text-foreground',
                !step.isActive && 'text-muted-foreground'
              )}>
                {step.label}
              </p>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="mx-4 h-0.5 flex-1">
                <div
                  className={cn(
                    'h-full rounded-full transition-colors duration-200',
                    step.isComplete ? 'bg-primary/50' : 'bg-muted-foreground/20'
                  )}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
