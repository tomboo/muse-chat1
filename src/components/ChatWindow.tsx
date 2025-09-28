import React, { useState } from 'react';
import Message from './Message';

interface MessageType {
  id: number;
  text: string;
}

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;
    const newMessage: MessageType = { id: Date.now(), text: input };
    setMessages([...messages, newMessage]);
    setInput('');
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 w-96">
      <div className="h-64 overflow-y-auto mb-4 border p-2 rounded">
        {messages.map((msg) => (
          <Message key={msg.id} text={msg.text} />
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow border rounded-l px-2 py-1"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 rounded-r"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;