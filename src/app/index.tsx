import * as React from "react";
import { hot } from "react-hot-loader/root";
import { Router, Switch } from "react-router";
import { Home } from "app/containers/Home";
import { AuthedRoute, UnauthedRoute } from "app/components/RouteGuards/Auth";
import { Login, Signup, ForgotPassword, VerifyAccount, ChangePassword } from "app/containers/Auth";
import { FirstWorkspaceRedirect } from "./components/Redirects";
import { FirstWorkspace } from "./containers/Home/FirstWorkspace";
import { CreateDeployment } from "./containers/Home/Deployments/CreateDeployment";
import { WorkspacesLoaded } from "./components/RouteGuards/Workspaces";
import { WikiRoutes } from "./containers/Home/Wiki";


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
      <WorkspacesLoaded path="/w/new" component={FirstWorkspace}/>
      <WorkspacesLoaded path="/w/:wid/new" component={CreateDeployment}/>
      <WorkspacesLoaded path="/w/:wid/wiki" component={WikiRoutes}/>
      <WorkspacesLoaded path="/w/:wid/tasks" component={WikiRoutes}/>
      <WorkspacesLoaded path="/w/:wid" component={Home}/>
      <AuthedRoute path="" component={FirstWorkspaceRedirect}/>
    </Switch>
  </Router>
));
