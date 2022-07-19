import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const image = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

afterEach((() => jest.clearAllMocks));

describe('4- Testando o componente <NotFound.js />', () => {
  test('Teste se a página contém o texto: Page requested not found Crying emoji', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/adasd');
    const text = screen.getByRole('heading', {
      name: 'Page requested not found Crying emoji',
      level: 2,
    });
    expect(text).toBeInTheDocument();
  });
  test('Teste se a página mostra a imagem', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/asdads');
    const img = screen.getByRole('img', {
      name: 'Pikachu crying because the page requested was not found',
    });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', image);
  });
});
