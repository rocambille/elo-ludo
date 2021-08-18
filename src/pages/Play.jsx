import React from 'react';

import Player from '../components/Player';
import { useGameList } from '../contexts';

import elo from '../helpers/elo';

const player = elo();

const randomizer = () => Math.random() - 0.5;

function Play() {
  const { games, updateGames } = useGameList();

  if (games.length < 10) {
    return <p>you should start with searching games ;)</p>;
  }

  const sortFunctions = [
    (a, b) => a.matchCount - b.matchCount,
    (a, b) =>
      new Date(a.lastPlayedAt).getTime() - new Date(b.lastPlayedAt).getTime(),
    randomizer,
  ].sort(randomizer);

  /* get the 1st and 3rd games from the sorted list */
  /* 1st and 2nd may have been together in their last match */
  /* (same matchCount or lastPlayedAt) */
  let [game1, , game2] = games.sort(sortFunctions[0]);

  return (
    <>
      <Player
        data={game1}
        onWin={() => {
          [game1, game2] = player(game1).wins(game2);
          updateGames(game1, game2);
        }}
      />
      vs
      <Player
        data={game2}
        onWin={() => {
          [game2, game1] = player(game2).wins(game1);
          updateGames(game1, game2);
        }}
      />
      <button
        type="button"
        onClick={() => {
          [game1, game2] = player(game1).ties(game2);
          updateGames(game1, game2);
        }}>
        ==
      </button>
    </>
  );
}

export default Play;
