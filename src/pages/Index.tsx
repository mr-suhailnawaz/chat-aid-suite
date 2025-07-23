import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { AssistantModeSelector, AssistantMode } from "@/components/AssistantModeSelector";
import { ChatHeader } from "@/components/ChatHeader";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI assistant. I can help you with FAQs, content generation, or customer support. How can I assist you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [selectedMode, setSelectedMode] = useState<AssistantMode>("faq");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string, mode: AssistantMode): string => {
    // Mock responses based on mode and message
    const responses = {
      faq: [
        "Based on our FAQ database, here's what I found: This is a common question! The answer depends on your specific situation, but generally...",
        "I can help you with that! This question comes up frequently. Here's the standard response...",
        "Great question! According to our knowledge base, the best approach is..."
      ],
      content: [
        "Here's some engaging content for your request: Let me craft something compelling that captures your audience's attention...",
        "I'll generate some creative content for you: Based on your requirements, here's a draft that should work well...",
        "Content creation time! Here's what I've come up with based on your brief..."
      ],
      support: [
        "I understand your concern. Let me help you resolve this issue step by step...",
        "Thank you for reaching out! I'm here to help. Based on what you've described, here's what we can do...",
        "I'm sorry you're experiencing this issue. Let's work together to find a solution..."
      ]
    };

    const modeResponses = responses[mode];
    return modeResponses[Math.floor(Math.random() * modeResponses.length)];
  };

  const handleSendMessage = async (messageText: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(messageText, selectedMode),
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleModeChange = (mode: AssistantMode) => {
    setSelectedMode(mode);
    const modeChangeMessage: Message = {
      id: Date.now().toString(),
      text: `I've switched to ${mode.charAt(0).toUpperCase() + mode.slice(1)} mode. How can I help you now?`,
      isUser: false,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, modeChangeMessage]);
  };

  return (
    <div className="min-h-screen bg-chat-background flex flex-col">
      <ChatHeader selectedMode={selectedMode} />
      
      <div className="flex-1 overflow-hidden flex flex-col max-w-4xl mx-auto w-full">
        <div className="p-4">
          <AssistantModeSelector 
            selectedMode={selectedMode} 
            onModeChange={handleModeChange} 
          />
        </div>
        
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message.text}
                isUser={message.isUser}
                timestamp={message.timestamp}
              />
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-card border border-border mr-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                      <span className="text-sm font-medium text-accent-foreground">AI</span>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
      
      <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
    </div>
  );
};

export default Index;
