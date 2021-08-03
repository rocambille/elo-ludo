import React from 'react';
import { HashRouter as Router } from 'react-router-dom';

import { LoginDataProvider, MovieListProvider } from './contexts';
import Controls from './components/Controls';
import Navbar from './components/Navbar';
import Routes from './pages';

import './App.css';

function App() {
  return (
    <LoginDataProvider>
      <MovieListProvider>
        <Router>
          <Navbar className="row-start-3 sm:row-auto sticky bottom-0 sm:top-0 bg-white" />
          <Controls className="sticky top-0 bg-white" />
          <main className="col-span-full p-4">
            <Routes />
          </main>
        </Router>
      </MovieListProvider>
    </LoginDataProvider>
  );
}

export default App;
