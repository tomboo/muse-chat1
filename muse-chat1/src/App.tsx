import React from 'react';
import ChatWindow from './components/ChatWindow';
import DarkModeToggle from './components/DarkModeToggle';

function App() {
  return (
    <div>
      <DarkModeToggle />
      <ChatWindow />
    </div>
  );
}
export default App;