import * as React from 'react';
import { WorkspaceModel } from 'app/res/Workspaces/models';
import { DeploymentModel, DeploymentsModel } from 'app/res/Deployments/models';
import { Grid } from '@material-ui/core';
import { DeploymentCard } from 'app/res/Deployments/views/Card';

export const DeploymentsList = ({
  workspace,
}: {
  workspace: WorkspaceModel;
}) => {
  console.log(workspace.deployments);
  return (
    <>
      <Grid
        container
        direction={'row'}
        spacing={5}
        alignItems="flex-start"
        justify="flex-start"
      >
        {workspace.deployments.map((deployment) => (
          <Grid item key={deployment.id}>
            {/* xs={12} sm={12} md={6} lg={2} xl={4}  */}
            <DeploymentCard deployment={deployment} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

// export const DeploymentCard = ({ deployment }: { deployment: DeploymentModel }) => {
//   return
// }
