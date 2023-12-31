import React from "react";
import { Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";
import { useSelector } from "react-redux";
import Logout from "../Authentication/Logout";
import { BsPlusCircle } from "react-icons/bs";

const Header = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const unreadMsgCount = useSelector(
    (state) => state.composeMail.unreadMsgCount
  );
  const totalMsgInSent = useSelector((state) => state.composeMail.totalMsg);

  return (
    <Container className={classes.navContainer}>
      <Nav className={classes.navItem}>
        {isLoggedIn && (
          <NavLink to="/send-mail">
            <BsPlusCircle
              title="Compose mail"
              style={{ fontSize: "2rem", marginBottom: "10px" }}
            />
          </NavLink>
        )}
        {isLoggedIn && (
          <div className={classes.row}>
            <NavLink to="/welcome">Home</NavLink>
          </div>
        )}
        {isLoggedIn && (
          <div className={classes.row}>
            <NavLink to="/inbox">Inbox {unreadMsgCount}</NavLink>
          </div>
        )}
        {isLoggedIn && (
          <div className={classes.row}>
            <NavLink to="/sent-box">Sent {totalMsgInSent}</NavLink>
          </div>
        )}
        {!isLoggedIn && (
          <div className={classes.row}>
            <NavLink to="/login">Login</NavLink>
          </div>
        )}
        {isLoggedIn && (
          <div className={classes.row}>
            <Logout />
          </div>
        )}
      </Nav>
    </Container>
  );
};

export default Header;
