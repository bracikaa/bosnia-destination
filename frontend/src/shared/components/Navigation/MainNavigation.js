import React from "react";
import { NavigationElements, MyProvider } from "./NavigationElements";
import MainHeader from "./MainHeader";
import "./MainNavigation.css";

const MainNavigation = (props) => {
  return (
    <MainHeader>
      <div id="outer-container">
        <MyProvider>
          <NavigationElements></NavigationElements>
        </MyProvider>
      </div>
    </MainHeader>
  );
};

export default MainNavigation;
