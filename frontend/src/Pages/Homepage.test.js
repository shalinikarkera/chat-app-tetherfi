import React from 'react';
import { render } from '@testing-library/react';
import Homepage from './Homepage';
import { useHistory } from 'react-router-dom';

// Mock the useHistory hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn(),
}));

describe('Homepage Component', () => {
  beforeEach(() => {
    useHistory.mockReturnValue({
      push: jest.fn(), // Mock the push function
    });
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('redirects to /chats when user info is present in localStorage', () => {
    const user = { /* Mock user data */ };
    localStorage.setItem('userInfo', JSON.stringify(user));
    render(<Homepage />);
    
    expect(useHistory().push).toHaveBeenCalledWith('/chats');
  });

  test('renders Tabs with Login and Signup components', () => {
    const { getByText } = render(<Homepage />);
    
    expect(getByText('Login')).toBeInTheDocument();
    expect(getByText('Sign Up')).toBeInTheDocument();
  });
});
