import * as React from 'react';
import { DeploymentsList } from 'app/res/Deployments/views/List';
import { WorkspaceWrapper } from 'app/components/Wrapper';
import { useStores } from 'app/stores';
import { observer } from 'mobx-react';
import { AddFAB } from 'app/components/inputs';

export const WorkspaceHome = observer(() => {
    const { workspacesstore, uistore } = useStores();
    const workspaces = workspacesstore.workspaces;
    const selectedWorkspace = workspacesstore.selectedWorkspace;
    if(!selectedWorkspace) return null
    // console.log("SELECTED WORKSPACE", selectedWorkspace)
    return (
      <WorkspaceWrapper>
        <DeploymentsList workspace={selectedWorkspace} />
        <AddFAB link={`${workspaces.workspaceUrl}/new`} />
      </WorkspaceWrapper>
    );
  });
  