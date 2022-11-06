import React from 'react';

import Player from '../components/Player';
import { useResources } from '../contexts';

function Play() {
  const {
    picked: [a, b, algorithm],
  } = useResources();

  if (!a || !b) {
    return <p>not enough resources : add some ;)</p>;
  }

  return (
    <>
      <p>{algorithm}</p>
      <Player data={a.data} onWin={a.wins} />
      vs
      <Player data={b.data} onWin={b.wins} />
      <button type="button" onClick={a.ties}>
        ==
      </button>
    </>
  );
}

export default Play;
