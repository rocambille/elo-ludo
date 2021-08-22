import React from 'react';
import { string } from 'prop-types';

import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import SaveButton from './SaveButton';
import TypeButton from './TypeButton';
import { useLoginData } from '../contexts';

function Controls({ className }) {
  const { loginData } = useLoginData();

  return (
    <div
      className={`flex flex-row justify-end shadow-b mr-2 sm:mr-0 ${className}`}>
      {loginData == null ? (
        <LoginButton />
      ) : (
        <>
          <TypeButton />
          <SaveButton />
          <LogoutButton />
        </>
      )}
    </div>
  );
}

Controls.propTypes = {
  className: string,
};

Controls.defaultProps = {
  className: '',
};

export default Controls;
