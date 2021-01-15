import * as React from "react";
import { hot } from "react-hot-loader/root";
import { Router, Switch, Route } from "react-router";
import { Home } from "app/containers/Home";


export const App = hot(({ history }: any) => (
  <Router history={history}>
    <Switch>
      {/* Signup / Login Paths */}
      <Route path="" component={Home}/>
    </Switch>

  </Router>
));
