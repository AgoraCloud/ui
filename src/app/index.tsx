/**
 * THIRD PARTY IMPORTS
 */
import * as React from 'react';
import { Router, Switch } from 'react-router';

import {
  AuthedRoute,
  NewWorkspaceRoute,
  UnauthedRoute,
  WorkspacesLoaded,
} from 'app/components/RouteGuards';

/**
 * DEPLOYMENT IMPORTS
 */
import {
  DeploymentInfoPage,
  DeploymentProxy,
  CreateDeployment,
  EditDeployment,
} from 'app/res/Deployments';

/**
 * WORKSPACE IMPORTS
 */
import {
  WorkspaceHome,
  UpdateWorkspace,
  WorkspaceMetricsPage,
  NewWorkspace,
  WorkspaceRedirect,
} from 'app/res/Workspaces';

/**
 * WORKSPACE ADMIN IMPORTS
 */

import { WorkspaceAdminRoutes } from 'app/res/Workspaces/Admin/routes';

/**
 * SUPER ADMIN IMPORTS
 */
import { AdminRoutes } from 'app/res/Admin';

/**
 * AUTH IMPORTS
 */
import {
  ChangePassword,
  ForgotPassword,
  Signup,
  UserProfile,
  VerifyAccount,
  Logout,
  Login,
} from 'app/res/Auth';

/**
 * WIKI IMPORTS
 */
import { WikiRoutes } from 'app/res/Wiki';
/**
 * ProjectsImport
 */
import {
  ProjectListPage,
  CreateProjectPage,
  EditProjectPage,
  KanbanPage,
} from 'app/res/Projects';

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

        {/* workspace paths */}
        <AuthedRoute path="/logout" component={Logout} />

        <NewWorkspaceRoute path="/w/new" component={NewWorkspace} />
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
        <WorkspacesLoaded path="/w/:wid/p/:pid/lanes" component={KanbanPage} />
        <WorkspacesLoaded
          path="/w/:wid/p/:pid/edit"
          component={EditProjectPage}
        />
        <WorkspacesLoaded path="/w/:wid/p/new" component={CreateProjectPage} />
        <WorkspacesLoaded path="/w/:wid/p" exact component={ProjectListPage} />
        <WorkspacesLoaded path="/w/:wid/edit" component={UpdateWorkspace} />
        <WorkspacesLoaded
          path="/w/:wid/d/:did/info"
          component={DeploymentInfoPage}
        />
        <WorkspacesLoaded
          path="/w/:wid/d/:did/edit"
          component={EditDeployment}
        />
        <WorkspacesLoaded path="/w/:wid/d/:did/" component={DeploymentProxy} />
        <WorkspacesLoaded path="/w/:wid" component={WorkspaceHome} />
        <AuthedRoute path="/admin" component={AdminRoutes} />
        <WorkspacesLoaded path="/edit-profile" component={UserProfile} />
        <WorkspacesLoaded path="/" component={WorkspaceRedirect} />
      </Switch>
    </Router>
  );
};
