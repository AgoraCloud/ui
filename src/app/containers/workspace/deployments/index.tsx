import * as React from 'react';
import { WORKSPACES_STORE } from 'app/constants';
import { observer, inject } from 'mobx-react';
import { WorkspacesStore } from 'app/stores';
import { DeploymentCard } from 'app/components/deployment-card';
import { Grid } from '@material-ui/core';
import { AddFAB } from 'app/components/inputs';

export const DeploymentsList = inject(WORKSPACES_STORE)(
  observer((props) => {
    const store = props[WORKSPACES_STORE] as WorkspacesStore;
    const workspace = store.selectedWorkspace;
    const deployments = workspace.deployments.deployments;
    return (
      <>
        <Grid
          container
          direction={'row'}
          spacing={5}
          alignItems="flex-start"
          justify="flex-start"
        >
          {deployments.map((deployment) => (
            <Grid item key={deployment.id}>
              {/* xs={12} sm={12} md={6} lg={2} xl={4}  */}
              <DeploymentCard deployment={deployment} />
            </Grid>
          ))}
        </Grid>
        <AddFAB link={workspace.link + 'new'} />
      </>
    );
  }),
);
