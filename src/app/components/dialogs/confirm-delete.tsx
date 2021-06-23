import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import { UI_STORE } from 'app/constants';
import { UIStore } from 'app/stores/ui-store';
import { Input } from 'app/components/inputs';
import { BaseDialog } from 'app/components/dialogs';

export const ConfirmDeleteDialog = inject(UI_STORE)(
  observer((props) => {
    const store = props[UI_STORE] as UIStore;

    const form = store.confirmDelete;
    if (!form) return null;
    const { dialog, submit, name } = form;

    return (
      <BaseDialog dialog={dialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete
            <br />
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
          <Button onClick={dialog.onClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={submit} disabled={!form.valid} color="primary">
            Delete
          </Button>
        </DialogActions>
      </BaseDialog>
    );
  }),
);
