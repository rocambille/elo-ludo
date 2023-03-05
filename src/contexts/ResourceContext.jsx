import React, { createContext, useContext, useEffect, useState } from 'react';
import { node } from 'prop-types';

import { Pool } from '@rocambille/elo';
import { useLoginData } from './LoginDataContext';
import useGitHubContent from '../hooks/useGitHubContent';

const makeEloPool = (data) =>
  Pool.from(
    data.filter(({ type }) => type !== 'goodie' && type !== 'accessoire')
  );

const pick = (resources, setResources) => {
  try {
    const [a, b, algorithm] = resources.pick();

    const play = (i, j) => ({
      data: resources[i],
      wins: () => setResources(makeEloPool(resources.player(i).wins(j))),
      loses: () => setResources(makeEloPool(resources.player(i).loses(j))),
      ties: () => setResources(makeEloPool(resources.player(i).ties(j))),
    });

    return [play(a, b), play(b, a), algorithm];
  } catch (e) {
    return [];
  }
};

const initialContent = makeEloPool([]);

const ResourceContext = createContext();

function ResourceProvider({ children }) {
  const { loginData } = useLoginData();

  const [type, setType] = useState('Collection');

  const [picked, setPicked] = useState([]);

  const [resources, setResources, git] = useGitHubContent(
    loginData?.username,
    'elo-ludo',
    `${type}.json`,
    {
      token: loginData?.pat,
      initialContent,
      branch: 'data',
      afterPull: makeEloPool,
    }
  );

  useEffect(() => {
    if (resources.length > 0) {
      setPicked(pick(resources, setResources));
    }
  }, [resources]);

  return (
    <ResourceContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        resources,
        hasSomethingToSave: !git.isUpToDate,
        picked,
        save: () => {
          git.push();
        },
        setResources: (newResources) => setResources(makeEloPool(newResources)),
        setType,
        type,
      }}
    >
      {children}
    </ResourceContext.Provider>
  );
}

ResourceProvider.propTypes = {
  children: node.isRequired,
};

const useResources = () => useContext(ResourceContext);

export { ResourceProvider, useResources };
