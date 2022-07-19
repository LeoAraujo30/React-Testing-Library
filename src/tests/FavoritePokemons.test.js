import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const pokedexService = require('../services/pokedexService');

const pikachu = 25;
const charmander = 4;

afterEach((() => jest.clearAllMocks));

describe('3- Testando o componente <FavoritePokemons.js />', () => {
  test('Caso não tenha pokemons favoritos, aparecera: No favorite pokemon found', () => {
    jest.spyOn(pokedexService, 'readFavoritePokemonIds').mockReturnValue([]);
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');
    const text = screen.getByText('No favorite pokemon found');
    expect(text).toBeInTheDocument();
  });
  test('Teste se são exibidos todos os cards de pokémons favoritados', () => {
    pokedexService.readFavoritePokemonIds.mockReturnValue([pikachu, charmander]);
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');
    const pokemonName = screen.getAllByTestId('pokemon-name');
    expect(pokemonName).toHaveLength(2);
    expect(pokemonName[0]).toBeInTheDocument();
    expect(pokemonName[0]).toHaveTextContent('Pikachu');
    expect(pokemonName[1]).toBeInTheDocument();
    expect(pokemonName[1]).toHaveTextContent('Charmander');
  });
});
