import React from 'react';
import { useGameList } from '../contexts';

function SaveButton() {
  const { hasSomethingToSave, saveGames } = useGameList();

  return (
    <button
      className="link"
      type="button"
      onClick={saveGames}
      disabled={!hasSomethingToSave}>
      Save
    </button>
  );
}

export default SaveButton;
