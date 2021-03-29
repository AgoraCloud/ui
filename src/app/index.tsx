import * as React from "react";
import { hot } from "react-hot-loader/root";
import { Router, Switch } from "react-router";
import { Home } from "app/containers/Home";
import { AuthedRoute, UnauthedRoute } from "app/components/RouteGuards/Auth";
import { Login, Signup, ForgotPassword, VerifyAccount, ChangePassword } from "app/containers/Auth";
import { UpdateWorkspace } from "./containers/Home/UpdateWorkspace";
import { UserProfile } from "./containers/Home/UserProfile";
import { ProjectList } from "./containers/Home/Projects"
import { UserLoaded } from "app/components/RouteGuards/User";
import { FirstWorkspaceRedirect } from "app/components/Redirects";
import { FirstWorkspace } from "app/containers/Home/FirstWorkspace";
import { CreateDeployment, EditDeployment } from "app/containers/Home/Deployments/CreateDeployment";
import { CreateProject, EditProject } from "app/containers/Home/Projects/CreateProject";
import { Lanes } from "app/containers/Home/Projects/Lanes";
import { WorkspacesLoaded, DeploymentLoaded, ProjectLoaded } from "app/components/RouteGuards/Workspaces";
import { WikiRoutes } from "app/containers/Home/Wiki";
import { DeploymentProxy } from "app/containers/Home/Deployments/Proxy";
import { DeploymentInfoPage } from "./containers/Home/Deployments/Info";
import { WorkspaceMetricsPage } from "./containers/Home/WorkspaceMetrics"
import { AdminRoutes } from "./containers/Admin";


// http://localhost:3000/verify-account?token=60142f350efcef0018872610

export const App = hot(({ history }: any) => (
  <Router history={history}>
    <Switch>
      {/* Signup / Login Paths */}
      <UnauthedRoute path="/login" component={Login} />
      <UnauthedRoute path="/signup" component={Signup} />
      <UnauthedRoute path="/forgotPassword" component={ForgotPassword} />
      <UnauthedRoute path="/verify-account" component={VerifyAccount} />
      <UnauthedRoute path="/change-password" component={ChangePassword} />
      <AuthedRoute path="/w/new" component={FirstWorkspace} />
      <WorkspacesLoaded path="/w/:wid/new" component={CreateDeployment} />
      <WorkspacesLoaded path="/w/:wid/wiki" component={WikiRoutes} />
      <WorkspacesLoaded path="/w/:wid/metrics" component={WorkspaceMetricsPage} />
      <ProjectLoaded path="/w/:wid/projects" component={ProjectList} />
      <ProjectLoaded path="/w/:wid/p/new" component={CreateProject} />
      <ProjectLoaded path="/w/:wid/p/:pid/edit" component={EditProject} />
      <ProjectLoaded path="/w/:wid/p/:pid/lanes" component={Lanes} />
      <ProjectLoaded path="/w/:wid/p/:pid/l/new" component={null} />
      <ProjectLoaded path="/w/:wid/p/:pid/l/:lid/edit" component={null} />
      <WorkspacesLoaded path="/w/:wid/edit-workspace" component={UpdateWorkspace} />
      <DeploymentLoaded path="/w/:wid/d/:did/info" component={DeploymentInfoPage}/>
      <DeploymentLoaded path="/w/:wid/d/:did/edit" component={EditDeployment} />
      <DeploymentLoaded path="/w/:wid/d/:did/" component={DeploymentProxy} />
      <WorkspacesLoaded path="/w/:wid" component={Home} />
      <AuthedRoute path="/admin" component={AdminRoutes} />
      <UserLoaded path="/edit-profile" component={UserProfile} />
      <AuthedRoute path="" component={FirstWorkspaceRedirect} />
    </Switch>
  </Router>
));
