import React from 'react';
import { node, number, shape, string } from 'prop-types';

const format = ({ rating, lastDelta, lastPlayedAt, matchCount }) => {
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

  return `${rating.toFixed(
    1,
  )} / ${matchCount} (${lastDelta} on ${lastPlayedAt})`;
};

function Resource({ children, data }) {
  const {
    elo,
    image: { S300: imgSrc },
    title,
  } = data;

  return (
    <figure className="sm:inline-flex shadow overflow-hidden rounded-xl sm:p-0 sm:h-72">
      {imgSrc && (
        <img
          loading="lazy"
          src={imgSrc}
          alt={title}
          className="block sm:w-48 h-auto object-contain"
        />
      )}
      <figcaption className="flex flex-col sm:w-96 p-4 sm:p-8 text-center sm:text-left space-y-2">
        <p className="font-semibold">{title}</p>
        <p>{elo ? format(elo) : 'newbie'}</p>
        {children}
      </figcaption>
    </figure>
  );
}

Resource.propTypes = {
  children: node,
  data: shape({
    elo: shape({
      rating: number.isRequired,
      lastDelta: number.isRequired,
      lastPlayedAt: number.isRequired,
      matchCount: number.isRequired,
    }),
    id: string.isRequired,
    image: shape({
      S300: string.isRequired,
    }).isRequired,
    title: string.isRequired,
  }).isRequired,
};

export default Resource;
