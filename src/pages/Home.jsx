import { createContext, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

import Resource from '../components/Resource';
import ResourceGrid from '../components/ResourceGrid';
import { useResources } from '../contexts';

const homeContext = createContext();

function HomeResource({ data, index }) {
  const { resources, setResources, min, max } = useContext(homeContext);

  const score =
    Math.round(2 + (18 * ((data.elo?.rating ?? NaN) - min)) / (max - min)) / 2;

  return (
    <Resource data={data}>
      <p>
        <strong>{Number.isNaN(score) ? 'N/A' : score}</strong>
        <button
          className="link"
          type="button"
          onClick={() => setResources(resources.player(index).reset())}
        >
          Reset
        </button>
      </p>
    </Resource>
  );
}

HomeResource.propTypes = {
  data: PropTypes.shape({
    elo: PropTypes.shape({
      rating: PropTypes.number.isRequired,
    }),
  }).isRequired,
  index: PropTypes.number.isRequired,
};

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

  const rankedResources = sortedResources.filter(({ elo }) => elo != null);

  const analyze = (
    [min, max, average, totalMatchCount],
    { elo },
    index,
    array
  ) => [
    Math.min(min, elo?.rating ?? Infinity),
    Math.max(max, elo?.rating ?? 0),
    average + (elo?.rating ?? 0) / array.length,
    totalMatchCount + (elo?.matchCount ?? 0),
  ];

  const [min, max, average, totalMatchCount] = rankedResources.reduce(analyze, [
    Infinity,
    0,
    0,
    0,
  ]);

  const median =
    rankedResources[Math.floor(sortedResources.length / 2)]?.elo.rating.toFixed(
      1
    );

  const data = useMemo(
    () => ({
      resources,
      setResources,
      min,
      max,
    }),
    [resources, min, max]
  );

  return (
    <homeContext.Provider value={data}>
      <h1>played with {resources.length} games</h1>
      <p className="mb-4">
        average : {average.toFixed(1)} / median : {median} after{' '}
        {totalMatchCount} matches
      </p>
      <ResourceGrid
        resources={sortedResources}
        resourceComponentType={HomeResource}
      />
    </homeContext.Provider>
  );
}

export default Home;
