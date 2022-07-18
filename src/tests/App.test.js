import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('1- Testando o componente <App.js />', () => {
  test('Teste se o topo da aplicação contém os links de navegação', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const aboutLink = screen.getByRole('link', { name: 'About' });
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });
  test('Teste se é redirecionado para a Página Inicial, ao clicar em Home', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  test('Teste se é redirecionado para a Página About, ao clicar em About', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'About' });
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  test('Teste se é redirecionado para Favoritos, ao clicar em Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  test('teste se a página Not Found é exibida ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('asdasd');
    const homeLink = screen.getByText('Page requested not found');
    expect(homeLink).toBeInTheDocument();
  });
});
