import React, { createContext, useContext } from 'react';
import { node } from 'prop-types';

import useFetch from '../hooks/useFetch';

const fetchOptions = {
  initialState: [],
  onBody: (body) => body.list,
};

const SearchContext = createContext();

function SearchProvider({ children }) {
  const { body: results, fetch: setQuery } = useFetch(
    (query) =>
      `https://www.myludo.fr/views/profil/datas.php?type=collection&id=${query}`,
    null,
    fetchOptions,
  );

  return (
    <SearchContext.Provider value={{ results, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
}

SearchProvider.propTypes = {
  children: node.isRequired,
};

const useSearch = () => useContext(SearchContext);

export { SearchProvider, useSearch };
