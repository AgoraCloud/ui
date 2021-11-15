import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { WORKSPACES_STORE, ROUTER_STORE } from 'app/constants';
import { WorkspacesStore, RouterStore, useStores } from 'app/stores';
import { makeStyles } from '@material-ui/core/styles';

// form dialogue
import Button from '@material-ui/core/Button';
import {
  Input,
  CPUMemoryInput,
  Label,
  CancelCreateButtons,
  StorageInput,
} from 'app/components/inputs';
import { Typography } from '@material-ui/core';
import { WorkspaceModel } from '..';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1, 0, 1, 0),
  },
  description: {
    paddingTop: '10px',
    paddingBottom: '5px',
  },
}));

export const CreateWorkspaceForm = observer((props) => {
  const classes = useStyles();
  const { workspacesstore, routerstore } = useStores();
  const form = workspacesstore.workspaces.createWorkspaceForm;

  return (
    <>
      <Typography variant="h4">Create Workspace</Typography>
      <Typography variant="body1" className={classes.description}>
        Please fill out the form below and press 'Create' to create a workspace.
      </Typography>
      <Input
        autoFocus
        form={form}
        className={classes.margin}
        margin="dense"
        id="name"
        label="Workspace Name"
        type="text"
        fullWidth
      />
      <Label>Resources</Label>
      <Typography variant="body1" className={classes.description}>
        Optionally, specify the maximum amount of resources the workspace can
        use.
      </Typography>
      <CPUMemoryInput form={form} />
      <StorageInput form={form} />

      <CancelCreateButtons
        form={form}
        submit={async () => {
          await form.call();
          setTimeout(() => {
            console.log(form.submit.data.id);
            routerstore.push(`/w/${form.submit.data.id}`);
          }, 1000);
          // const workspace = (workspacesstore.workspaces.getBy('id', form.submit.data.id) as unknown) as WorkspaceModel
        }}
      />
    </>
  );
});
