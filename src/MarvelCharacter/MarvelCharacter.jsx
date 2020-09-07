import React from 'react';
import styles from './MarvelCharacter.module.css';

const MarvelCharacter = ({ name, thumbnail }) => {
  const { path, extension } = thumbnail;
  return (
    <div className={styles.characterCard}>
      <img
        src={`${path}.${extension}`}
        alt={name}
        className={styles.responsiveImg}
        data-testid="characterImg"
      />
      <div className={styles.name} data-testid="characterName">
        {name}
      </div>
    </div>
  );
};
export default MarvelCharacter;
