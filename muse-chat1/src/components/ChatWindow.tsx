import React, { useState } from 'react';
import { useChat } from '../context/ChatContext';

const ChatWindow: React.FC = () => {
  const { messages, addMessage } = useChat();
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    addMessage(input);
    setInput('');
  };

  return (
    <div>
      <div>
        {messages.map((msg) => (
          <div key={msg.id}>{msg.sender}: {msg.text}</div>
        ))}
      </div>
      <input
        placeholder="Type a message"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};
export default ChatWindow;