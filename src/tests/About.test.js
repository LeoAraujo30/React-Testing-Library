import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const text1 = (
  'This application simulates a Pokédex, a digital encyclopedia containing all Pokémons'
);
const text2 = (
  'One can filter Pokémons by type, and see more details for each one of them'
);
const image = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

describe('2- Testando o componente <About.js />', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const title = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(title).toBeInTheDocument();
  });
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const p1 = screen.getByText(text1);
    const p2 = screen.getByText(text2);
    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });
  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const img = screen.getByRole('img', { name: 'Pokédex' });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', image);
  });
});
