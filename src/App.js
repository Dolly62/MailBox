import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import SideBar from "./Components/SideBar/SideBar";
import { useEffect } from "react";
import { fetchMailData } from "./Store/mailActionCreator";
import { mailActions } from "./Store/ComposeMails";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchMailData());
    } else {
      dispatch(mailActions.clearAllMails());
    }
  });

  return (
    <div id="app" className="App">
      <SideBar />
    </div>
  );
}

export default App;
