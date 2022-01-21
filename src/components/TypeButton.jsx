import React from 'react';
import { useResources } from '../contexts';

function SaveButton() {
  const { type, setType } = useResources();

  const match = {
    ['Collection']: 'Wishlist',
    ['Wishlist']: 'Collection',
  };

  return (
    <button
      className="link"
      type="button"
      onClick={() => {
        setType(match[type]);
      }}>
      {match[type]}
    </button>
  );
}

export default SaveButton;
