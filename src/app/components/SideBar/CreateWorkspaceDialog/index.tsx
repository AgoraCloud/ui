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

// icons
import MemoryIcon from '@material-ui/icons/Memory';
import MoneyIcon from '@material-ui/icons/Money';
import StorageIcon from '@material-ui/icons/Storage';


const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1, 0, 1, 0),
    },
}));

export const CreateWorkspaceDialog = inject(WORKSPACES_STORE)(observer((props) => {
    const store = props[WORKSPACES_STORE] as WorkspacesStore
    const form = store.createWorkspaceForm
    const classes = useStyles();

    const handleFormSubmission = async () => {
        const success = await store.createWorkspace()
        success && props.closeForm()
    }

    // console.log("Check this out")
    // console.log(form)
    return <Dialog open={props.formOpen} onClose={props.closeForm} aria-labelledby="form-dialog-title">
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
                fullWidth
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={props.closeForm} color="primary">
            Cancel
            </Button>
            <Button onClick={handleFormSubmission} disabled={!form.isValid} color="primary">
            Create
            </Button>
        </DialogActions>
    </Dialog>
}))