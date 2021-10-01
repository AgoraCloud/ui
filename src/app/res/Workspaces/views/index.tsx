import * as React from 'react'
import { DeploymentsList } from 'app/res/Deployments/views/List';
import { HomeWrapper } from 'app/components/HomeWrappper';
import { useStores } from 'app/stores/use-store';
import {
  CreateDeploymentForm,
  EditDeploymentForm,
} from 'app/res/Workspaces/views/forms';
import { Typography } from '@material-ui/core';
import { observer } from 'mobx-react';
import { AddFAB } from 'app/components/inputs';

export const WorkspaceHome = () => {
  const { workspacesstore } = useStores()
  const workspaces = workspacesstore.newWorkspaces

  const selectedWorkspace = workspaces.selectedWorkspace
  return (
    <HomeWrapper>
      <DeploymentsList workspace={selectedWorkspace} />
      <AddFAB link={`${workspaces.workspaceUrl}/new`}/>
    </HomeWrapper>
  );
};




export const CreateDeployment = observer((props) => {
  const { workspacesstore } = useStores()
  const selectedWorkspace = workspacesstore.newWorkspaces.selectedWorkspace
  const form = selectedWorkspace.forms.createDeployment
  return (
    <HomeWrapper>
      <Typography variant="h4">Create Deployment</Typography>
      <CreateDeploymentForm form={form} />
    </HomeWrapper>
  );
})

// export const EditDeployment = observer((props) => {
//   const { workspacesstore } = useStores()
//   const selectedWorkspace = workspacesstore.selectedWorkspace
//   const form = selectedWorkspace.createDeploymentForm
//   if (!form) return null; // TODO figure out what to do here (no deployment by id...)
//   return (
//     <HomeWrapper>
//       <Typography variant="h4">Edit Deployment</Typography>
//       <EditDeploymentForm form={form} />
//     </HomeWrapper>
//   );
// });
