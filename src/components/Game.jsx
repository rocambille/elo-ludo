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

const formatMatchCount = (matchCount) => {
  if (matchCount == null) {
    return null;
  }

  return ` / ${matchCount}`;
};

const formatLastPlayedAt = (lastPlayedAt) => {
  if (lastPlayedAt == null) {
    return null;
  }

  return ` : ${new Date(lastPlayedAt)}`;
};

function Game({ children, data }) {
  const {
    elo,
    image: { S300: imgSrc },
    lastDelta,
    lastPlayedAt,
    matchCount,
    title,
  } = data;

  return (
    <figure className="sm:inline-flex shadow overflow-hidden rounded-xl sm:p-0 sm:h-72">
      {imgSrc && (
        <img
          loading="lazy"
          src={imgSrc}
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
            {formatMatchCount(matchCount)}
            {formatLastPlayedAt(lastPlayedAt)}
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
      S300: string.isRequired,
    }).isRequired,
    lastDelta: number,
    lastPlayedAt: number,
    matchCount: number,
    title: string.isRequired,
  }).isRequired,
};

export default Game;
