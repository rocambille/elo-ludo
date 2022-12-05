import React, { useRef } from 'react';

import Modal from './Modal';
import { useLoginData } from '../contexts';

function LoginButton() {
  const usernameRef = useRef();
  const patRef = useRef();

  const { setLoginData } = useLoginData();

  return (
    <Modal>
      <Modal.Trigger className="link">Login</Modal.Trigger>
      <Modal.Content>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            fetch('https://api.github.com', {
              method: 'head',
              headers: { authorization: `Bearer ${patRef.current.value}` },
            }).then((response) => {
              if (
                response.ok &&
                response.headers.get('X-OAuth-Scopes') === 'public_repo'
              ) {
                setLoginData({
                  username: usernameRef.current.value,
                  pat: patRef.current.value,
                });
              } else {
                alert('failed to use token');
              }
            });
          }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <label htmlFor="username">username</label>
            <input
              className="focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 px-1"
              ref={usernameRef}
              id="username"
              type="text"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="pat">PAT</label>
            <input
              className="focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 px-1"
              ref={patRef}
              id="pat"
              type="password"
            />
          </div>
          <div>
            <button type="submit">Validate</button>
          </div>
        </form>
      </Modal.Content>
    </Modal>
  );
}

export default LoginButton;
