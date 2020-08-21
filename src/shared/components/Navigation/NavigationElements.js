import React, { useState, useContext } from "react";
import { slide as Menu } from "react-burger-menu";
import { NavLink } from "react-router-dom";

import "./NavigationElements.css";

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
      <NavLink
        onClick={ctx.toggleMenu}
        activeClassName="activeLink"
        className="menu-item"
        to="/u1/places"
      >
        My Places
      </NavLink>
      <NavLink
        onClick={ctx.toggleMenu}
        activeClassName="activeLink"
        className="menu-item"
        to="/places/new"
      >
        New Place
      </NavLink>
      <NavLink
        onClick={ctx.toggleMenu}
        activeClassName="activeLink"
        className="menu-item"
        to="/places/:placeId"
      >
        Update Place
      </NavLink>
      <NavLink
        onClick={ctx.toggleMenu}
        activeClassName="activeLink"
        className="menu-item"
        to="/places/random"
      >
        Random Place
      </NavLink>
      <NavLink
        onClick={ctx.toggleMenu}
        activeClassName="activeLink"
        className="menu-item"
        to="/auth"
      >
        Authenticate
      </NavLink>
    </Menu>
  );
};
