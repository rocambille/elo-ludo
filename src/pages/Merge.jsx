import React, { useRef, useState } from 'react';

import { useResources } from '../contexts';

function Merge() {
  const { resources, setResources } = useResources();
  const [addedResources, setAddedResources] = useState([]);
  const [removedResources, setRemovedResources] = useState([]);

  const textareaRef = useRef();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        const incomingResources = JSON.parse(textareaRef.current.value);

        const merge = (mergedResources, incomingResource) => {
          const alreadyMerged =
            mergedResources.find(
              (resource) => resource.id === incomingResource.id
            ) != null;

          if (alreadyMerged) {
            return mergedResources;
          }

          const knownResource = resources.find(
            (resource) => resource.id === incomingResource.id
          );

          if (knownResource) {
            return [...mergedResources, knownResource];
          }

          return [...mergedResources, incomingResource];
        };

        const mergedResources = incomingResources.reduce(merge, []);

        setAddedResources(
          mergedResources.filter(
            (mergedResource) =>
              resources.find((resource) => resource.id === mergedResource.id) ==
              null
          )
        );
        setRemovedResources(
          resources.filter(
            (resource) =>
              mergedResources.find(
                (mergedResource) => mergedResource.id === resource.id
              ) == null
          )
        );

        setResources(mergedResources);
      }}
    >
      <textarea ref={textareaRef} />
      <button type="submit">Merge</button>
      <section>
        <h2>Added</h2>
        <ul>
          {addedResources.map((addedResource) => (
            <li key={addedResource.id}>{addedResource.title}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Removed</h2>
        <ul>
          {removedResources.map((removedResource) => (
            <li key={removedResource.id}>{removedResource.title}</li>
          ))}
        </ul>
      </section>
    </form>
  );
}

export default Merge;
