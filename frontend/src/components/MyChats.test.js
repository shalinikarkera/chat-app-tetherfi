import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios'; 


import MyChats from './MyChats';
import { ChatState } from '../Context/ChatProvider';


jest.mock('../Context/ChatProvider', () => ({
  ChatState: jest.fn(),
}));

describe('MyChats Component', () => {
  beforeEach(() => {
    ChatState.mockReturnValue({
      selectedChat: null,
      setSelectedChat: jest.fn(),
      user: { /* Mock user data */ },
      chats: [
        { _id: '1', users: test, latestMessage: { /* Mock message data */ } },
        { _id: '2', isGroupChat: true, chatName: 'Group Chat', latestMessage: { /* Mock message data */ } },
      ],
      setChats: jest.fn(),
    });
  });

  test('renders My Chats correctly with chat list', async () => {
    render(<MyChats fetchAgain={false} />);
    
    const myChatsComponent = screen.getByText('My Chats'); 
    expect(myChatsComponent).toBeInTheDocument();

    const chat1 = screen.getByText('Chat 1'); 
    const chat2 = screen.getByText('Group Chat'); 
    expect(chat1).toBeInTheDocument();
    expect(chat2).toBeInTheDocument();
  });

});
