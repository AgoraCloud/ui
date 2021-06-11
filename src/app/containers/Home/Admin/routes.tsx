import * as React from 'react';
import { HomeWrapper } from 'app/containers/Home';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router';
import { Provider } from 'mobx-react';
import { rootStore } from 'app/stores';
import { WorkspaceAdminUsersPage } from './Users';
import { WorkspaceAdminHomePage } from './Home';

const path = '/w/:wid/admin/';

export const WorkspaceAdminRoutes = () => {
  return (
    <HomeWrapper>
      <Provider {...rootStore.adminStores}>
        <Switch>
          <Route path={`${path}users`} component={WorkspaceAdminUsersPage} />
          <Route path={`${path}`} component={WorkspaceAdminHomePage} />
        </Switch>
      </Provider>
    </HomeWrapper>
  );
};
