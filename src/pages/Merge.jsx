import { useRef, useState } from 'react';

import papaparse from 'papaparse';

import { useResources } from '../contexts';

function Merge() {
  const { resources, setResources } = useResources();
  const [addedResources, setAddedResources] = useState([]);
  const [removedResources, setRemovedResources] = useState([]);
  const [errors, setErrors] = useState([]);

  const inputRef = useRef();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        const parsePromises = [];

        for (const file of inputRef.current.files) {
          parsePromises.push(
            new Promise((resolve) => {
              papaparse.parse(file, {
                header: true,
                complete: (results) => resolve(results),
              });
            })
          );
        }

        Promise.all(parsePromises).then((parsedResults) => {
          const mergeResults = (
            [incomingResources, incomingErrors],
            parseResult
          ) => [
            [
              ...incomingResources,
              ...parseResult.data
                .filter(
                  ({ Titre, Type }) =>
                    Titre != null && Type !== 'goodie' && Type !== 'accessoire'
                )
                .map((result) => ({
                  id: (result.ID ?? result['"ID"']).toString(),
                  title: result.Titre,
                })),
            ],
            [...incomingErrors, ...parseResult.errors],
          ];

          const [incomingResources, incomingErrors] = parsedResults.reduce(
            mergeResults,
            [[], []]
          );

          setErrors(incomingErrors);

          const mergeResources = (mergedResources, incomingResource) => {
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

          const mergedResources = incomingResources.reduce(mergeResources, []);

          setAddedResources(
            mergedResources.filter(
              (mergedResource) =>
                resources.find(
                  (resource) => resource.id === mergedResource.id
                ) == null
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
        });
      }}
    >
      <input ref={inputRef} type="file" multiple accept="text/csv" />
      <button type="submit">Merge</button>
      {errors.length > 0 && (
        <section>
          <h2>Errors</h2>
          <ul>
            {errors.map((error) => (
              <li key={`${error.message}:${error.row}`}>
                {error.message} ({error.row})
              </li>
            ))}
          </ul>
        </section>
      )}
      {addedResources.length > 0 && (
        <section>
          <h2>Added</h2>
          <ul>
            {addedResources.map((addedResource) => (
              <li key={addedResource.id}>
                {addedResource.title}
                {addedResource.image == null && (
                  <>
                    <input
                      type="text"
                      onChange={(event) => {
                        setResources(
                          resources.map((resource) =>
                            resource.id === addedResource.id
                              ? {
                                  ...resource,
                                  image: { S300: event.target.value },
                                }
                              : resource
                          )
                        );
                      }}
                    />
                    <a
                      href={`https://www.myludo.fr/#!/game/${addedResource.id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        alt="open in a new window"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAQElEQVR42qXKwQkAIAxDUUdxtO6/RBQkQZvSi8I/pL4BoGw/XPkh4XigPmsUgh0626AjRsgxHTkUThsG2T/sIlzdTsp52kSS1wAAAABJRU5ErkJggg=="
                      />
                    </a>
                  </>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
      {removedResources.length > 0 && (
        <section>
          <h2>Removed</h2>
          <ul>
            {removedResources.map((removedResource) => (
              <li key={removedResource.id}>{removedResource.title}</li>
            ))}
          </ul>
        </section>
      )}
    </form>
  );
}

export default Merge;
