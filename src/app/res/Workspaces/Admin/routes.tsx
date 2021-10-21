import * as React from 'react';
import { WorkspaceWrapper } from 'app/components/Wrapper';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router';
import { WorkspaceAdminUsersPage } from '.';
import { WorkspaceAdminHomePage } from '.';

const path = '/w/:wid/admin/';

export const WorkspaceAdminRoutes = () => {
    return (
        <WorkspaceWrapper>
            {/* <Provider {...rootStore.adminStores}> */}
            <Switch>
                <Route path={`${path}users`} component={WorkspaceAdminUsersPage} />
                <Route path={`${path}`} component={WorkspaceAdminHomePage} />
            </Switch>
            {/* </Provider> */}
        </WorkspaceWrapper>
    );
};
