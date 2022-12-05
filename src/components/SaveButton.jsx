import React from 'react';
import { useResources } from '../contexts';

function SaveButton() {
  const { hasSomethingToSave, save } = useResources();

  return (
    <button
      className="link"
      type="button"
      onClick={save}
      disabled={!hasSomethingToSave}
    >
      Save
    </button>
  );
}

export default SaveButton;
