import * as React from 'react';
import { BaseDialog } from 'app/components/dialogs';
import { observer } from 'mobx-react';
import { events, eventTypes } from 'app/constants';
import { useStores } from 'app/stores';
import { DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { Input, Label, CancelCreateButtons } from 'app/components/inputs';

export const EditUserDialog = observer((props) => {
  const { adminstore } = useStores()
  const { editUserDialog } = adminstore;
  const { user } = editUserDialog;
  if (!user) return null;
  const form = user.updateUserForm;
  return (
    <BaseDialog dialog={editUserDialog}>
      <DialogTitle>Edit: {user.fullName}</DialogTitle>
      <DialogContent>
        <Label>Full Name</Label>
        <Input form={form} id="fullName" />
        <Label>Password</Label>
        <Input form={form} id="password" type="password" />
      </DialogContent>
      <DialogActions>
        <CancelCreateButtons
          form={form}
          cancel={() => {
            editUserDialog.onClose();
          }}
          submit={async () => {
            if (await form.submit()) {
              editUserDialog.onClose();
              events.emit(eventTypes.USER_CRUD.type, 'updated');
            } else events.emit(eventTypes.USER_ERR.type, 'error');
          }}
          labels={['Cancel', 'Edit']}
        />
      </DialogActions>
    </BaseDialog>
  );
})