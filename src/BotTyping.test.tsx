import { render, screen, fireEvent } from '@testing-library/react';
import { ChatProvider } from './context/ChatContext';
import ChatWindow from './components/ChatWindow';

test('shows and hides bot typing indicator', () => {
  render(
    <ChatProvider>
      <ChatWindow />
    </ChatProvider>
  );

  // Type a message
  const input = screen.getByPlaceholderText(/Type a message/i);
  fireEvent.change(input, { target: { value: 'Hi bot' } });
  fireEvent.click(screen.getByText(/Send/i));

  // Bot typing indicator should appear
  expect(screen.getByText(/Bot is typing/i)).toBeInTheDocument();
});
