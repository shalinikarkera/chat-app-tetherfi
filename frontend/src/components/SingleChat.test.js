import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import SingleChat from './SingleChat';
import { ChatState } from '../Context/ChatProvider';

jest.mock('../Context/ChatProvider', () => ({
  ChatState: jest.fn(),
}));

describe('SingleChat Component', () => {
  beforeEach(() => {
    ChatState.mockReturnValue({
      selectedChat: { _id: '1' },
      setSelectedChat: jest.fn(),
      user: { test },
      notification: [],
      setNotification: jest.fn(),
    });
  });

  test('renders chat messages and input', async () => {
    render(<SingleChat fetchAgain={false} setFetchAgain={jest.fn()} />);
    const chatMessages = screen.getByTestId('chat-messages');
    expect(chatMessages).toBeInTheDocument();

    const messageInput = screen.getByPlaceholderText('Enter a message..');
    expect(messageInput).toBeInTheDocument();
  });
});
