import { useEffect, useReducer } from 'react';
import { Buffer } from 'buffer';

const gitReducer = (state, action) => {
  const { git } = action;

  const cleanedState = { ...state, err: null };

  switch (git) {
    case 'commit': {
      const { content } = action;

      return { ...cleanedState, content, isUpToDate: false };
    }
    case 'did fetch': {
      const { content = cleanedState.content, sha } = action;

      return {
        ...cleanedState,
        content,
        isFetching: false,
        isUpToDate: true,
        sha,
      };
    }
    case 'failed fetch': {
      const { err } = action;
      console.error(err);

      return { ...cleanedState, err, isFetching: false };
    }
    case 'will fetch':
      return { ...cleanedState, isFetching: true };
    default:
      throw new Error();
  }
};

const bearer = (token) => token && `Bearer ${token}`;

const defaulOptions = {
  afterPull: (data) => data,
  beforePush: (data) => data,
  branch: 'main',
};

const useGitHubContent = (owner, repository, path, options = defaulOptions) => {
  const { token, initialContent, afterPull, beforePush, branch } = {
    ...defaulOptions,
    ...options,
  };

  const [{ content, err, isFetching, isUpToDate, sha }, dispatch] = useReducer(
    gitReducer,
    { content: initialContent }
  );

  const canBuildTarget = owner && repository && path;

  const target =
    canBuildTarget &&
    `https://api.github.com/repos/${owner}/${repository}/contents/${path}`;

  useEffect(() => {
    if (target) {
      const targetWithRef = target && `${target}?ref=${branch}`;

      dispatch({ git: 'will fetch' });

      fetch(targetWithRef, {
        headers: {
          Authorization: bearer(token),
          Accept: 'application/vnd.github.v3+json',
        },
      })
        .then((response) => {
          if (response.ok === false) {
            throw new Error();
          } else {
            return response.json();
          }
        })
        .then((data) => {
          const decoded = Buffer.from(data.content, 'base64');
          const parsed = JSON.parse(decoded);

          dispatch({
            git: 'did fetch',
            content: afterPull(parsed),
            sha: data.sha,
          });
        })
        .catch((fetchError) =>
          dispatch({ git: 'failed fetch', err: fetchError })
        );
    }
  }, [afterPull, branch, target, token]);

  const setContent = (newContent) =>
    dispatch({ git: 'commit', content: newContent });

  const push = () => {
    if (!isUpToDate && !isFetching && content && sha && target) {
      const ready = beforePush(content);
      const json = JSON.stringify(ready);
      const encoded = Buffer.from(json).toString('base64');

      dispatch({ git: 'will fetch' });

      fetch(target, {
        method: 'put',
        headers: {
          Authorization: bearer(token),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `updated ${path}`,
          content: encoded,
          sha,
          branch,
        }),
      })
        .then((response) => {
          if (response.ok === false) {
            throw new Error();
          } else {
            return response.json();
          }
        })
        .then((data) => dispatch({ git: 'did fetch', sha: data.content.sha }))
        .catch((fetchError) =>
          dispatch({ git: 'failed fetch', err: fetchError })
        );
    }
  };

  const git = {
    err,
    isFetching,
    isUpToDate,
    push,
  };

  return [content, setContent, git];
};

export default useGitHubContent;
