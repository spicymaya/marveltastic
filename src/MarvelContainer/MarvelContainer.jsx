import React, { useEffect, useState } from 'react';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import MarvelCharacter from '../MarvelCharacter/MarvelCharacter';
import Header from '../Header/Header';
import styles from './MarvelContainer.module.css';
import { getAllCharacters, getSingleCharacter } from '../lib/api';

const debouncedGetSingleCharacter = AwesomeDebouncePromise(getSingleCharacter, 500);

const MarvelContainer = () => {
  const [initCharacters, setInitCharacters] = useState();
  const [searchCharacters, setSearchCharacters] = useState();
  const [showInitialData, setShowInitialData] = useState(true);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    getAllCharacters().then((data) => setInitCharacters(data.data.results));
  }, []);

  useEffect(() => {
    if (inputText.length) {
      debouncedGetSingleCharacter(inputText).then((data) => {
        setSearchCharacters(data.data.results);
      });
    }

    setShowInitialData(!inputText.length);
  }, [inputText]);

  return (
    <>
      <Header />
      <div className={styles.grid}>
        <div className={styles.inputContianer}>
          <input
            className={styles.input}
            placeholder="Type full character name to search"
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>
        {showInitialData
          ? initCharacters && (
              <div className={styles.row} data-testid="initialCharacters">
                {initCharacters.map((character) => (
                  <MarvelCharacter name={character.name} thumbnail={character.thumbnail} />
                ))}
              </div>
            )
          : searchCharacters && (
              <div className={styles.row} data-testid="searchResults">
                {searchCharacters.map((character) => (
                  <MarvelCharacter name={character.name} thumbnail={character.thumbnail} />
                ))}
              </div>
            )}
      </div>
    </>
  );
};
export default MarvelContainer;
