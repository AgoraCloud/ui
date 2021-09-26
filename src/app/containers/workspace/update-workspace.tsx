import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { WORKSPACES_STORE, ROUTER_STORE } from 'app/constants';
import { WorkspacesStore, RouterStore } from 'app/stores';
import { HomeWrapper } from 'app/containers/workspace';
import { Typography, TextField, Button } from '@material-ui/core';
import { Input, CPUMemoryInput, Label } from 'app/components/inputs';

export const UpdateWorkspace = inject(
  WORKSPACES_STORE,
  ROUTER_STORE,
)(
  observer((props) => {
    const routerStore = props[ROUTER_STORE] as RouterStore;
    const workspaceStore = props[WORKSPACES_STORE] as WorkspacesStore;
    const form = workspaceStore.selectedWorkspace.updateWorkspaceForm;
    const val = workspaceStore.selectedWorkspace.workspaceData;
    return (
      <HomeWrapper>
        <Typography variant="h4">Update Workspace</Typography>
        <Label>Workspace Name</Label>
        <Input
          form={form}
          id="name"
          label="Workspace Name"
          defaultValue={val.name}
          autoComplete="off"
        />
        <Label>Resources</Label>
        <Typography variant="body1">
          Specify the maximum amount of resources the deployment can use:
        </Typography>
        <CPUMemoryInput
          form={form}
          fromWorkspace={{
            check: true,
            values: {
              cpu: val.properties.resources.cpuCount,
              ram: val.properties.resources.memoryCount,
              storage: val.properties.resources.storageCount,
            },
          }}
        />
        <div style={{ float: 'left' }}>
          <Button
            onClick={async () => {
              if (await workspaceStore.deleteWorkspace()) {
                routerStore.replace('/');
              }
            }}
            color="secondary"
          >
            Delete
          </Button>
        </div>
        <div style={{ float: 'right' }}>
          <Button
            onClick={() => {
              routerStore.replace(workspaceStore.selectedWorkspace.link);
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={async () => {
              if (await workspaceStore.updateWorkspace()) {
                routerStore.replace(workspaceStore.selectedWorkspace.link);
              }
            }}
            disabled={!form.isValid}
            color="primary"
          >
            Save
          </Button>
        </div>
      </HomeWrapper>
    );
  }),
);
