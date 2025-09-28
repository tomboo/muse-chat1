import React from 'react';
import ChatWindow from './components/ChatWindow';
import { ChatProvider } from './context/ChatContext';
import DarkModeToggle from './components/DarkModeToggle';

function App() {
  return (
    <ChatProvider>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <DarkModeToggle />
        <ChatWindow />
      </div>
    </ChatProvider>
  );
}

export default App;