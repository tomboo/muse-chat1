import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { loadMessages, saveMessages } from '../utils/storage';

interface MessageType {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

interface ChatContextType {
  messages: MessageType[];
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
  botTyping: boolean;
  setBotTyping: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<MessageType[]>(() => loadMessages());
  const [botTyping, setBotTyping] = useState(false);

  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  return (
    <ChatContext.Provider value={{ messages, setMessages, botTyping, setBotTyping }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};