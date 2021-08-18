import React from 'react';
import { func } from 'prop-types';

import Game from './Game';

function Player({ data, onWin }) {
  return (
    <Game data={data}>
      <button type="button" onClick={onWin}>
        WIN
      </button>
    </Game>
  );
}

Player.propTypes = {
  ...Game.propTypes,
  onWin: func.isRequired,
};

export default Player;
