import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';

import Signup from './Signup';

jest.mock('axios');

describe('Signup Component', () => {
  beforeEach(() => {
    axios.post.mockResolvedValueOnce({ data: "test" });
  });

  test('fills form fields and submits the form', async () => {
    render(<Signup />);
    
    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email Address');
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');
    const uploadInput = screen.getByLabelText('Upload your Picture');
    const signUpButton = screen.getByText('Sign Up');

    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password' } });

    Object.defineProperty(uploadInput, 'files', {
      value: [{ type: 'image/jpeg' }],
    });
    fireEvent.change(uploadInput);

    fireEvent.click(signUpButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/api/user', {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
        pic: expect.any(String),
      });
    });
  });

  test('shows error message when required fields are not filled', async () => {
    render(<Signup />);
    
    const signUpButton = screen.getByText('Sign Up');
    fireEvent.click(signUpButton);

    const errorMessage = await screen.findByText('Please Fill all the Fields');
    expect(errorMessage).toBeInTheDocument();
  });
});
