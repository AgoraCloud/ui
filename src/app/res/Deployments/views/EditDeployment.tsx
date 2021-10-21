import { WorkspaceWrapper } from 'app/components/Wrapper';
import { useStores } from 'app/stores';
import * as React from 'react';
import { EditDeploymentForm } from './forms';

export const EditDeployment = (props) => {
  const {workspacesstore, uistore} = useStores()
  const deployment = workspacesstore.selectedDeployment
  const form = deployment?.forms.edit

  return <WorkspaceWrapper>
    <EditDeploymentForm form={form} />
    {/* <AddFAB link={`${workspaces.workspaceUrl}/new`} /> */}
  </WorkspaceWrapper>;
};


