import React from 'react';
import { arrayOf, elementType } from 'prop-types';

import Resource from './Resource';

function ResourceGrid({
  resources,
  resourceComponentType: ResourceComponentType,
}) {
  return (
    <ol className="grid grid-cols-1 sm:grid-cols-auto-fit gap-y-4 justify-items-center">
      {resources.map((resource, index) => (
        <li key={resource.id}>
          <ResourceComponentType data={resource} index={index} />
        </li>
      ))}
    </ol>
  );
}

ResourceGrid.propTypes = {
  resources: arrayOf(Resource.propTypes.data).isRequired,
  resourceComponentType: elementType,
};

ResourceGrid.defaultProps = {
  resourceComponentType: Resource,
};

export default ResourceGrid;
