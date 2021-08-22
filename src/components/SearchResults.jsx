import React from 'react';

import Resource from './Resource';
import { useResources, useSearch } from '../contexts';
import ResourceGrid from './ResourceGrid';

function SearchResult({ data }) {
  const { id } = data;

  const { resources, add, remove } = useResources();

  const when = {
    [true]: {
      onClick: () => remove(data),
      text: '-',
    },
    [false]: {
      onClick: () => add(data),
      text: '+',
    },
  };

  const hasSeen = resources.find((resource) => resource.id === id) != null;

  return (
    <Resource data={data}>
      <button type="button" onClick={when[hasSeen].onClick}>
        {when[hasSeen].text}
      </button>
    </Resource>
  );
}

SearchResult.propTypes = {
  ...Resource.propTypes,
};

function SearchResults() {
  const { results } = useSearch();

  return (
    <ResourceGrid resources={results} resourceComponentType={SearchResult} />
  );
}

export default SearchResults;
