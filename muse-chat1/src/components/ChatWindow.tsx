import React, { useState } from 'react';
import { useChat, MessageType } from '../context/ChatContext';
import Message from './Message';

const ChatWindow: React.FC = () => {
  const { messages, addMessage } = useChat();
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    addMessage(input);
    setInput('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-4 w-96 text-gray-900 dark:text-gray-100">
      <div className="h-64 overflow-y-auto mb-4 border p-2 rounded dark:border-gray-600">
        {messages.map((msg: MessageType) => (
          <Message
            key={msg.id}
            text={msg.text}
            sender={msg.sender}
            timestamp={msg.timestamp}
          />
        ))}
      </div>
      <input
        placeholder="Type a message"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border rounded p-2 w-full mb-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 text-white rounded px-4 py-2"
      >
        Send
      </button>
    </div>
  );
};

export default ChatWindow;
