import React from 'react';

interface Props {
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

const Message: React.FC<Props> = ({ text, sender, timestamp }) => {
  const isUser = sender === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
      <div
        className={`p-2 rounded-lg max-w-xs ${
          isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'
        }`}
      >
        <div className="text-xs opacity-75 mb-1">
          {isUser ? 'You' : 'Bot'} · {timestamp}
        </div>
        <div>{text}</div>
      </div>
    </div>
  );
};

export default Message;
