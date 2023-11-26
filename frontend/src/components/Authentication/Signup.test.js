import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios'; // You might want to mock axios calls

// Import the component to be tested
import Signup from './Signup';

// Mock the axios post function
jest.mock('axios');

describe('Signup Component', () => {
  beforeEach(() => {
    // Mock any axios response that you might expect in your tests
    axios.post.mockResolvedValueOnce({ data: { /* Mock user data */ } });
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
        pic: expect.any(String), // Mocked image URL
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
