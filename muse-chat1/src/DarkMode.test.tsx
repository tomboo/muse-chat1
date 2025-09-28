import { render, screen, fireEvent } from '@testing-library/react';
import DarkModeToggle from './components/DarkModeToggle';

test('toggles dark mode on and off', () => {
  render(<DarkModeToggle />);
  const button = screen.getByRole('button');

  // Initially light mode
  expect(button).toHaveTextContent(/Switch to Dark Mode|Light Mode/);

  // Toggle once
  fireEvent.click(button);
  expect(document.documentElement.classList.contains('dark')).toBe(true);

  // Toggle back
  fireEvent.click(button);
  expect(document.documentElement.classList.contains('dark')).toBe(false);
});