import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import * as api from '../lib/api';
import MarvelContainer from './MarvelContainer';

const initialPayload = {
  results: [
    {
      id: 0,
      name: '3-D Man',
      thumbnail: {
        path: 'test',
        extension: 'jpg',
      },
    },
  ],
};

const searchedPayload = {
  results: [
    {
      id: 1,
      name: 'Iron Man',
      thumbnail: {
        path: 'test',
        extension: 'jpg',
      },
    },
  ],
};

let allSpy;

describe('MarvelContainer', () => {
  beforeAll(() => {
    allSpy = jest.spyOn(api, 'getAllCharacters').mockImplementation(() =>
      Promise.resolve({
        data: initialPayload,
      })
    );
  });

  it('renders initial characters', async () => {
    let reactTestObject;
    await act(async () => {
      reactTestObject = render(<MarvelContainer />);
    });

    const { getByText } = reactTestObject;
    expect(getByText('3-D Man')).toBeInTheDocument();
  });

  it('renders searched characters', async () => {
    const spy = jest.spyOn(api, 'getSingleCharacter').mockImplementation(() =>
      Promise.resolve({
        data: searchedPayload,
      })
    );

    let reactTestObject;
    await act(async () => {
      reactTestObject = render(<MarvelContainer />);
    });

    const { getByText, getByTestId } = reactTestObject;
    fireEvent.change(getByTestId('inputTest'), { target: { value: 'iron man' } });

    expect(getByText('Iron Man')).toBeInTheDocument();
  });
});
