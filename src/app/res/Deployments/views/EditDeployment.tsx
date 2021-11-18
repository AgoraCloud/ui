import { WorkspaceWrapper } from 'app/components/Wrapper';
import { useStores } from 'app/stores';
import * as React from 'react';

import {
  Input,
  CancelCreateButtons,
  CPUMemoryInput,
  Label,
} from 'app/components/inputs';
import { Typography } from '@material-ui/core';
import { observer } from 'mobx-react';

import { Form } from '@mars-man/components';
import { ImageSelect } from './ImageSelect';
import {
  EditDeploymentFormModel,
  ScalingMethodSelect,
} from 'app/res/Deployments';

export const EditDeployment = (props) => {
  const { workspacesstore, uistore } = useStores();
  const deployment = workspacesstore.selectedDeployment;
  const form = deployment?.forms.edit;

  return (
    <WorkspaceWrapper>
      <EditDeploymentForm form={form} />
      {/* <AddFAB link={`${workspaces.workspaceUrl}/new`} /> */}
    </WorkspaceWrapper>
  );
};

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
        <ImageSelect
          form={form}
          workspace={form.deployment.workspace}
          disableImage={true}
        />
        <CPUMemoryInput form={form} />
        <CancelCreateButtons
          form={form}
          cancel={() => {
            // routerstore.goBack();
            routerstore.push(form.deployment.workspace.link);
          }}
          submit={async () => {
            await form.call();
          }}
          labels={['Cancel', 'Update']}
        />
      </Form>
    );
  },
);
