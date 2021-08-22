import React, { createContext, useContext, useState } from 'react';
import { node } from 'prop-types';

import { useLoginData } from './LoginDataContext';
import useGitHubContent from '../hooks/useGitHubContent';

const initialContent = [];

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
    },
  );

  const hasSomethingToSave = !git.isUpToDate;

  const add = (data) => {
    setResources([...resources, data]);
  };

  const remove = ({ id }) => {
    setResources(resources.filter((resource) => resource.id !== id));
  };

  const save = () => {
    git.push();
  };

  const update = (...newResources) => {
    setResources(
      resources.map(
        (resource) =>
          newResources.find(({ id }) => id === resource.id) ?? resource,
      ),
    );
  };

  return (
    <ResourceContext.Provider
      value={{
        resources: resources.filter(
          ({ type }) => type !== 'goodie' && type !== 'accessoire',
        ),
        add,
        hasSomethingToSave,
        remove,
        save,
        setType,
        type,
        update,
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
