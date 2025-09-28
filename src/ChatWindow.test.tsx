import { render, screen, fireEvent } from '@testing-library/react';
import ChatWindow from './components/ChatWindow';

test('clears conversation when Clear button is clicked', () => {
  render(<ChatWindow />);

  // Type a message
  const input = screen.getByPlaceholderText(/Type a message/i);
  fireEvent.change(input, { target: { value: 'Hello' } });

  // Send it
  const sendButton = screen.getByText(/Send/i);
  fireEvent.click(sendButton);

  // Message should appear
  expect(screen.getByText('Hello')).toBeInTheDocument();

  // Clear conversation
  const clearButton = screen.getByText(/Clear conversation/i);
  fireEvent.click(clearButton);

  // Message should be gone
  expect(screen.queryByText('Hello')).not.toBeInTheDocument();
});