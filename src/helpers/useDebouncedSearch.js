import React, { useState } from 'react';
import { useAsync } from 'react-async-hook';
import useConstant from 'use-constant';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

/**
 * A reusable debounce hook.
 * @searchFunction - function to debounce
 * @wait - wait time before firing
 * To use it need to add value and onChange to the input like below
 * <input
    value={inputText}
    onChange={(e) => setInputText(e.target.value)}
  />
 */
const useDebouncedSearch = (searchFunction, wait) => {
  // Handle the input text state
  const [inputText, setInputText] = useState('');

  // Debounce the original search async function
  const debouncedSearchFunction = useConstant(() => AwesomeDebouncePromise(searchFunction, wait));

  // The async callback is run each time the text changes,
  // but as the search function is debounced, it does not
  // fire a new request on each keystroke
  const searchResults = useAsync(async () => {
    if (inputText.length === 0) {
      return [];
    } else {
      return debouncedSearchFunction(inputText);
    }
  }, [debouncedSearchFunction, inputText]);

  // Return everything needed for the hook consumer
  return {
    inputText,
    setInputText,
    searchResults,
  };
};

export default useDebouncedSearch;
