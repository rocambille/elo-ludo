import { useCallback, useEffect, useReducer } from 'react';

const reducer = (initialState) => (state, action) => {
  const { type } = action;

  switch (type) {
    case 'response': {
      const { response } = action;

      return { ...state, body: initialState, error: null, response };
    }
    case 'body': {
      const { body } = action;

      return { ...state, body, error: null };
    }
    case 'error': {
      const { error } = action;

      return { ...state, body: null, error, response: null };
    }
    default:
      return state;
  }
};

const defaultOptions = {
  onBody: (body) => body,
  onResponse: (response) => response.json(),
};

function useFetch(urlOrFactory, init, options) {
  const { initialState, onBody, onResponse } = {
    ...defaultOptions,
    ...options,
  };

  const [state, dispatch] = useReducer(reducer(initialState), {
    body: initialState,
  });

  const doFetch = useCallback(
    (url) => {
      if (url) {
        fetch(url, init)
          .then((response) => {
            if (response.ok) {
              dispatch({ type: 'response', response });

              return onResponse(response);
            } else {
              throw new Error();
            }
          })
          .then((body) => {
            if (body != null) {
              dispatch({ type: 'body', body: onBody(body) });
            }
          })
          .catch((err) => {
            dispatch({ type: 'error', err });
          });
      }
    },
    [onBody, onResponse, init],
  );

  useEffect(() => {
    if (typeof urlOrFactory !== 'function') {
      const url = urlOrFactory;

      doFetch(url);
    }
  }, [doFetch, urlOrFactory]);

  if (typeof urlOrFactory === 'function') {
    const factory = urlOrFactory;

    state.fetch = (...argv) => doFetch(factory(...argv));
  }

  return state;
}

export default useFetch;
