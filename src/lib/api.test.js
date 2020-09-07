import { getAllCharacters, getSingleCharacter } from './api';

const name = '3-D Man';
const initialPayload = {
  results: [
    {
      name: '3-D Man',
      thumbnail: {
        path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784',
        extension: 'jpg',
      },
    },
  ],
};

describe('api', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('calls marvel api and returns all characters', async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: initialPayload }));

    const res = await getAllCharacters();
    expect(res.data).toEqual(initialPayload);
    expect(fetch.mock.calls.length).toEqual(1);
  });

  it('calls marvel api and returns a single character', async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: initialPayload }));

    const res = await getSingleCharacter(name);
    expect(res.data).toEqual(initialPayload);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toContain(name);
  });
});
