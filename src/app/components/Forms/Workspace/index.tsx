import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { WORKSPACES_STORE, ROUTER_STORE } from 'app/constants';
import { WorkspacesStore, RouterStore } from 'app/stores';
import { makeStyles } from '@material-ui/core/styles';

// form dialogue
import Button from '@material-ui/core/Button';
import { Input } from 'app/components/Inputs';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Typography } from '@material-ui/core';

// icons
import MemoryIcon from '@material-ui/icons/Memory';
import MoneyIcon from '@material-ui/icons/Money';
import StorageIcon from '@material-ui/icons/Storage';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1, 0, 1, 0),
  },
  description: {
    paddingTop: '10px',
    paddingBottom: '5px',
  },
}));

export const CreateWorkspaceForm = inject(
  WORKSPACES_STORE,
  ROUTER_STORE,
)(
  observer((props) => {
    const routerStore = props[ROUTER_STORE] as RouterStore;
    const store = props[WORKSPACES_STORE] as WorkspacesStore;
    const wid = store.workspaces?.workspaces[0]?.id;
    const form = store.createWorkspaceForm;
    const classes = useStyles();

    return (
      <div>
        <Typography variant="h4">Create Workspace</Typography>
        <Typography variant="body1" className={classes.description}>
          Please fill out the form below and press 'Create' to create a
          workspace.
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
        <Typography variant="h6">Resources</Typography>
        <Typography variant="body1" className={classes.description}>
          Optionally, specify the maximum amount of resources the workspace can
          use.
        </Typography>
        <Input
          form={form}
          className={classes.margin}
          margin="dense"
          id="properties.resources.cpuCount"
          label="CPU"
          type="number"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MemoryIcon />
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            required: false,
          }}
          fullWidth
        />
        <Input
          form={form}
          className={classes.margin}
          margin="dense"
          id="properties.resources.memoryCount"
          label="RAM"
          type="number"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MoneyIcon />
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            required: false,
          }}
          fullWidth
        />
        <Input
          form={form}
          className={classes.margin}
          margin="dense"
          id="properties.resources.storageCount"
          label="Storage"
          type="number"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <StorageIcon />
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            required: false,
          }}
          fullWidth
        />
        {wid && (
          <Button
            onClick={() => {
              routerStore.replace('/');
            }}
            color="primary"
          >
            Cancel
          </Button>
        )}
        <Button
          onClick={async () => {
            if (await store.createWorkspace()) {
              routerStore.replace('/');
            }
          }}
          disabled={!form.isValid}
          color="primary"
        >
          Create
        </Button>
      </div>
    );
  }),
);
