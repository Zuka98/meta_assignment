import { render, screen } from '@testing-library/react';
import App from '../../App';

test('Renders Landing Page with Welcome Message', () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome!/i);
  expect(linkElement).toBeInTheDocument();
});
