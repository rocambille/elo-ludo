import React from 'react';
import { HashRouter as Router } from 'react-router-dom';

import { LoginDataProvider, ResourceProvider } from './contexts';
import Controls from './components/Controls';
import Navbar from './components/Navbar';
import Main from './components/Main';

import './App.css';

function App() {
  return (
    <LoginDataProvider>
      <ResourceProvider>
        <Router>
          <Navbar className="row-start-3 sm:row-auto sticky bottom-0 sm:top-0 bg-white" />
          <Controls className="sticky top-0 bg-white" />
          <Main />
        </Router>
      </ResourceProvider>
    </LoginDataProvider>
  );
}

export default App;
