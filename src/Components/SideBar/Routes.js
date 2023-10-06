import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Auth from "../Authentication/Auth";
import Welcome from "../WelcomeScreen/Welcome";
import ComposeMail from "../ChatBox/ComposeMail";
import { useSelector } from "react-redux";
import Inbox from "../ChatBox/Inbox";
import Sent from "../ChatBox/Sent";
import EntireMsg from "../ChatBox/EntireMsg";
import SentMsgDetails from "../ChatBox/SentMsgDetails";

const Routes = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <div>
      <Switch>
        <Route path="/welcome">
          {isLoggedIn && <Welcome />}
          {!isLoggedIn && <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          <Auth />
        </Route>
        <Route path="/send-mail">
          {isLoggedIn && <ComposeMail />}{" "}
          {!isLoggedIn && <Redirect to="/login" />}
        </Route>
        <Route path="/sent-box/:messageName">
          {isLoggedIn && <SentMsgDetails />} {!isLoggedIn && <Redirect to="/login" />}
        </Route>
        <Route path="/sent-box">
          {isLoggedIn && <Sent />} {!isLoggedIn && <Redirect to="/login" />}
        </Route>
        <Route path="/inbox/:messageName">
          {isLoggedIn ? <EntireMsg /> : <Redirect to="/login" />}
        </Route>
        <Route path="/inbox">
          {isLoggedIn && <Inbox />} {!isLoggedIn && <Redirect to="/login" />}
        </Route>
        <Route path="/">
          {isLoggedIn ? <Redirect to="/welcome" /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </div>
  );
};

export default Routes;
