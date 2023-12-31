import React from "react";
import { useDispatch } from "react-redux";
import { authAction } from "../../Store/AuthReducer";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const logoutHandler = () => {
    dispatch(authAction.logout());
    localStorage.removeItem("idToken");
    localStorage.removeItem("email");
    history.replace("/login");
  };
  return (
    <button
      onClick={logoutHandler}
      style={{
        border: "none",
        background: "none",
        color: "white",
        fontSize: "1.1rem",
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      Logout
    </button>
  );
};

export default Logout;
