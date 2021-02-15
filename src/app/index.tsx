import * as React from "react";
import { hot } from "react-hot-loader/root";
import { Router, Switch } from "react-router";
import { Home } from "app/containers/Home";
import { AuthedRoute, UnauthedRoute } from "app/components/RouteGuards/Auth";
import { Login, Signup, ForgotPassword, VerifyAccount, ChangePassword } from "app/containers/Auth";
import { FirstWorkspaceRedirect } from "./components/Redirects";


// http://localhost:3000/verify-account?token=60142f350efcef0018872610

export const App = hot(({ history }: any) => (
  <Router history={history}>
    <Switch>
      {/* Signup / Login Paths */}
      <UnauthedRoute path="/login" component={Login}/>
      <UnauthedRoute path="/signup" component={Signup}/>
      <UnauthedRoute path="/forgotPassword" component={ForgotPassword}/>
      <UnauthedRoute path="/verify-account" component={VerifyAccount}/>
      <UnauthedRoute path="/change-password" component={ChangePassword}/>
      <AuthedRoute path="/w/:wid" component={Home}/>
      <AuthedRoute path="" component={FirstWorkspaceRedirect}/>
    </Switch>
  </Router>
));
