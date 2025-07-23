import { AssistantMode } from "./AssistantModeSelector";
import { Bot, Sparkles } from "lucide-react";

interface ChatHeaderProps {
  selectedMode: AssistantMode;
}

const modeLabels = {
  faq: "FAQ Assistant",
  content: "Content Generator",
  support: "Support Assistant",
};

export const ChatHeader = ({ selectedMode }: ChatHeaderProps) => {
  return (
    <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 py-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">ChatGPT Assistant</h1>
            <p className="text-sm text-muted-foreground">{modeLabels[selectedMode]} • Online</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-sm text-muted-foreground">Powered by AI</span>
        </div>
      </div>
    </div>
  );
};