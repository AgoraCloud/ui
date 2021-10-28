import * as React from 'react';
import { BaseDialog } from 'app/components/dialogs';
import { observer } from 'mobx-react';
import { DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { CancelCreateButtons, Input, Label } from 'app/components/inputs';
import { DialogModel } from 'app/components/dialogs';
import { InviteUserFormModel } from 'app/res/Workspaces/Admin';

export const InviteUserDialog = observer(
  (props: { dialog: DialogModel; form: InviteUserFormModel }) => {
    const { dialog, form } = props;
    return (
      <BaseDialog dialog={dialog}>
        <DialogTitle>Invite User</DialogTitle>
        <DialogContent>
          <Label>User Email</Label>
          <Input form={form} id="email" />
        </DialogContent>
        <DialogActions>
          <CancelCreateButtons
            form={form}
            labels={['Cancel', 'Invite']}
            cancel={dialog.onClose}
            submit={async () => {
              await form.call();
              dialog.onClose();
            }}
          />
        </DialogActions>
      </BaseDialog>
    );
  },
);
