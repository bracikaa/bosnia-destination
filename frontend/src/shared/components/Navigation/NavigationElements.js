import React, { useState, useContext } from "react";
import { slide as Menu } from "react-burger-menu";
import { NavLink } from "react-router-dom";

import "./NavigationElements.css";
import { AuthContext } from "../../context/auht-context";

const MyContext = React.createContext();

export const MyProvider = (props) => {
  const [menuOpenState, setMenuOpenState] = useState(false);

  return (
    <MyContext.Provider
      value={{
        isMenuOpen: menuOpenState,
        toggleMenu: () => setMenuOpenState(!menuOpenState),
        stateChangeHandler: (newState) => setMenuOpenState(newState.isOpen),
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export const NavigationElements = () => {
  const ctx = useContext(MyContext);
  const auth = useContext(AuthContext);
  return (
    <Menu
      right
      width={230}
      isOpen={ctx.isMenuOpen}
      onStateChange={(state) => ctx.stateChangeHandler(state)}
    >
      <h2 className="menu-header-item">Bosnia Travel Guide</h2>
      <NavLink
        onClick={ctx.toggleMenu}
        activeClassName="activeLink"
        className="menu-item"
        exact
        to="/"
      >
        Home
      </NavLink>
      {auth.isLoggedIn && (
        <NavLink
          onClick={ctx.toggleMenu}
          activeClassName="activeLink"
          className="menu-item"
          to={`/${auth.userid}/places`}
        >
          My Places
        </NavLink>
      )}
      {auth.isLoggedIn && (
        <NavLink
          onClick={ctx.toggleMenu}
          activeClassName="activeLink"
          className="menu-item"
          to="/places/new"
        >
          New Place
        </NavLink>
      )}
      {!auth.isLoggedIn && (
        <NavLink
          onClick={ctx.toggleMenu}
          activeClassName="activeLink"
          className="menu-item"
          to="/auth"
        >
          Authenticate
        </NavLink>
      )}
      {auth.isLoggedIn && (
        <a onClick={ctx.toggleMenu && auth.logout} className="menu-item">
          Logout
        </a>
      )}
    </Menu>
  );
};
