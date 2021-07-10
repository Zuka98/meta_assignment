import { Button } from '@material-ui/core';
import { render, screen } from '@testing-library/react';
import App from '../../App';

test('Message to press buttons is rendered on the Landing', () => {
  render(<App />);
  const linkElement = screen.getByText(/Press the buttons to load the data!/i);
  expect(linkElement).toBeInTheDocument();
});

test('3 Buttons are rendered', () => {
    render(<App />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
});
