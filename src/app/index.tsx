import * as React from "react";
import { hot } from "react-hot-loader/root";
import { Router, Switch, Route } from "react-router";
import { Home } from "app/containers/Home";
import { AuthedRoute, UnauthedRoute } from "app/components/RouteGuards/Auth";
import { Login, Signup} from "app/containers/Auth";


export const App = hot(({ history }: any) => (
  <Router history={history}>
    <Switch>
      {/* Signup / Login Paths */}
      <UnauthedRoute path="/login" component={Login}/>
      <UnauthedRoute path="/signup" component={Signup}/>
      <AuthedRoute path="" component={Home}/>
    </Switch>

  </Router>
));
