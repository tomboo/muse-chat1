import React from 'react';

interface Props {
  text: string;
}

const Message: React.FC<Props> = ({ text }) => {
  return <div className="p-2 border-b">{text}</div>;
};

export default Message;