import * as React from 'react';
import { BaseDialog } from 'app/components/dialogs';
import { observer } from 'mobx-react';
import { DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { CancelCreateButtons, Input, Label } from 'app/components/inputs';
import { DialogModel } from 'app/workspace/user/models/dialog';
import { InviteUserFormModel } from 'app/workspace/user/forms/invite-user';

export const InviteUserDialog = observer(
  (props: { dialog: DialogModel; form: InviteUserFormModel }) => {
    const { dialog, form } = props;
    return (
      <BaseDialog dialog={dialog}>
        <DialogTitle>Invite User</DialogTitle>
        <DialogContent>
          <Label>User ID</Label>
          <Input form={form} id="id" />
        </DialogContent>
        <DialogActions>
          <CancelCreateButtons
            form={form}
            labels={['Cancel', 'Invite']}
            cancel={dialog.onClose}
            submit={async () => {
              await form.submit();
              dialog.onClose();
            }}
          />
        </DialogActions>
      </BaseDialog>
    );
  },
);
