import React from 'react';
import styles from './MarvelCharacter.module.css';

const MarvelCharacter = ({ name, thumbnail }) => {
  const { path, extension } = thumbnail;
  return (
    <div className={styles.characterCard}>
      <img src={`${path}.${extension}`} alt={name} className={styles.responsiveImg} />
      <div className={styles.name}>{name}</div>
    </div>
  );
};
export default MarvelCharacter;
