import React from 'react';
import { NavLink } from 'react-router-dom';
import { string } from 'prop-types';

const link = (path, text) => (
  <li>
    <NavLink
      to={path}
      className={({ isActive }) => (isActive ? 'active link' : 'link')}>
      {text}
    </NavLink>
  </li>
);

function Navbar({ className }) {
  return (
    <nav className={className}>
      <ul className="flex flex-row justify-evenly sm:justify-start shadow-t sm:shadow-b">
        {link('/', 'Home')}
        {link('/play', 'Play')}
        {link('/merge', 'Merge')}
      </ul>
    </nav>
  );
}

Navbar.propTypes = {
  className: string,
};

Navbar.defaultProps = {
  className: '',
};

export default Navbar;
