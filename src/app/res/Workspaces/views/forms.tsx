import * as React from 'react';
import { CreateDeploymentFormModel } from 'app/res/Workspaces/forms';
import {
  Input,
  ResourcesInput,
  CancelCreateButtons,
  Label,
} from 'app/components/inputs';
import { Typography } from '@material-ui/core';
import { observer } from 'mobx-react';

import { ImageSelect } from 'app/res/Deployments/views/ImageSelect';
import { useStores } from 'app/stores';
import { Form } from '@mars-man/components';

export const CreateDeploymentForm = observer(
  (props: { form: CreateDeploymentFormModel }) => {
    const { routerstore } = useStores();
    const { form } = props;

    const workspace = form.workspace;

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
