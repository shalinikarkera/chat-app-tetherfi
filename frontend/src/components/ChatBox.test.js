import React from 'react';
import { render } from '@testing-library/react';
import ChatBox from './ChatBox';
import { ChatState } from '../Context/ChatProvider';

jest.mock('../Context/ChatProvider', () => ({
  ChatState: jest.fn(),
}));

describe('Chatbox Component', () => {
  test('renders SingleChat when selectedChat is truthy', () => {
    ChatState.mockReturnValue({ selectedChat:  "hello"  });

    const { getByTestId } = render(<ChatBox />);
    const singleChatComponent = getByTestId('single-chat'); 
    expect(singleChatComponent).toBeInTheDocument();
  });

  test('does not render SingleChat when selectedChat is falsy', () => {
    ChatState.mockReturnValue({ selectedChat: null });

    const { queryByTestId } = render(<ChatBox />);
    const singleChatComponent = queryByTestId('single-chat');
    expect(singleChatComponent).toBeNull();
  });
});
