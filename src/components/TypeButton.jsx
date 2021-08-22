import React from 'react';
import { useResources } from '../contexts';

function SaveButton() {
  const { type, setType } = useResources();

  const when = {
    ['Collection']: 'Wishlist',
    ['Wishlist']: 'Collection',
  };

  return (
    <button
      className="link"
      type="button"
      onClick={() => {
        setType(when[type]);
      }}>
      {when[type]}
    </button>
  );
}

export default SaveButton;
