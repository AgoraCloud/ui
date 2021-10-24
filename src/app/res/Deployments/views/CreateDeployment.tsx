import * as React from 'react'

import { Typography } from '@material-ui/core';
import { WorkspaceWrapper } from 'app/components/Wrapper';
import { useStores } from 'app/stores';
import { observer } from 'mobx-react';
import { CreateDeploymentFormModel } from 'app/res/Deployments';
import {
    Input,
    ResourcesInput,
    CancelCreateButtons,
    Label,
} from 'app/components/inputs';

import { ImageSelect } from 'app/res/Deployments/views/ImageSelect';
import { Form } from '@mars-man/components';


export const CreateDeployment = observer((props) => {
    const { workspacesstore } = useStores();
    const selectedWorkspace = workspacesstore.selectedWorkspace;
    if(!selectedWorkspace) return null
    const form = selectedWorkspace.deployments.createDeployment;
    return (
        <WorkspaceWrapper>
            <Typography variant="h4">Create Deployment</Typography>
            <CreateDeploymentForm form={form} />
        </WorkspaceWrapper>
    );
});




export const CreateDeploymentForm = observer(
    (props: { form: CreateDeploymentFormModel }) => {
        const { form } = props;
        const workspace = form.deployments.workspace;

        return (
            <Form form={form}>
                <Label>Deployment Name</Label>
                <Input
                    form={form}
                    id="name"
                    label="deployment name"
                    autoComplete="off"
                />
                <Label>Sudo Password</Label>
                <Input
                    form={form}
                    id="sudoPassword"
                    type="password"
                    label="Sudo Password"
                    autoComplete="current-password"
                />
                <Label>Container Image</Label>
                <ImageSelect form={form} workspace={workspace} />
                <Label>Resources</Label>
                <Typography variant="body1">
                    Specify the maximum amount of resources the deployment can use.
                </Typography>
                <ResourcesInput form={form} />
                <CancelCreateButtons form={form} />
            </Form>
        );
    },
);
