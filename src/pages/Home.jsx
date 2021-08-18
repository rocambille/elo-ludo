import React from 'react';

import GameGrid from '../components/GameGrid';
import { useGameList } from '../contexts';

function Home() {
  const { games } = useGameList();

  return (
    <GameGrid
      games={games.sort(
        (a, b) =>
          b.elo - a.elo ||
          b.matchCount - a.matchCount ||
          b.lastDelta - a.lastDelta,
      )}
    />
  );
}

export default Home;
