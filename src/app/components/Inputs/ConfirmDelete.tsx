import * as React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import { UI_STORE } from 'app/constants'
import { UIStore } from 'app/stores/UIStore'
import { Input } from 'app/components/Inputs'



export const ConfirmDeleteDialog = inject(UI_STORE)(observer((props) => {
    const store = props[UI_STORE] as UIStore

    const form = store.confirmDelete
    if(!form) return null
    const {open, closeDialog, submit, name} = form

    return <Dialog open={open} onClose={closeDialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Are you sure you want to delete 
                <br/>
                {name}
            </DialogContentText>
            <Input
                autoFocus
                form={form}
                error={!form.valid}
                helperText={`type ${name} to delete`}
                margin="dense"
                id="name"
                label="Confirm Delete"
                type="text"
                fullWidth
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={closeDialog} color="secondary">
                Cancel
        </Button>
            <Button onClick={submit} disabled={!form.valid} color="primary">
                Delete
            </Button>
        </DialogActions>
    </Dialog>
}))