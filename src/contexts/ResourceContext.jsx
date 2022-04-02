import React, { createContext, useContext, useState } from 'react';
import { node } from 'prop-types';

import { useLoginData } from './LoginDataContext';
import useGitHubContent from '../hooks/useGitHubContent';

import elo from '@rocambille/elo';

const initialContent = elo.Pool([]);

const ResourceContext = createContext();

const makeEloPool = (data) => elo.Pool(data);

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
        resources: resources.filter(
          ({ type }) => type !== 'goodie' && type !== 'accessoire',
        ),
        hasSomethingToSave,
        save,
        setResources,
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
