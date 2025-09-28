export const CHAT_MESSAGES_KEY = 'chat-messages';

export const loadMessages = () => {
  const saved = localStorage.getItem(CHAT_MESSAGES_KEY);
  if (!saved) return [];
  try {
    return JSON.parse(saved);
  } catch (e) {
    return [];
  }
};

export const saveMessages = (messages: unknown) => {
  localStorage.setItem(CHAT_MESSAGES_KEY, JSON.stringify(messages));
};

export {};
