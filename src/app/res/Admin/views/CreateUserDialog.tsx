import * as React from 'react';
import { BaseDialog } from 'app/components/dialogs';
import { observer } from 'mobx-react';
import { events, eventTypes } from 'app/constants';
import { useStores } from 'app/stores';
import { DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { Input, Label, CancelCreateButtons } from 'app/components/inputs';

export const CreateUserDialog = observer((props) => {
  const { adminstore } = useStores();
  const { createUserDialog } = adminstore;
  const form = adminstore.createUserForm;
  return (
    <BaseDialog dialog={createUserDialog}>
      <DialogTitle>Create User</DialogTitle>
      <DialogContent>
        <Label>Full Name</Label>
        <Input form={form} id="fullName" />
        <Label>Email</Label>
        <Input form={form} id="email" />
        <Label>Password</Label>
        <Input form={form} id="password" type="password" />
      </DialogContent>
      <DialogActions>
        <CancelCreateButtons
          form={form}
          cancel={() => {
            createUserDialog.onClose();
          }}
          submit={async () => {
            await form.call();
            createUserDialog.onClose();
          }}
          labels={['Cancel', 'Create']}
        />
      </DialogActions>
    </BaseDialog>
  );
});
