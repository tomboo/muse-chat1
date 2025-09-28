import { render, screen, fireEvent } from '@testing-library/react';
import { ChatProvider } from './context/ChatContext';
import ChatWindow from './components/ChatWindow';

test('clears conversation when Clear button is clicked', () => {
  render(
    <ChatProvider>
      <ChatWindow />
    </ChatProvider>
  );

  // Type a message
  const input = screen.getByPlaceholderText(/Type a message/i);
  fireEvent.change(input, { target: { value: 'Hello' } });
  fireEvent.click(screen.getByText(/Send/i));

  // Clear the conversation
  fireEvent.click(screen.getByText(/Clear/i));
  expect(screen.queryByText(/Hello/)).toBeNull();
});
