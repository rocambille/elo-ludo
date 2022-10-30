import React from 'react';

import Resource from '../components/Resource';
import ResourceGrid from '../components/ResourceGrid';
import { useResources } from '../contexts';

function Home() {
  const { resources, setResources } = useResources();

  const sortedResources = resources.sort((a, b) => {
    const defaultElo = { rating: 0, matchCount: 0, lastDelta: 0 };
    const eloA = { ...defaultElo, ...a.elo };
    const eloB = { ...defaultElo, ...b.elo };

    return (
      eloB.rating - eloA.rating ||
      eloB.matchCount - eloA.matchCount ||
      eloB.lastDelta - eloA.lastDelta
    );
  });

  const [min, max, average, totalMatchCount] = sortedResources.reduce(
    ([min, max, average, totalMatchCount], { elo }, index, array) => [
      Math.min(min, elo?.rating ?? Infinity),
      Math.max(max, elo?.rating ?? 0),
      average + (elo?.rating ?? 0) / array.length,
      totalMatchCount + (elo?.matchCount ?? 0),
    ],
    [Infinity, 0, 0, 0],
  );

  const median =
    sortedResources[Math.floor(sortedResources.length / 2)]?.elo.rating.toFixed(
      1,
    );

  return (
    <>
      <h1>played with {resources.length} games</h1>
      <p className="mb-4">
        average : {average.toFixed(1)} / median : {median} after{' '}
        {totalMatchCount} matches
      </p>
      <ResourceGrid
        resources={sortedResources}
        resourceComponentType={({ data, index }) => {
          const score =
            2 + (18 * ((data.elo?.rating ?? 1500) - min)) / (max - min);

          return (
            <Resource data={data}>
              <p>
                <strong>{Math.round(score) / 2}</strong>
                <button
                  className="link"
                  type="button"
                  onClick={() => setResources(resources.player(index).reset())}>
                  Reset
                </button>
              </p>
            </Resource>
          );
        }}
      />
    </>
  );
}

export default Home;
