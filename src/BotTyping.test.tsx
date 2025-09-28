import { render, screen, fireEvent, act } from '@testing-library/react';
import ChatWindow from './components/ChatWindow';

jest.useFakeTimers();

test('shows and hides bot typing indicator', () => {
  render(<ChatWindow />);

  // Type a message
  const input = screen.getByPlaceholderText(/Type a message/i);
  fireEvent.change(input, { target: { value: 'Hello' } });

  // Send it
  const sendButton = screen.getByText(/Send/i);
  fireEvent.click(sendButton);

  // Bot typing should appear
  expect(screen.getByText(/Bot is typing/i)).toBeInTheDocument();

  // Fast-forward timers (simulate bot reply delay)
  act(() => {
    jest.advanceTimersByTime(1000);
  });

  // Bot typing should disappear after reply
  expect(screen.queryByText(/Bot is typing/i)).not.toBeInTheDocument();

  // Bot reply should appear
  expect(screen.getByText(/You said: Hello/i)).toBeInTheDocument();
});