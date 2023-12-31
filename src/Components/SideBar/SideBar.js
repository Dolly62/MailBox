import React, { useState } from "react";
import { FcMenu } from "react-icons/fc";
import Routes from "./Routes";
import classes from "./SideBar.module.css";
import Header from "../Header/Header";


const SideBar = () => {
  const [isNav, setNav] = useState(true);
  const toggleHandler = () => {
    setNav((prevState) => !prevState);
  };
  return (
    <div className={classes.gridContainer} data-testid="sidebar">
      <div className={classes.left}>
        <FcMenu
          onClick={toggleHandler}
          style={{ fontSize: "2.3rem", cursor: "pointer" }}
        />
        {isNav && (
          <div className={classes.bottomNav}>
            <Header />
          </div>
        )}
      </div>
      <div className={classes.right}>
        <Routes />
      </div>
    </div>
  );
};

export default SideBar;
