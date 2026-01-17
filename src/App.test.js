import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders a clickable button and logs on click', () => {
  // Mock the console.log function
  const consoleLogSpy = jest.spyOn(console, 'log');

  // Render the component
  render(<App />);

  // Find the button and assert it's present
  const buttonElement = screen.getByText(/Click Me/i);
  expect(buttonElement).toBeInTheDocument();

  // Click the button
  fireEvent.click(buttonElement);

  // Check that console.log was called with 'Button clicked'
  expect(consoleLogSpy).toHaveBeenCalledWith('Button Clicked');

  // Cleanup: Restore the original console.log function
  consoleLogSpy.mockRestore();
});