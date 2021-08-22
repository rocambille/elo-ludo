import React from 'react';

import Player from '../components/Player';
import { useResources } from '../contexts';

import elo from '@rocambille/elo';

const player = elo();

const randomizer = () => Math.random() - 0.5;

function Play() {
  const { resources, update } = useResources();

  if (resources.length < 10) {
    return <p>you should start with searching things ;)</p>;
  }

  const sortFunctions = [
    randomizer,
    (a, b) => (a.matchCount ?? 0) - (b.matchCount ?? 0),
    (a, b) =>
      new Date(a.lastPlayedAt ?? 0).getTime() -
      new Date(b.lastPlayedAt ?? 0).getTime(),
  ].sort(randomizer);

  /* get the 1st and 3rd elements from the sorted list */
  /* 1st and 2nd may have been together in their last match */
  /* (same matchCount or lastPlayedAt) */
  let [resource1, , resource2] = resources.sort(sortFunctions[0]);

  return (
    <>
      <Player
        data={resource1}
        onWin={() => {
          [resource1, resource2] = player(resource1).wins(resource2);
          update(resource1, resource2);
        }}
      />
      vs
      <Player
        data={resource2}
        onWin={() => {
          [resource2, resource1] = player(resource2).wins(resource1);
          update(resource1, resource2);
        }}
      />
      <button
        type="button"
        onClick={() => {
          [resource1, resource2] = player(resource1).ties(resource2);
          update(resource1, resource2);
        }}>
        ==
      </button>
    </>
  );
}

export default Play;
