import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import HooksApp from "./HooksApp";
import ClassApp from "./ClassApp";

const rootElement = document.getElementById("root");

const App = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/class">Using Class</Link>
          </li>
          <li>
            <Link to="/hooks">Using Hooks</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/class">
          <ClassApp />
        </Route>
        <Route path="/hooks">
          <HooksApp />
        </Route>
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(<App />, rootElement);
