import { render, screen } from '@testing-library/react';
import App from './App';

const a = 12;

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
    const b = 5;
});
