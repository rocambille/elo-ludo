import React from 'react';

import Game from '../components/Game';
import GameGrid from '../components/GameGrid';
import { useGameList } from '../contexts';

function Home() {
  const { games } = useGameList();

  const max = games.reduce((acc, game) => (game.elo > acc ? game.elo : acc), 0);

  return (
    <GameGrid
      games={games.sort(
        (a, b) =>
          b.elo - a.elo ||
          b.matchCount - a.matchCount ||
          b.lastDelta - a.lastDelta,
      )}
      gameComponentType={({ data }) => {
        const score = 7 + (3 * (data.elo - 1500)) / (max - 1500);

        return (
          <Game data={data}>
            <strong>{Math.round(score * 2) / 2}</strong>
          </Game>
        );
      }}
    />
  );
}

export default Home;
