import React from 'react';
import { render } from '@testing-library/react';
import { ChatState } from '../Context/ChatProvider'; // Mock your ChatState context as needed
import ChatPage from './ChatPage';

// Mock ChatState context values
jest.mock('../Context/ChatProvider', () => ({
  ChatState: jest.fn(() => ({ user: { /* mock user data */ } })),
}));

describe('ChatPage Component', () => {
  test('renders SideDrawer when user is present', () => {
    const { getByTestId } = render(<ChatPage />);
    const sideDrawer = getByTestId('side-drawer'); // Adjust the test ID based on SideDrawer component

    expect(sideDrawer).toBeInTheDocument();
  });

  test('renders MyChats component when user is present', () => {
    const { getByTestId } = render(<ChatPage />);
    const myChats = getByTestId('my-chats'); // Adjust the test ID based on MyChats component

    expect(myChats).toBeInTheDocument();
  });

  test('renders ChatBox component when user is present', () => {
    const { getByTestId } = render(<ChatPage />);
    const chatBox = getByTestId('chat-box'); // Adjust the test ID based on ChatBox component

    expect(chatBox).toBeInTheDocument();
  });
});
