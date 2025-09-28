import React from 'react';

interface MessageProps {
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

const Message: React.FC<MessageProps> = ({ text, sender, timestamp }) => {
  return (
    <div className="mb-2">
      <strong>{sender}:</strong> {text}
      <span className="text-xs text-gray-500 ml-2">{timestamp}</span>
    </div>
  );
};

export default Message;
