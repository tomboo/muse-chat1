import React, { useState, useRef, useEffect } from 'react';
import Message from './Message';

interface MessageType {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>(() => {
    const saved = localStorage.getItem('chat-messages');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const [botTyping, setBotTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView?.({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    localStorage.setItem('chat-messages', JSON.stringify(messages));
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === '') return;

    const newMessage: MessageType = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput('');

    setBotTyping(true);
    // Bot echo after short delay
    setTimeout(() => {
      const botMessage: MessageType = {
        id: Date.now(),
        text: `You said: ${newMessage.text}`,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMessage]);
      setBotTyping(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClear = () => {
    setMessages([]);
    localStorage.removeItem('chat-messages');
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 w-96">
      <div className="h-64 overflow-y-auto mb-4 border p-2 rounded">
        {messages.map((msg) => (
          <Message key={msg.id} text={msg.text} sender={msg.sender} timestamp={msg.timestamp} />
        ))}
        {botTyping && (
          <div className="text-sm text-gray-500 italic">Bot is typing…</div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex mb-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-grow border rounded-l px-2 py-1"
          placeholder="Type a message... (Enter to send, Shift+Enter for newline)"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 rounded-r"
        >
          Send
        </button>
      </div>
      <button
        onClick={handleClear}
        className="text-sm text-red-500 underline"
      >
        Clear conversation
      </button>
    </div>
  );
};

export default ChatWindow;