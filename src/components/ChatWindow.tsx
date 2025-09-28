import React, { useRef, useEffect, useState } from 'react';
import Message from './Message';
import { useChat } from '../context/ChatContext';

const ChatWindow: React.FC = () => {
  const { messages, setMessages, botTyping, setBotTyping } = useChat();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView?.({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === '') return;

    const newMessage = {
      id: Date.now(),
      text: input,
      sender: 'user' as const,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput('');

    setBotTyping(true);
    setTimeout(() => {
      const botMessage = {
        id: Date.now(),
        text: `You said: ${newMessage.text}`,
        sender: 'bot' as const,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
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
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-4 w-96 text-gray-900 dark:text-gray-100">
      <div className="h-64 overflow-y-auto mb-4 border p-2 rounded dark:border-gray-600">
        {messages.map((msg) => (
          <Message
            key={msg.id}
            text={msg.text}
            sender={msg.sender}
            timestamp={msg.timestamp}
          />
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
          className="flex-grow border rounded-l px-2 py-1 dark:bg-gray-700"
          placeholder="Type a message... (Enter to send, Shift+Enter for newline)"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 rounded-r"
        >
          Send
        </button>
      </div>
      <button onClick={handleClear} className="text-sm text-red-500 underline">
        Clear conversation
      </button>
    </div>
  );
};

export default ChatWindow;
