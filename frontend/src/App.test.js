import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders Homepage component for / path', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  //expect(screen.getByText(/Homepage/i)).toBeInTheDocument(); // Assuming 'Homepage' text is present
});

test('renders ChatPage component for /chats path', () => {
  render(
    <MemoryRouter initialEntries={['/chats']}>
      <App />
    </MemoryRouter>
  );

 // expect(screen.getByText(/ChatPage/i)).toBeInTheDocument(); // Assuming 'ChatPage' text is present
});
