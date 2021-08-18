import React from 'react';

import Game from './Game';
import { useGameList, useSearch } from '../contexts';
import GameGrid from './GameGrid';

function SearchResult({ data }) {
  const { id } = data;

  const { games, addGame, removeGame } = useGameList();

  const when = {
    [true]: {
      onClick: () => removeGame(data),
      text: '-',
    },
    [false]: {
      onClick: () => addGame(data),
      text: '+',
    },
  };

  const hasPlayed = games.find((game) => game.id === id) != null;

  return (
    <Game data={data}>
      <button type="button" onClick={when[hasPlayed].onClick}>
        {when[hasPlayed].text}
      </button>
    </Game>
  );
}

SearchResult.propTypes = {
  ...Game.propTypes,
};

function SearchResults() {
  const { results } = useSearch();

  return <GameGrid games={results} gameComponentType={SearchResult} />;
}

export default SearchResults;
