import * as React from 'react';
import { HomeWrapper } from 'app/components/Wrapper';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router';
import { AdminHomePage, AdminUsersPage } from '.';

const path = '/admin/';

export const AdminRoutes = () => {
  return (
    <HomeWrapper>
      <Switch>
        <Route path={`${path}users`} component={AdminUsersPage} />
        <Route path={`${path}`} component={AdminHomePage} />
      </Switch>
    </HomeWrapper>
  );
};
