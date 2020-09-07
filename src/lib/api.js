import md5 from 'md5';
const ts = Date.now();
const publicKey = '23a1b44bdda4bdc76b8cd4e4a125b5da';
const privateKey = '0778a2817a560328adbad44309187a1b837ccd0e';
const hash = md5(ts + privateKey + publicKey);

export const getAllCharacters = async () => {
  const initialCharactersUrl = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=12`;
  const response = await fetch(initialCharactersUrl, {
    method: 'GET',
  });
  return response.json();
};
export const getSingleCharacter = async (name) => {
  const singleCharactersUrl = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&name=${name}`;
  const response = await fetch(singleCharactersUrl, {
    method: 'GET',
  });
  return response.json();
};
