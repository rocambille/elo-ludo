import React, { createContext, useContext } from 'react';
import { node } from 'prop-types';

import { useLoginData } from './LoginDataContext';
import useGitHubContent from '../hooks/useGitHubContent';

const initialContent = [];

const GameListContext = createContext();

function GameListProvider({ children }) {
  const { loginData } = useLoginData();

  const [games, setGames, git] = useGitHubContent(
    loginData?.username,
    'elo-ludo',
    'data.json',
    {
      token: loginData?.pat,
      initialContent,
      branch: 'data',
    },
  );

  const hasSomethingToSave = !git.isUpToDate;

  const addGame = (data) => {
    setGames([...games, { ...data }]);
  };

  const removeGame = ({ id }) => {
    setGames(games.filter((game) => game.id !== id));
  };

  const saveGames = () => {
    git.push();
  };

  const updateGames = (...newData) => {
    setGames(
      games.map((game) => newData.find(({ id }) => id === game.id) ?? game),
    );
  };

  return (
    <GameListContext.Provider
      value={{
        games: games.filter(
          ({ type }) => type !== 'goodie' && type !== 'accessoire',
        ),
        addGame,
        hasSomethingToSave,
        removeGame,
        saveGames,
        updateGames,
      }}>
      {children}
    </GameListContext.Provider>
  );
}

GameListProvider.propTypes = {
  children: node.isRequired,
};

const useGameList = () => useContext(GameListContext);

export { GameListProvider, useGameList };
