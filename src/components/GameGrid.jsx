import React from 'react';
import { arrayOf, elementType } from 'prop-types';

import Game from './Game';

function GameGrid({ games, gameComponentType: GameComponentType }) {
  return (
    <ol className="grid grid-cols-1 sm:grid-cols-auto-fit gap-y-4 justify-items-center">
      {games.map((game) => (
        <li key={game.id}>
          <GameComponentType data={game} />
        </li>
      ))}
    </ol>
  );
}

GameGrid.propTypes = {
  games: arrayOf(Game.propTypes.data).isRequired,
  gameComponentType: elementType,
};

GameGrid.defaultProps = {
  gameComponentType: Game,
};

export default GameGrid;
