import React from 'react';

import Resource from '../components/Resource';
import ResourceGrid from '../components/ResourceGrid';
import { useResources } from '../contexts';

function Home() {
  const { resources, setResources } = useResources();

  const [min, max] = resources.reduce(
    ([min, max], { elo = 0 }) => [Math.min(min, elo), Math.max(max, elo)],
    [Infinity, 0],
  );

  return (
    <>
      <h1>play with {resources.length} games</h1>
      <ResourceGrid
        resources={resources.sort(
          (a, b) =>
            b.elo - a.elo ||
            b.matchCount - a.matchCount ||
            b.lastDelta - a.lastDelta,
        )}
        resourceComponentType={({ data, index }) => {
          const score = 1 + (9 * (data.elo - min)) / (max - min);

          return (
            <Resource data={data}>
              <p>
                <strong>{Math.round(score).toString()}</strong>
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
