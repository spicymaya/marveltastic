import React, { useEffect, useState } from 'react';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import MarvelCharacter from '../MarvelCharacter/MarvelCharacter';
import Header from '../Header/Header';
import styles from './MarvelContainer.module.css';
import { getAllCharacters, getSingleCharacter } from '../lib/api';

const debouncedGetSingleCharacter = AwesomeDebouncePromise(getSingleCharacter, 300);

const MarvelContainer = () => {
  const [initCharacters, setInitCharacters] = useState();
  const [searchCharacters, setSearchCharacters] = useState();
  const [isSearch, setIsSearch] = useState(false);
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

    setIsSearch(inputText.length);
  }, [inputText]);

  return (
    <>
      <Header />
      <div className={styles.grid}>
        <div className={styles.inputContianer}>
          <input
            className={styles.input}
            data-testid="inputTest"
            placeholder="Type full character name to search"
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>
        {!isSearch ? (
          initCharacters && (
            <div className={styles.row} data-testid="initialCharacters">
              {initCharacters.map((character) => (
                <MarvelCharacter
                  name={character.name}
                  thumbnail={character.thumbnail}
                  key={character.id}
                />
              ))}
            </div>
          )
        ) : searchCharacters && searchCharacters.length ? (
          <div className={styles.row} data-testid="searchResults">
            {searchCharacters.map((character) => (
              <MarvelCharacter
                name={character.name}
                thumbnail={character.thumbnail}
                key={character.id}
              />
            ))}
          </div>
        ) : (
          <div>
            Type in FULL character name i.e. <b>Iron Man</b> or <b>Black Widow</b>. Public Marvel
            API won't return results, if name doesn't match 100% 👿
          </div>
        )}
      </div>
    </>
  );
};
export default MarvelContainer;
