import React from 'react';

import Player from '../components/Player';
import { useResources } from '../contexts';

function Play() {
  const { resources, setResources } = useResources();

  if (resources.length < 10) {
    return <p>you should start with searching things ;)</p>;
  }

  const [player1, player2, algorithm] = resources.pick();

  return (
    <>
      <p>{algorithm}</p>
      <Player
        data={resources[player1]}
        onWin={() => {
          setResources(resources.player(player1).wins(player2));
        }}
      />
      vs
      <Player
        data={resources[player2]}
        onWin={() => {
          setResources(resources.player(player2).wins(player1));
        }}
      />
      <button
        type="button"
        onClick={() => {
          setResources(resources.player(player1).ties(player2));
        }}>
        ==
      </button>
    </>
  );
}

export default Play;
