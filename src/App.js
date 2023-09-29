import { Switch } from "react-router-dom/cjs/react-router-dom";
import "./App.css";
import Auth from "./Components/Authentication/Auth";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import Welcome from "./Components/WelcomeScreen/Welcome";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/welcome">
          <Welcome />
        </Route>
        <Route path="/login">
      <Auth />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
