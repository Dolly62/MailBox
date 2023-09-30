import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Auth from "../Authentication/Auth";
import Welcome from "../WelcomeScreen/Welcome";
import ComposeMail from "../ChatBox/ComposeMail";
import { useSelector } from "react-redux";

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
      </Switch>
    </div>
  );
};

export default Routes;
