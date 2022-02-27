import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
    const a = 2;
    console.log("not an error")
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
