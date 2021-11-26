import * as React from 'react';
import { observer } from 'mobx-react';
import { useStores } from 'app/stores';
import { Typography, Button } from '@material-ui/core';
import {
  Input,
  CPUMemoryInput,
  StorageInput,
  Label,
  CancelCreateButtons,
} from 'app/components/inputs';
import { WorkspaceWrapper } from 'app/components/Wrapper';

export const UpdateWorkspace = observer((props) => {
  const { workspacesstore, uistore } = useStores();

  const workspace = workspacesstore.selectedWorkspace;
  if (!workspace) return null;
  const form = workspace.updateWorkspace;
  return (
    <WorkspaceWrapper>
      <Typography variant="h4">Update Workspace</Typography>
      <Input form={form} id="name" label="Workspace Name" autoComplete="off" />
      <Label>Resources</Label>
      <Typography variant="body1">
        Specify the maximum amount of resources the deployment can use:
      </Typography>
      <CPUMemoryInput
        form={form}
        // fromWorkspace={{
        //     check: true,
        //     values: {
        //         cpu: val.properties.resources.cpuCount,
        //         ram: val.properties.resources.memoryCount,
        //         storage: val.properties.resources.storageCount,
        //     },
        // }}
      />
      <StorageInput form={form} />

      <div style={{ float: 'left' }}>
        <Button
          onClick={async () => {
            uistore.setDeleteTarget(workspace.name, workspace.onDelete);
          }}
          color="secondary"
        >
          Delete
        </Button>
      </div>
      <div style={{ float: 'right' }}>
        <CancelCreateButtons
          form={form}
          labels={['Cancel', 'Edit']}
          submit={() => {
            form.call();
          }}
        />
      </div>
    </WorkspaceWrapper>
  );
});
