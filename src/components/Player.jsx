import React from 'react';
import { func } from 'prop-types';

import Resource from './Resource';

function Player({ data, onWin }) {
  return (
    <Resource data={data}>
      <button type="button" onClick={onWin}>
        WIN
      </button>
    </Resource>
  );
}

Player.propTypes = {
  ...Resource.propTypes,
  onWin: func.isRequired,
};

export default Player;
