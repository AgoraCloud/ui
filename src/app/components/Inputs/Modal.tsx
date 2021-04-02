import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { WORKSPACES_STORE } from 'app/constants'
import { WorkspacesStore } from 'app/stores'
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import { Input } from 'app/components/Inputs'

export const CreateLaneDialog = inject(WORKSPACES_STORE)(observer((props) => {
  const store = props[WORKSPACES_STORE] as WorkspacesStore
  const project = store.selectedProject

  if(!project) return null

  const form = project.createLaneForm
  const name = form.data.name
  // console.log("Thissssssssssss is the name")
  // console.log(name)
  // console.log("THISSSSS IS THE FORM ERROR:")
  // console.log(form.getError("name"))
return (
  <div>
    <Dialog open={props.isOpen} onClose={props.close} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Create Lane</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter the information below and then click the 'Create' button below!
        </DialogContentText>

        <Typography variant="subtitle1">
          Lane Name
        </Typography>
        <Input form={form} id="name" label="Name" />
        {/* <TextField
            onChange={form.onInputChange("name")}
            error={form.getError("name") != undefined}
            helperText={form.getError("name") != undefined ? form.getError("name") : undefined} // to be implemented (currently all errors are just 'error')
            defaultValue={name}
            variant="outlined"
            margin="normal"
            fullWidth
            id="name"
            label="Lane Name"
            name="name"
        /> */}

      </DialogContent>
      <DialogActions>
        <Button onClick={() => {
          props.close()
          form.reset()
        }} color="primary">
          Cancel
        </Button>
        <Button onClick={async() => {
            props.close()
            await form.submit()
            form.reset()
            }} color="primary" disabled={!form.isValid}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);
}))

export const EditLaneDialog = inject(WORKSPACES_STORE)(observer((props) => {
    const store = props[WORKSPACES_STORE] as WorkspacesStore
    const project = store.selectedProject

    if(!project) return null

    const lane = project.lanes.getById(props.columnId)!
    const form = lane.form
    const name = form.data.name
    // console.log("Thissssssssssss is the name")
    // console.log(name)
    
  return (
    <div>
      <Dialog open={props.isOpen} onClose={props.close} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Lane</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Modify the information below and then click the 'Save' button below!
          </DialogContentText>

          <Typography variant="subtitle1">
            Lane Name
          </Typography>
          <Input form={form} id="name" label="Name" />
          {/* <TextField
            onChange={form.onInputChange("name")}
            error={form.getError("name") != undefined}
            helperText={form.getError("name") != undefined ? form.getError("name") : undefined} // to be implemented (currently all errors are just 'error')
            defaultValue={name}
            variant="outlined"
            margin="normal"
            fullWidth
            id="name"
            label="Lane Name"
            name="name"
        /> */}

        </DialogContent>
        <DialogActions>
          <Button onClick={props.close} color="primary">
            Cancel
          </Button>
          <Button onClick={async() => {
              props.close()
              await form.submit()
              }} color="primary" disabled={!form.isValid}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}))