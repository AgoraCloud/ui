import * as React from 'react';
import { Router, Switch } from 'react-router';
import { Home } from 'app/containers/workspace';
import {
  AuthedRoute,
  UnauthedRoute,
} from 'app/components/forms/route-guards/auth';
import {
  Login,
  Signup,
  ForgotPassword,
  VerifyAccount,
  ChangePassword,
} from 'app/containers/auth';
import { UpdateWorkspace } from './containers/workspace/update-workspace';
import { UserProfile } from './containers/user-profile';
import { ProjectList } from './containers/workspace/projects';
import { UserLoaded } from 'app/components/forms/route-guards/user';
import { FirstWorkspaceRedirect } from 'app/components/forms/route-guards/workspaces/redirects';
import { FirstWorkspace } from 'app/containers/workspace/first-workspace';
import {
  CreateDeployment,
  EditDeployment,
} from 'app/containers/workspace/deployments/create-deployment';
import {
  CreateProject,
  EditProject,
} from 'app/containers/workspace/projects/create-project';
import { Lanes } from 'app/containers/workspace/projects/lanes';
import {
  WorkspacesLoaded,
  DeploymentLoaded,
  ProjectsLoaded,
  LanesLoaded,
} from 'app/components/forms/route-guards/workspaces';
import { WikiRoutes } from 'app/containers/workspace/wiki';
import { DeploymentProxy } from 'app/containers/workspace/deployments/proxy';
import { DeploymentInfoPage } from './containers/workspace/deployments/info';
import { WorkspaceMetricsPage } from './containers/workspace/workspace-metrics';
import { AdminRoutes } from './containers/admin';
import { WorkspaceAdminRoutes } from './containers/workspace/admin';

// http://localhost:3000/verify-account?token=60142f350efcef0018872610

export const App = ({ history }: any) => (
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
      <WorkspacesLoaded
        path="/w/:wid/metrics"
        component={WorkspaceMetricsPage}
      />
      <WorkspacesLoaded path="/w/:wid/admin" component={WorkspaceAdminRoutes} />
      <ProjectsLoaded path="/w/:wid/projects" component={ProjectList} />
      <ProjectsLoaded path="/w/:wid/p/new" component={CreateProject} />
      <ProjectsLoaded path="/w/:wid/p/:pid/edit" component={EditProject} />
      <LanesLoaded path="/w/:wid/p/:pid/lanes" component={Lanes} />
      <ProjectsLoaded path="/w/:wid/p/:pid/edit" component={EditProject} />
      <ProjectsLoaded path="/w/:wid/p/new" component={CreateProject} />
      <ProjectsLoaded path="/w/:wid/p" component={ProjectList} />
      <WorkspacesLoaded
        path="/w/:wid/edit-workspace"
        component={UpdateWorkspace}
      />
      <DeploymentLoaded
        path="/w/:wid/d/:did/info"
        component={DeploymentInfoPage}
      />
      <DeploymentLoaded path="/w/:wid/d/:did/edit" component={EditDeployment} />
      <DeploymentLoaded path="/w/:wid/d/:did/" component={DeploymentProxy} />
      <WorkspacesLoaded path="/w/:wid" component={Home} />
      <AuthedRoute path="/admin" component={AdminRoutes} />
      <UserLoaded path="/edit-profile" component={UserProfile} />
      <AuthedRoute path="" component={FirstWorkspaceRedirect} />
    </Switch>
  </Router>
);
