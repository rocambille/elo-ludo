import React from 'react';

import Resource from '../components/Resource';
import ResourceGrid from '../components/ResourceGrid';
import { useResources } from '../contexts';

function Home() {
  const { resources } = useResources();

  const max = resources.reduce((max, { elo = 0 }) => Math.max(max, elo), 0);

  return (
    <ResourceGrid
      resources={resources.sort(
        (a, b) =>
          b.elo - a.elo ||
          b.matchCount - a.matchCount ||
          b.lastDelta - a.lastDelta,
      )}
      resourceComponentType={({ data }) => {
        const score = 7 + (3 * (data.elo - 1500)) / (max - 1500);

        return (
          <Resource data={data}>
            <strong>{Math.round(score * 2) / 2}</strong>
          </Resource>
        );
      }}
    />
  );
}

export default Home;
