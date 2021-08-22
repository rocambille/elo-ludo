import React, { useRef } from 'react';

import { useSearch } from '../contexts';

function SearchBar() {
  const { setQuery } = useSearch();

  const inputRef = useRef();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setQuery(inputRef.current.value);
      }}>
      <label htmlFor="title">Title</label>
      <input ref={inputRef} id="title" />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
