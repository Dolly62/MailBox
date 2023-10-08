import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Auth from "../Authentication/Auth";
import Welcome from "../WelcomeScreen/Welcome";
import { useSelector } from "react-redux";

const Routes = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const ComposeMail = React.lazy(() => import("../ChatBox/ComposeMail"));
  const SentMsgDetails = React.lazy(() => import("../ChatBox/SentMsgDetails"));
  const Sent = React.lazy(() => import("../ChatBox/Sent"));
  const EntireMsg = React.lazy(() => import("../ChatBox/EntireMsg"));
  const Inbox = React.lazy(() => import("../ChatBox/Inbox"));

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
          <React.Suspense fallback={<div>Loading...</div>}>
            {isLoggedIn && <ComposeMail />}{" "}
          </React.Suspense>
          {!isLoggedIn && <Redirect to="/login" />}
        </Route>

        <Route path="/sent-box/:messageName">
          <React.Suspense fallback={<div>Loading...</div>}>
            {isLoggedIn && <SentMsgDetails />}{" "}
          </React.Suspense>
          {!isLoggedIn && <Redirect to="/login" />}
        </Route>

        <Route path="/sent-box">
          <React.Suspense fallback={<div>Loading...</div>}>
            {isLoggedIn && <Sent />}
          </React.Suspense>{" "}
          {!isLoggedIn && <Redirect to="/login" />}
        </Route>

        <Route path="/inbox/:messageName">
          <React.Suspense fallback={<div>Loading...</div>}>
            {isLoggedIn && <EntireMsg />}
          </React.Suspense>{" "}
          {!isLoggedIn && <Redirect to="/login" />}
        </Route>

        <Route path="/inbox">
          <React.Suspense fallback={<div>Loading...</div>}>
            {isLoggedIn && <Inbox />}
          </React.Suspense>
          {!isLoggedIn && <Redirect to="/login" />}
        </Route>

        <Route path="/">
          {isLoggedIn ? <Redirect to="/welcome" /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </div>
  );
};

export default Routes;
