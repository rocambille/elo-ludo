import React, { createContext, useContext, useMemo, useState } from 'react';
import { node } from 'prop-types';

const LoginDataContext = createContext();

function LoginDataProvider({ children }) {
  const [loginData, setLoginData] = useState();

  const data = useMemo(() => ({ loginData, setLoginData }), [loginData]);

  return (
    <LoginDataContext.Provider value={data}>
      {children}
    </LoginDataContext.Provider>
  );
}

LoginDataProvider.propTypes = {
  children: node.isRequired,
};

const useLoginData = () => useContext(LoginDataContext);

export { LoginDataProvider, useLoginData };
