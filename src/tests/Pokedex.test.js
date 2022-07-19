import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const SETE = 7;

describe('5- Testando o componente <Pokedex.js />', () => {
  test('Teste se a página contém um heading h2 com o texto: Encountered pokémons', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', { name: 'Encountered pokémons', level: 2 });
    expect(title).toBeInTheDocument();
  });
  test('Teste se é exibido um próximo pokémon por vez ao clicar: Próximo pokémon', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const nextButton = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent('Pikachu');
    userEvent.click(nextButton);
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent('Charmander');
    userEvent.click(nextButton);
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent('Caterpie');
    userEvent.click(nextButton);
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent('Ekans');
    userEvent.click(nextButton);
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent('Alakazam');
    userEvent.click(nextButton);
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent('Mew');
    userEvent.click(nextButton);
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent('Rapidash');
    userEvent.click(nextButton);
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent('Snorlax');
    userEvent.click(nextButton);
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent('Dragonair');
    userEvent.click(nextButton);
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent('Pikachu');
  });
  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const all = screen.getByRole('button', { name: 'All' });
    const typesButtons = screen.getAllByTestId('pokemon-type-button');
    const pokemonType = screen.getByTestId('pokemon-type');

    expect(typesButtons).toHaveLength(SETE);

    expect(all).toBeInTheDocument();
    expect(typesButtons[0]).toBeInTheDocument();
    expect(typesButtons[0]).toHaveTextContent('Electric');
    userEvent.click(typesButtons[0]);
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent('Electric');

    expect(all).toBeInTheDocument();
    expect(typesButtons[1]).toBeInTheDocument();
    expect(typesButtons[1]).toHaveTextContent('Fire');
    userEvent.click(typesButtons[1]);
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent('Fire');

    expect(all).toBeInTheDocument();
    expect(typesButtons[2]).toBeInTheDocument();
    expect(typesButtons[2]).toHaveTextContent('Bug');
    userEvent.click(typesButtons[2]);
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent('Bug');

    expect(all).toBeInTheDocument();
    expect(typesButtons[3]).toBeInTheDocument();
    expect(typesButtons[3]).toHaveTextContent('Poison');
    userEvent.click(typesButtons[3]);
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent('Poison');

    expect(all).toBeInTheDocument();
    expect(typesButtons[4]).toBeInTheDocument();
    expect(typesButtons[4]).toHaveTextContent('Psychic');
    userEvent.click(typesButtons[4]);
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent('Psychic');

    expect(all).toBeInTheDocument();
    expect(typesButtons[5]).toBeInTheDocument();
    expect(typesButtons[5]).toHaveTextContent('Normal');
    userEvent.click(typesButtons[5]);
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent('Normal');

    expect(all).toBeInTheDocument();
    expect(typesButtons[6]).toBeInTheDocument();
    expect(typesButtons[6]).toHaveTextContent('Dragon');
    userEvent.click(typesButtons[6]);
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent('Dragon');
    expect(all).toBeInTheDocument();
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button', { name: 'Próximo pokémon' });
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const all = screen.getByRole('button', { name: 'All' });
    const psychic = screen.getByRole('button', { name: 'Psychic' });

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent('Electric');
    userEvent.click(nextButton);
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent('Charmander');
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent('Fire');
    userEvent.click(nextButton);
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent('Caterpie');
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent('Bug');

    expect(psychic).toBeInTheDocument();
    userEvent.click(psychic);
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent('Alakazam');
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent('Psychic');
    userEvent.click(nextButton);
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent('Mew');
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent('Psychic');
    userEvent.click(nextButton);
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent('Alakazam');
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent('Psychic');

    expect(all).toBeInTheDocument();
    userEvent.click(all);
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent('Electric');
    userEvent.click(nextButton);
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent('Charmander');
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent('Fire');
    userEvent.click(nextButton);
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent('Caterpie');
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent('Bug');
  });
});
