import React, { createContext, useContext, useState } from 'react';
import { node } from 'prop-types';

import useFetch from '../hooks/useFetch';

const fetchOptions = {
  initialState: [],
  extractData: (body) => body.list,
};

const SearchContext = createContext();

function SearchProvider({ children }) {
  const [url, setUrl] = useState();

  const [results] = useFetch(url, fetchOptions);

  const setQuery = (query) => {
    setUrl(
      `https://www.myludo.fr/views/profil/datas.php?type=collection&id=${query}`,
    );
  };

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
