import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
}

export const ChatMessage = ({ message, isUser, timestamp }: ChatMessageProps) => {
  return (
    <div className={cn("flex w-full mb-6", isUser ? "justify-end" : "justify-start")}>
      <div className={cn(
        "max-w-[80%] rounded-2xl px-4 py-3 shadow-sm",
        isUser 
          ? "bg-primary text-primary-foreground ml-4" 
          : "bg-card border border-border mr-4"
      )}>
        <div className="flex items-start gap-3">
          {!isUser && (
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-sm font-medium text-accent-foreground">AI</span>
            </div>
          )}
          <div className="flex-1">
            <p className={cn(
              "text-sm leading-relaxed",
              isUser ? "text-primary-foreground" : "text-foreground"
            )}>
              {message}
            </p>
            <span className={cn(
              "text-xs mt-2 block",
              isUser ? "text-primary-foreground/70" : "text-muted-foreground"
            )}>
              {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          {isUser && (
            <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-sm font-medium text-primary-foreground">You</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};