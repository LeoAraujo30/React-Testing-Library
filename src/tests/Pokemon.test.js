import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const image = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

describe('6- Testando o componente <Pokemon.js />', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent('Pikachu');

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent('Electric');

    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');

    const pokemonImage = screen.getByAltText('Pikachu sprite');
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage).toHaveAttribute('src', image);
  });
  test('Teste se o card contém um link: More details, que redireciona a pagina', () => {
    const { history } = renderWithRouter(<App />);
    const pokemonDetails = screen.getByRole('link', { name: 'More details' });
    expect(pokemonDetails).toBeInTheDocument();
    expect(pokemonDetails).toHaveAttribute('href', '/pokemons/25');

    const { pathname } = history.location;
    expect(pathname).toBe('/');
    userEvent.click(pokemonDetails);
    const title = screen.getByRole('heading', { name: 'Pikachu Details', level: 2 });
    expect(title).toBeInTheDocument();
    const { pathname: newPathname } = history.location;
    expect(newPathname).toBe('/pokemons/25');
  });
  test('Teste se existe um ícone de estrela nos pokémons favoritados', () => {
    renderWithRouter(<App />);
    const pokemonDetails = screen.getByRole('link', { name: 'More details' });
    expect(pokemonDetails).toBeInTheDocument();
    userEvent.click(pokemonDetails);
    const favInput = screen.getByLabelText('Pokémon favoritado?');
    expect(favInput).toBeInTheDocument();
    userEvent.click(favInput);
    const favImage = screen.getByAltText('Pikachu is marked as favorite');
    expect(favImage).toBeInTheDocument();
    expect(favImage).toHaveAttribute('src', '/star-icon.svg');
  });
});
