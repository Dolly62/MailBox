
import "./App.css";

import SideBar from "./Components/SideBar/SideBar";

function App() {
  return (
    <div className="App">
      <SideBar/>
      {/* <Switch>
        <Route path="/welcome">
          <Welcome />
        </Route>
        <Route path="/login">
          <Auth />
        </Route>
        <Route path="/send-mail">
          <ComposeMail/>
        </Route>
      </Switch> */}
    </div>
  );
}

export default App;
