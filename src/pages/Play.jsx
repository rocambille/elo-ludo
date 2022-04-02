import React from 'react';

import Player from '../components/Player';
import { useResources } from '../contexts';

const rollDice = (min, max) =>
  min + Math.floor(Math.random() * (max - min + 1));
const arrayRand = (array) => array[rollDice(1, array.length) - 1];

const pickAlgorithms = ['RANDOM', 'MATCH_COUNT', 'LAST_PLAYED_AT'];

function Play() {
  const { resources, setResources } = useResources();

  if (resources.length < 10) {
    return <p>you should start with searching things ;)</p>;
  }

  const pickPlayers = (pickAlgorithm) => {
    let pickField = null;
    switch (pickAlgorithm) {
      case 'RANDOM': {
        const player1Index = rollDice(1, resources.length) - 1;
        const player2Index =
          (player1Index + rollDice(1, resources.length - 1)) % resources.length;

        return [resources[player1Index], null, resources[player2Index]];
      }
      case 'MATCH_COUNT':
        pickField = 'matchCount';
        break;
      case 'LAST_PLAYED_AT':
        pickField = 'lastPlayedAt';
        break;
    }

    return resources.reduce(
      (pickedPlayers, candidate) => {
        const candidateStat = candidate[pickField] ?? 0;

        if (candidateStat < (pickedPlayers[0][pickField] ?? 0)) {
          return [candidate, pickedPlayers[0], pickedPlayers[1]];
        }
        if (candidate[pickField] < (pickedPlayers[1][pickField] ?? 0)) {
          return [pickedPlayers[0], candidate, pickedPlayers[1]];
        }
        if (candidate[pickField] < (pickedPlayers[2][pickField] ?? 0)) {
          return [pickedPlayers[0], pickedPlayers[1], candidate];
        }

        return pickedPlayers;
      },
      [
        { [pickField]: Infinity },
        { [pickField]: Infinity },
        { [pickField]: Infinity },
      ],
    );
  };

  /* get the 1st and 3rd elements from the picked candidates */
  /* 1st and 2nd may have been together in their last match */
  /* (e.g. same lastPlayedAt) */
  const [player1, , player2] = pickPlayers(arrayRand(pickAlgorithms));

  return (
    <>
      <Player
        data={player1.data}
        onWin={() => {
          setResources(resources.player(player1.index).wins(player2.index));
        }}
      />
      vs
      <Player
        data={player2.data}
        onWin={() => {
          setResources(resources.player(player2.index).wins(player1.index));
        }}
      />
      <button
        type="button"
        onClick={() => {
          setResources(resources.player(player1.index).ties(player2.index));
        }}>
        ==
      </button>
    </>
  );
}

export default Play;
