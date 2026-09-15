import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';


describe('Button Component', () => {
  it('renders the button text correctly', () => {
    render(<Button text="Click Me" />);
    
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it('applies custom className correctly', () => {
    render(<Button text="Submit" className="btn-primary" />);
    
    const button = screen.getByRole('button', { name: /submit/i });
    expect(button).toHaveClass('btn', 'btn-primary');
  });

  it('calls onclick handler when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button text="Click Me" onclick={handleClick} />);

    const button = screen.getByRole('button', { name: /click me/i });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled and prevents clicks when disabled prop is true', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button text="Disabled" disabled={true} onclick={handleClick} />);

    const button = screen.getByRole('button', { name: /disabled/i });

    expect(button).toBeDisabled();

    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});