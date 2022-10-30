import React, { createContext, useContext, useState } from 'react';
import { node } from 'prop-types';

import { useLoginData } from './LoginDataContext';
import useGitHubContent from '../hooks/useGitHubContent';

import { Pool } from '@rocambille/elo';

const makeEloPool = (data) =>
  Pool.from(
    data.filter(({ type }) => type !== 'goodie' && type !== 'accessoire'),
  );

const initialContent = makeEloPool([]);

const ResourceContext = createContext();

function ResourceProvider({ children }) {
  const { loginData } = useLoginData();

  const [type, setType] = useState('Collection');

  const [resources, setResources, git] = useGitHubContent(
    loginData?.username,
    'elo-ludo',
    `${type}.json`,
    {
      token: loginData?.pat,
      initialContent,
      branch: 'data',
      afterPull: makeEloPool,
    },
  );

  const hasSomethingToSave = !git.isUpToDate;

  const save = () => {
    git.push();
  };

  return (
    <ResourceContext.Provider
      value={{
        resources,
        hasSomethingToSave,
        save,
        setResources: (data) => setResources(makeEloPool(data)),
        setType,
        type,
      }}>
      {children}
    </ResourceContext.Provider>
  );
}

ResourceProvider.propTypes = {
  children: node.isRequired,
};

const useResources = () => useContext(ResourceContext);

export { ResourceProvider, useResources };
