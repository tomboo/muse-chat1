export const loadMessages = () => {
  const saved = localStorage.getItem('chat-messages');
  return saved ? JSON.parse(saved) : [];
};

export const saveMessages = (messages: any) => {
  localStorage.setItem('chat-messages', JSON.stringify(messages));
};