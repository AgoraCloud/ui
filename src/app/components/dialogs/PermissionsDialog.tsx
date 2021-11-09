import * as React from 'react';
import { BaseDialog, PermissionsDialogModel } from 'app/components/dialogs';
import { observer } from 'mobx-react';
import { DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { CancelCreateButtons } from 'app/components/inputs';
import { PermissionsForm, RolesForm } from 'app/res/Auth';

export const PermissionsDialog = observer(
  (props: { dialog: PermissionsDialogModel }) => {
    const { dialog } = props;
    const { user } = dialog;
    console.log('PermissionsDialog', dialog, user);
    if (!user) return null;
    const form = user.permissions.permissionsForm;
    return (
      <BaseDialog dialog={dialog}>
        <DialogTitle>Permissions: {user.fullName}</DialogTitle>
        <DialogContent>
          <RolesForm form={form} roles={dialog.roles} />
          <PermissionsForm form={form} permissions={dialog.permissions} />
        </DialogContent>
        <DialogActions>
          <CancelCreateButtons
            form={form}
            labels={['Cancel', 'Edit']}
            cancel={dialog.onClose}
            submit={async () => {
              form.call();
              // console.log(JSON.stringify(form.payload));
            }}
          />
        </DialogActions>
      </BaseDialog>
    );
  },
);
