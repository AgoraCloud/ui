import * as React from 'react';
import { Route, Router, Switch } from 'react-router';
import { WorkspaceRedirect } from 'app/res/Workspaces/views';
import { EditDeployment } from 'app/res/Deployments/views';
import {
  AuthedRoute,
  AuthGuard,
  UnauthedRoute,
  WorkspacesLoaded,
} from 'app/components/RouteGuards';
import { DeploymentInfoPage } from 'app/res/Deployments/views';
import {
  CreateDeployment,
  WorkspaceHome,
  UpdateWorkspace,
  WorkspaceMetricsPage,
  NewWorkspace,
} from 'app/res/Workspaces';
import { DeploymentProxy } from 'app/res/Deployments/views/Proxy';
import { WorkspaceAdminRoutes } from 'app/res/Workspaces/Admin/routes';
import { AdminRoutes } from 'app/res/Admin';
import {
  ChangePassword,
  ForgotPassword,
  Signup,
  UserProfile,
  VerifyAccount,
} from 'app/res/Auth';
import { Login } from 'app/res/Auth';
import { WikiRoutes } from 'app/res/Wiki';

export const App = ({ history }: any) => {
  return (
    <Router history={history}>
      {/* <Route path="" component={()=><h1> test</h1>}/> */}
      <Switch>
        {/* Signup / Login Paths */}
        <UnauthedRoute path="/login" component={Login} />
        <UnauthedRoute path="/signup" component={Signup} />
        <UnauthedRoute path="/forgotPassword" component={ForgotPassword} />
        <UnauthedRoute path="/verify-account" component={VerifyAccount} />
        <UnauthedRoute path="/change-password" component={ChangePassword} />
      </Switch>

      {/* workspace paths */}
      <AuthGuard>
        <Switch>

          <AuthedRoute path="/w/new" component={NewWorkspace} />
          <WorkspacesLoaded path="/w/:wid/new" component={CreateDeployment} />
          <WorkspacesLoaded path="/w/:wid/wiki" component={WikiRoutes} />
          <WorkspacesLoaded
            path="/w/:wid/metrics"
            component={WorkspaceMetricsPage}
          />
          <WorkspacesLoaded
            path="/w/:wid/admin"
            component={WorkspaceAdminRoutes}
          />
          {/* Projects Path */}
          {/* <ProjectsLoaded path="/w/:wid/projects" component={ProjectList} /> */}
          {/* <ProjectsLoaded path="/w/:wid/p/new" component={CreateProject} /> */}
          {/* <ProjectsLoaded path="/w/:wid/p/:pid/edit" component={EditProject} /> */}
          {/* <LanesLoaded path="/w/:wid/p/:pid/lanes" component={Lanes} /> */}
          {/* <ProjectsLoaded path="/w/:wid/p/:pid/edit" component={EditProject} /> */}
          {/* <ProjectsLoaded path="/w/:wid/p/new" component={CreateProject} /> */}
          {/* <ProjectsLoaded path="/w/:wid/p" component={ProjectList} /> */}
          <WorkspacesLoaded path="/w/:wid/edit" component={UpdateWorkspace} />
          <WorkspacesLoaded
            path="/w/:wid/d/:did/info"
            component={DeploymentInfoPage}
          />
          <WorkspacesLoaded
            path="/w/:wid/d/:did/edit"
            component={EditDeployment}
          />
          <WorkspacesLoaded
            path="/w/:wid/d/:did/"
            component={DeploymentProxy}
          />
          <WorkspacesLoaded path="/w/:wid" component={WorkspaceHome} />
          <AuthedRoute path="/admin" component={AdminRoutes} />
          <WorkspacesLoaded path="/edit-profile" component={UserProfile} />
          <WorkspacesLoaded path="/" component={WorkspaceRedirect} />
        </Switch>
      </AuthGuard>
    </Router>
  );
};
