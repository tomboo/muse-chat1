import { render, screen } from '@testing-library/react';
import App from './App';

test('renders chat input placeholder', () => {
  render(<App />);
  expect(screen.getByPlaceholderText(/Type a message/i)).toBeInTheDocument();
});