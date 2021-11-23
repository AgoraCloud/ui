import * as React from 'react';
import { EditDeploymentFormModel } from 'app/res/Deployments/forms';
import {
  Input,
  ResourcesInput,
  CancelCreateButtons,
  CPUMemoryInput,
  Label,
  StorageInput,
} from 'app/components/inputs';
import { Typography } from '@material-ui/core';
import { observer } from 'mobx-react';

import { useStores } from 'app/stores';
import { Form } from '@mars-man/components';
import { ImageSelect } from './ImageSelect';

export const EditDeploymentForm = observer(
  (props: { form?: EditDeploymentFormModel }) => {
    const { routerstore } = useStores();
    const { form } = props;

    if (!form) return null;
    return (
      <Form form={form}>
        <Label>Deployment Name</Label>
        <Input form={form} id="name" label="name" autoComplete="off" />
        <Label>Resources</Label>
        <Typography variant="body1">
          Specify the maximum amount of resources the deployment can use:
        </Typography>
        <Label>Container Image</Label>
        <ImageSelect form={form} workspace={form.deployment.workspace} />
        <CPUMemoryInput form={form} />
        <CancelCreateButtons
          form={form}
          cancel={() => {
            routerstore.goBack();
            // routerstore.replace(form.workspace.link);
          }}
          submit={async () => {
            await form.call();
          }}
          labels={['Cancel', 'Edit']}
        />
      </Form>
    );
  },
);
