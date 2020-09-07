import React from 'react';
import { render } from '@testing-library/react';
import MarvelCharacter from './MarvelCharacter';

const thumbnail = {
  path: 'test',
  extension: 'jpg',
};
const name = 'Iron man';

describe('MarvelCharacter', () => {
  it('renders correct character name', () => {
    const { getByTestId } = render(<MarvelCharacter name={name} thumbnail={thumbnail} />);
    const characterName = getByTestId('characterName');
    expect(characterName.innerHTML).toBe('Iron man');
  });
  it('renders correct character image', () => {
    const { getByTestId } = render(<MarvelCharacter name={name} thumbnail={thumbnail} />);
    const characterImg = getByTestId('characterImg');
    expect(characterImg).toHaveAttribute('src', 'test.jpg');
  });
});
