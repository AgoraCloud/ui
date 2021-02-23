import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { WORKSPACES_STORE } from 'app/constants'
import { WorkspacesStore } from 'app/stores';

import { makeStyles } from '@material-ui/core/styles';

// form dialogue 
import Button from '@material-ui/core/Button';
import { Input } from 'app/components/Inputs';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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
    subtitle: {
        margin: theme.spacing(1, 0, 1, 0),
        color: "inherit",
        variant: "subtitle1",
    }
}));

export const CreateWorkspaceDialog = inject(WORKSPACES_STORE)(observer((props: {
    open: boolean
    closeDialog: ()=>any
}) => {
    const store = props[WORKSPACES_STORE] as WorkspacesStore
    const form = store.createWorkspaceForm
    const classes = useStyles();
    const {open, closeDialog} = props
    const handleFormSubmission = async () => {
        const success = await store.createWorkspace()
        success && closeDialog()
    }

    // console.log("Check this out")
    // console.log(form)
    return <Dialog open={open} onClose={closeDialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create Workspace</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Please fill out the form below and press 'Create' to create a workspace.
            </DialogContentText>
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
            <Typography className={classes.subtitle} >Resources (optional)</Typography>
            <DialogContentText>
               Specify the maximum amount of resources the workspace can use:
            </DialogContentText>
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
        </DialogContent>
        <DialogActions>
            <Button onClick={closeDialog} color="primary">
            Cancel
            </Button>
            <Button onClick={handleFormSubmission} disabled={!form.isValid} color="primary">
            Create
            </Button>
        </DialogActions>
    </Dialog>
}))