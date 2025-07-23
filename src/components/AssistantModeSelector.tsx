import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { MessageSquare, FileText, HeadphonesIcon } from "lucide-react";

export type AssistantMode = "faq" | "content" | "support";

interface AssistantModeSelectorProps {
  selectedMode: AssistantMode;
  onModeChange: (mode: AssistantMode) => void;
}

const modes = [
  {
    id: "faq" as const,
    label: "FAQ Bot",
    description: "Get answers to frequently asked questions",
    icon: MessageSquare,
  },
  {
    id: "content" as const,
    label: "Content Generation",
    description: "Create engaging content and copy",
    icon: FileText,
  },
  {
    id: "support" as const,
    label: "Customer Support",
    description: "Get help with your questions and issues",
    icon: HeadphonesIcon,
  },
];

export const AssistantModeSelector = ({ selectedMode, onModeChange }: AssistantModeSelectorProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <h3 className="text-sm font-medium text-foreground mb-3">Choose Assistant Mode</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {modes.map((mode) => {
          const Icon = mode.icon;
          return (
            <Button
              key={mode.id}
              variant={selectedMode === mode.id ? "default" : "outline"}
              onClick={() => onModeChange(mode.id)}
              className={cn(
                "h-auto p-4 flex flex-col items-center text-center gap-2",
                selectedMode === mode.id && "ring-2 ring-ring"
              )}
            >
              <Icon className="w-5 h-5" />
              <div>
                <div className="font-medium text-sm">{mode.label}</div>
                <div className="text-xs opacity-80 mt-1">{mode.description}</div>
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
};