import * as React from 'react';
import { Switch, Route } from 'react-router';
import { WikiLoaded } from 'app/components/RouteGuards';
import { WorkspaceWrapper } from 'app/components/Wrapper';
import { WikiList, WikiPage, WikiPages, WikiSections } from 'app/res/Wiki';

const path = `/w/:wid/wiki/`;
export const WikiRoutes = () => {
  return (
    <WorkspaceWrapper>
      <WikiList />
      <Switch>
        <WikiLoaded
          path={`${path}:sectionId/pages/:pageId/`}
          component={WikiPage}
        />
        {/* <Route path={`${path}/:sectionId/pages/new`} component={WikiCreatePage} /> */}
        <Route path={`${path}:sectionId/pages`} component={WikiPages} />
        {/* <Route path={`${path}/new`} component={WikiCreateSection} /> */}
        <Route path={`${path}`} component={WikiSections} />
      </Switch>
    </WorkspaceWrapper>
  );
};
