import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';

import Login from './Login';

jest.mock('axios');

describe('Login Component', () => {
  beforeEach(() => {
    axios.post.mockResolvedValueOnce({ data: { /* Mock user data */ } });
  });

  test('fills email and password fields and submits the form', async () => {
    render(<Login />);
    
    const emailInput = screen.getByLabelText('Email Address');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByText('Login');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/api/user/login', {
        email: 'test@example.com',
        password: 'password',
      });
    });
  });

  test('shows error message when login fails', async () => {
    // Mock a failed login attempt
    axios.post.mockRejectedValueOnce({ response: { data: { message: 'Invalid credentials' } } });

    render(<Login />);
    
    const loginButton = screen.getByText('Login');
    fireEvent.click(loginButton);

    // Wait for the error message to be displayed
    const errorMessage = await screen.findByText('Error Occured!');
    expect(errorMessage).toBeInTheDocument();
  });

  test('gets guest user credentials on button click', () => {
    render(<Login />);
    
    const guestButton = screen.getByText('Get Guest User Credentials');
    fireEvent.click(guestButton);

    const emailInput = screen.getByLabelText('Email Address');
    const passwordInput = screen.getByLabelText('Password');

    expect(emailInput).toHaveValue('guest@example.com');
    expect(passwordInput).toHaveValue('123456');
  });
});
