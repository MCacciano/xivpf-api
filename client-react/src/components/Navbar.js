import React from 'react';
import { NavLink } from 'react-router-dom';
import lfg from '../axios/lfgroup';

import useUserContext from '../hooks/useUserCtx';

const Navbar = () => {
  const { user, setUser } = useUserContext();

  const handleLogout = async () => {
    try {
      await lfg.get('/auth/logout');
      setUser(null);
      localStorage.removeItem('lfg_user');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="sticky top-0 flex justify-center m-4 z-50">
      <div className="flex justify-between w-full max-w-screen-xl">
        <h1 className="text-3xl font-medium cursor-pointer">
          <NavLink to="/">
            LFG<span className="font-thin">roup</span>
          </NavLink>
        </h1>
        <ul className="flex justify-end items-center cursor-pointer">
          <li className="mx-2">
            <NavLink to="/groups" activeClassName="font-bold">
              Groups
            </NavLink>
          </li>
          {user ? (
            <li className="mx-2" onClick={handleLogout}>
              Logout
            </li>
          ) : (
            <li className="mx-2">
              <NavLink to="/login" activeClassName="font-bold">
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
