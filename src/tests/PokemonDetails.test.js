import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const pikachuDetails = '/pokemons/25';
const favChecked = 'Pikachu is marked as favorite';
const image1 = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
const image2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
const paragraph = (
  /This intelligent Pokémon roasts hard berries with electricity to make them tender/
);

describe('7- Testando o componente <PokemonDetails.js />', () => {
  test('Teste se as informações detalhadas do pokémon são mostradas na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push(pikachuDetails);

    const title1 = screen.getByRole('heading', { name: 'Pikachu Details', level: 2 });
    expect(title1).toBeInTheDocument();

    const pokemonDetails = screen.queryByRole('link', { name: 'More details' });
    expect(pokemonDetails).not.toBeInTheDocument();

    const title2 = screen.getByRole('heading', { name: 'Summary', level: 2 });
    expect(title2).toBeInTheDocument();

    const text = screen.getByText(paragraph);
    expect(text).toBeInTheDocument();
  });
  test('Teste se existe a seção de mapas contendo as localizações do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(pikachuDetails);

    const title3 = screen.getByRole('heading', {
      name: 'Game Locations of Pikachu',
      level: 2,
    });
    expect(title3).toBeInTheDocument();

    const locationImage = screen.getAllByAltText(/location/);
    expect(locationImage).toHaveLength(2);

    expect(locationImage[0]).toBeInTheDocument();
    expect(locationImage[0]).toHaveAttribute('alt', 'Pikachu location');
    expect(locationImage[0]).toHaveAttribute('src', image1);
    const locationName1 = screen.getByText('Kanto Viridian Forest');
    expect(locationName1).toBeInTheDocument();

    expect(locationImage[1]).toBeInTheDocument();
    expect(locationImage[1]).toHaveAttribute('alt', 'Pikachu location');
    expect(locationImage[1]).toHaveAttribute('src', image2);
    const locationName2 = screen.getByText('Kanto Power Plant');
    expect(locationName2).toBeInTheDocument();
  });
  test('Teste se o usuário pode favoritar um pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(pikachuDetails);

    const favInput = screen.getByLabelText('Pokémon favoritado?');
    expect(favInput).toBeInTheDocument();

    expect(screen.queryByAltText(favChecked)).not.toBeInTheDocument();
    userEvent.click(favInput);
    expect(screen.queryByAltText(favChecked)).toBeInTheDocument();
    userEvent.click(favInput);
    expect(screen.queryByAltText(favChecked)).not.toBeInTheDocument();
    userEvent.click(favInput);
    expect(screen.queryByAltText(favChecked)).toBeInTheDocument();
  });
});
