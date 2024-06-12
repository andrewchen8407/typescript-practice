import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders input, button, and initial label', () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(/enter an alphanumeric query/i);
  const buttonElement = screen.getByText(/submit/i);
  const labelElement = screen.getByText(/ASCII sum: 0/i);

  expect(inputElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
  expect(labelElement).toBeInTheDocument();
});

test('updates label on valid submission', () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(/enter an alphanumeric query/i);
  const buttonElement = screen.getByText(/submit/i);
  
  fireEvent.change(inputElement, { target: { value: 'abc' } });
  fireEvent.click(buttonElement);
  
  const updatedLabel = screen.getByText(/ASCII sum: 294/i); // 97 (a) + 98 (b) + 99 (c) = 294
  expect(updatedLabel).toBeInTheDocument();
});
