import * as React from 'react';

import { Typography } from '@material-ui/core';
import { WorkspaceWrapper } from 'app/components/Wrapper';
import { useStores } from 'app/stores';
import { observer } from 'mobx-react';
import {
  CreateDeploymentFormModel,
  ScalingMethodSelect,
} from 'app/res/Deployments';
import {
  Input,
  ResourcesInput,
  CancelCreateButtons,
  Label,
} from 'app/components/inputs';

import { ImageSelect } from 'app/res/Deployments/views/ImageSelect';
import { Form } from '@mars-man/components';
import { toJS } from 'mobx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  spacing: {
    paddingBottom: '5px',
  },
});

export const CreateDeployment = observer((props) => {
  const { workspacesstore } = useStores();
  const selectedWorkspace = workspacesstore.selectedWorkspace;
  if (!selectedWorkspace) return null;
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
    const classes = useStyles();
    return (
      <Form form={form}>
        <Label>Deployment Name</Label>
        <Input
          form={form}
          id="name"
          label="Deployment Name"
          autoComplete="off"
          required
        />
        <Label>Sudo Password</Label>
        <Input
          form={form}
          id="sudoPassword"
          type="password"
          label="Sudo Password"
          autoComplete="current-password"
          required
        />
        <Label>Container Image</Label>
        <p></p>
        <ImageSelect form={form} workspace={workspace} />
        <p></p>
        <Label>Scaling Method</Label>
        <p></p>
        <ScalingMethodSelect form={form} />
        <p></p>
        <Label>Resources</Label>
        <p></p>
        <Typography variant="body1">
          Specify the maximum amount of resources the deployment can use.
        </Typography>
        <ResourcesInput form={form} resourcesRequired={true} />
        <CancelCreateButtons form={form} />
      </Form>
    );
  },
);
