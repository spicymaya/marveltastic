import React, { useEffect, useState } from 'react';
import md5 from 'md5';
// import { debounce } from '../helpers/renderHelpers';
import useDebouncedSearch from '../helpers/useDebouncedSearch';
import MarvelCharacter from '../MarvelCharacter/MarvelCharacter';
import Header from '../Header/Header';
import styles from './MarvelContainer.module.css';

const ts = Date.now();
const publicKey = '23a1b44bdda4bdc76b8cd4e4a125b5da';
const privateKey = '0778a2817a560328adbad44309187a1b837ccd0e';
const hash = md5(ts + privateKey + publicKey);

const getAllCharacters = async () => {
  const initialCharactersUrl = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=12`;
  const response = await fetch(initialCharactersUrl, {
    method: 'GET',
  });
  return response.json();
};
const getSingleCharacter = async (name) => {
  const singleCharactersUrl = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&name=${name}`;
  const response = await fetch(singleCharactersUrl, {
    method: 'GET',
  });
  return response.json();
};
const getSingleCharacter = () => useDebouncedSearch((name) => getSingleCharacter(name), 500);

const MarvelContainer = () => {
  const [initCharacters, setInitCharacters] = useState();
  const { inputText, setInputText, searchResults } = getSingleCharacter();
  const [showResults, setShowResults] = useState(false);

  useEffect(async () => {
    const data = await getAllCharacters();
    setInitCharacters(data.data.results);
  }, []);

  useEffect(() => {
    if (
      searchResults &&
      searchResults.result &&
      searchResults.result.data &&
      searchResults.result.data.results.length &&
      inputText
    ) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [searchResults, inputText]);

  return (
    <>
      <Header />
      <div className={styles.grid}>
        <div className={styles.inputContianer}>
          <input
            className={styles.input}
            placeholder="Type full character name to search"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>

        {!showResults
          ? initCharacters && (
              <div className={styles.row} data-testid="initialCharacters">
                {initCharacters.map((character) => (
                  <MarvelCharacter name={character.name} thumbnail={character.thumbnail} />
                ))}
              </div>
            )
          : searchResults.result.data.results && (
              <div className={styles.row} data-testid="searchResults">
                {searchResults.result.data.results.map((character) => (
                  <MarvelCharacter name={character.name} thumbnail={character.thumbnail} />
                ))}
              </div>
            )}
      </div>
    </>
  );
};
export default MarvelContainer;
