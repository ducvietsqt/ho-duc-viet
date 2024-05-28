import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { FormSwap } from '../ui/FormSwap';

describe('FormSwap Component', () => {
  test('button is not disabled initially', () => {
    render(<FormSwap />);
    const button = screen.getByText('CONFIRM SWAP');
    expect(button).not.toBeDisabled();
  });

  test('button is disabled after click', () => {
    render(<FormSwap />);
    const button = screen.getByText('CONFIRM SWAP');
    fireEvent.click(button);
    expect(button).toBeDisabled();
  });
});
