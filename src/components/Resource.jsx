import React from 'react';
import { node, number, shape, string } from 'prop-types';

const format = (elo, matchCount, lastDelta, lastPlayedAt) => {
  elo = elo.toFixed(1);

  lastDelta = lastDelta.toFixed(1);

  if (lastDelta > 0) {
    lastDelta = `+${lastDelta}`;
  }

  const dateOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  lastPlayedAt = new Date(lastPlayedAt).toLocaleDateString(
    undefined,
    dateOptions,
  );

  return `${elo} / ${matchCount} (${lastDelta} on ${lastPlayedAt})`;
};

function Resource({ children, data }) {
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
        <p>
          {elo != null
            ? format(elo, matchCount, lastDelta, lastPlayedAt)
            : 'newbie'}
        </p>
        {children}
      </figcaption>
    </figure>
  );
}

Resource.propTypes = {
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

export default Resource;
