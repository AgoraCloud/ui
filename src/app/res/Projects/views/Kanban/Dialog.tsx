import React from 'react';
import { inject, observer } from 'mobx-react';
import { WORKSPACES_STORE } from 'app/constants';
import { useStores, WorkspacesStore } from 'app/stores';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography } from '@material-ui/core';
import { Input } from 'app/components/inputs';
import { LaneModel, TaskModel } from 'app/res/Projects';

export const CreateLaneDialog = observer((props) => {
  const { workspacesstore } = useStores();
  const project = workspacesstore.selectedProject;

  if (!project) return null;

  const form = project.lanes.createLaneForm;

  return (
    <div>
      <Dialog
        open={props.isOpen}
        onClose={props.close}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create Lane</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the information below and then click the 'Create' button
            below!
          </DialogContentText>

          <Typography variant="subtitle1">Lane Name</Typography>
          <Input form={form} id="name" label="Name" />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.close();
              form.reset();
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={async () => {
              props.close();
              await form.call();
              form.reset();
            }}
            color="primary"
            disabled={!form.isValid}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});
export const EditLaneDialog = inject(WORKSPACES_STORE)(
  observer((props) => {
    const store = props[WORKSPACES_STORE] as WorkspacesStore;
    const project = store.selectedProject;

    if (!project) return null;

    const lane = project.lanes.getBy('id', props.columnId)[0] as LaneModel;
    const form = lane.editLaneForm;

    return (
      <div>
        <Dialog
          open={props.isOpen}
          onClose={props.close}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Lane</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Modify the information below and then click the 'Save' button
              below!
            </DialogContentText>

            <Typography variant="subtitle1">Lane Name</Typography>
            <Input form={form} id="name" label="Name" />
          </DialogContent>
          <DialogActions>
            <Button onClick={props.close} color="primary">
              Cancel
            </Button>
            <Button
              onClick={async () => {
                props.close();
                await form.call();
              }}
              color="primary"
              disabled={!form.isValid}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }),
);

export const CreateTaskDialog = observer((props) => {
  const { workspacesstore } = useStores();
  const project = workspacesstore.selectedProject;

  if (!project) return null;

  const lane = project.lanes.getBy('id', props.columnId)[0] as LaneModel;

  if (!lane) return null;

  const form = lane.tasks.createTaskForm;

  return (
    <div>
      <Dialog
        open={props.isOpen}
        onClose={props.close}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the information below and then click the 'Create' button
            below!
          </DialogContentText>

          <Typography variant="subtitle1">Title</Typography>
          <Input form={form} id="title" label="Title" />
          <Typography variant="subtitle1">Description</Typography>
          <Input
            form={form}
            id="description"
            label="Description"
            InputLabelProps={{ required: false }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.close();
              form.reset();
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={async () => {
              props.close();
              await form.call();
              form.reset();
            }}
            color="primary"
            disabled={!form.isValid}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

export const EditTaskDialog = observer(
  (props: { task: TaskModel; isOpen: boolean; close: () => void }) => {
    const task = props.task;
    const form = task.editTaskForm;

    return (
      <div>
        <Dialog
          open={props.isOpen}
          onClose={props.close}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Task</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Modify the information below and then click the 'Save' button
              below!
            </DialogContentText>

            <Typography variant="subtitle1">Title</Typography>
            <Input form={form} id="title" label="Title" />
            <Typography variant="subtitle1">Description</Typography>
            <Input
              form={form}
              id="description"
              label="Description"
              InputLabelProps={{ required: false }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={props.close} color="primary">
              Cancel
            </Button>
            <Button
              onClick={async () => {
                props.close();
                await form.call();
              }}
              color="primary"
              disabled={!form.isValid}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  },
);
