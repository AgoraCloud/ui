import * as React from 'react';
import {
  CreateDeploymentFormModel,
  EditDeploymentFormModel,
} from 'app/res/Workspaces/forms';
import {
  Input,
  ResourceInput,
  CancelCreateButtons,
  CPUMemoryInput,
  Label,
} from 'app/components/inputs';
import { Typography } from '@material-ui/core';
import { inject, observer } from 'mobx-react';

import { events, eventTypes } from 'app/constants';
import { ImageSelect } from 'app/res/Deployments/views/ImageSelect';
import { useStores } from 'app/stores/use-store';

export const CreateDeploymentForm = observer(
  (props: { form: CreateDeploymentFormModel }) => {
    // const routerstore = props[ROUTER_STORE] as RouterStore;
    const { routerstore, workspacesstore } = useStores();
    const { form } = props;

    const workspace = form.workspace;

    return (
      <div>
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
        <ResourceInput form={form} />
        <CancelCreateButtons
          form={form}
          cancel={() => {
            routerstore.goBack();
            console.log(form.payload);
            // routerstore.replace(form.workspace.link);
          }}
          submit={async () => {
            console.log(form.payload);
            // if (await form.submit()) {
            //     routerstore.replace(form.workspace.link);
            //     events.emit(eventTypes.DEPLOYMENT_CRUD, 'created');
            // } else events.emit(eventTypes.DEPLOYMENT_ERR, 'error creating');
          }}
        />
      </div>
    );
  },
);

export const EditDeploymentForm = observer(
  (props: { form: EditDeploymentFormModel }) => {
    const { routerstore } = useStores();
    const { form } = props;
    return (
      <div>
        <Label>Deployment Name</Label>
        <Input form={form} id="name" label="name" autoComplete="off" />
        <Label>Resources</Label>
        <Typography variant="body1">
          Specify the maximum amount of resources the deployment can use:
        </Typography>
        <CPUMemoryInput form={form} />
        <CancelCreateButtons
          form={form}
          cancel={() => {
            routerstore.goBack();
            // routerstore.replace(form.workspace.link);
          }}
          submit={async () => {
            // if (await form.submit()) {
            // routerstore.replace(form.workspace.link);
            // events.emit(eventTypes.DEPLOYMENT_CRUD, 'updated');
            // } else events.emit(eventTypes.DEPLOYMENT_ERR, 'error updating');
          }}
          labels={['Cancel', 'Edit']}
        />
      </div>
    );
  },
);
