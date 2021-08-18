import React from 'react';
import { node, number, shape, string } from 'prop-types';

const formatElo = (elo) => elo?.toFixed(1);

const formatLastDelta = (lastDelta) => {
  if (lastDelta == null) {
    return null;
  }

  lastDelta = lastDelta.toFixed(1);

  if (lastDelta > 0) {
    lastDelta = `+${lastDelta}`;
  }

  return ` (${lastDelta})`;
};

function Game({ children, data }) {
  const {
    elo,
    image: { s300: imgPath },
    lastDelta,
    title,
  } = data;

  return (
    <figure className="sm:inline-flex shadow overflow-hidden rounded-xl sm:p-0 sm:h-72">
      {imgPath && (
        <img
          loading="lazy"
          src={`https://image.tmdb.org/t/p/w500${imgPath}`}
          alt={title}
          className="block sm:w-48 h-auto"
        />
      )}
      <figcaption className="flex flex-col sm:w-96 p-4 sm:p-8 text-center sm:text-left space-y-2">
        <p className="font-semibold">{title}</p>
        {elo && lastDelta && (
          <p>
            {formatElo(elo)}
            {formatLastDelta(lastDelta)}
          </p>
        )}
        {children}
      </figcaption>
    </figure>
  );
}

Game.propTypes = {
  children: node,
  data: shape({
    elo: number,
    id: string.isRequired,
    image: shape({
      s300: string.isRequired,
    }).isRequired,
    lastDelta: number,
    title: string.isRequired,
  }).isRequired,
};

export default Game;
