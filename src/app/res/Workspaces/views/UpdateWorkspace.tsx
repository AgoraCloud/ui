import * as React from 'react';
import { observer } from 'mobx-react';
import { useStores } from 'app/stores';
import { Typography, Button } from '@material-ui/core';
import { Input, CPUMemoryInput, StorageInput, Label } from 'app/components/inputs';
import { WorkspaceWrapper } from 'app/components/Wrapper';

export const UpdateWorkspace = observer((props) => {
    const { workspacesstore, routerstore } = useStores()

    const workspace = workspacesstore.selectedWorkspace
    const form = workspace.updateWorkspace
    const { name } = workspace.data
    return (
        <WorkspaceWrapper>
            <Typography variant="h4">Update Workspace</Typography>
            <Label>Workspace Name</Label>
            <Input
                form={form}
                id="name"
                label="Workspace Name"
                defaultValue={name}
                autoComplete="off"
            />
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
                        // if (await workspacesstore.deleteWorkspace()) {
                        //     routerstore.replace('/');
                        // }
                    }}
                    color="secondary"
                >
                    Delete
                </Button>
            </div>
            <div style={{ float: 'right' }}>
                <Button
                    onClick={() => {
                        routerstore.replace(workspacesstore.selectedWorkspace.link);
                    }}
                    color="primary"
                >
                    Cancel
                </Button>
                <Button
                    onClick={async () => {
                        // if (await workspacesstore.updateWorkspace()) {
                        //     routerstore.replace(workspacesstore.selectedWorkspace.link);
                        // }
                    }}
                    disabled={!form.isValid}
                    color="primary"
                >
                    Save
                </Button>
            </div>
        </WorkspaceWrapper>
    );
})