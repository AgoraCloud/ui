import * as React from 'react';
import { DeploymentsList } from 'app/res/Deployments/views/List';
import { WorkspaceWrapper } from 'app/components/Wrapper';
import { useStores } from 'app/stores';
import {
  CreateDeploymentForm,
} from 'app/res/Workspaces/views/forms';
import { Typography } from '@material-ui/core';
import { observer } from 'mobx-react';
import { AddFAB } from 'app/components/inputs';


export * from './Redirect'
export * from './WorkspaceSelect'
export * from './UpdateWorkspace'
export * from './CreateWorkspace'
export * from './NewWorkspace'
export * from './Metrics'
export * from './forms'



export const WorkspaceHome = observer(() => {
  const { workspacesstore, uistore } = useStores();
  const workspaces = workspacesstore.workspaces;
  const selectedWorkspace = workspacesstore.selectedWorkspace;
  // console.log("SELECTED WORKSPACE", selectedWorkspace)
  return (
    <WorkspaceWrapper>
      <DeploymentsList workspace={selectedWorkspace} />
      <AddFAB link={`${workspaces.workspaceUrl}/new`} />
    </WorkspaceWrapper>
  );
})

export const CreateDeployment = observer((props) => {
  const { workspacesstore } = useStores();
  const selectedWorkspace = workspacesstore.selectedWorkspace;
  const form = selectedWorkspace.forms.createDeployment;
  return (
    <WorkspaceWrapper>
      <Typography variant="h4">Create Deployment</Typography>
      <CreateDeploymentForm form={form} />
    </WorkspaceWrapper>
  );
});
