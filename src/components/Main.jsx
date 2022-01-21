import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from '../pages/Home';
import Play from '../pages/Play';
import Merge from '../pages/Merge';

const route = (path, Component) => (
  <Route path={path} element={<Component />} />
);

function Main() {
  return (
    <main className="col-span-full p-4">
      <Routes>
        {route('/', Home)}
        {route('/play', Play)}
        {route('/merge', Merge)}
      </Routes>
    </main>
  );
}

export default Main;
