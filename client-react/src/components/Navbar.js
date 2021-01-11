import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="sticky top-0 flex justify-center m-4 z-50">
      <div className="flex justify-between w-full max-w-screen-xl">
        <h1 className="text-3xl font-medium cursor-pointer">
          <NavLink to="/">
            LFG<span className="font-thin">roup</span>
          </NavLink>
        </h1>
        <ul className="flex justify-end items-center cursor-pointer">
          <li>
            <NavLink to="/groups" activeClassName="font-bold">
              Groups
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
