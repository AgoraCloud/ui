import * as React from 'react';
import { BaseDialog } from 'app/components/dialogs';
import { observer } from 'mobx-react';
import { events, eventTypes } from 'app/constants';
import { DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { PermissionsForm, RolesForm } from '../forms/permissions';
import { CancelCreateButtons } from 'app/components/inputs';
import { PermissionsDialogModel } from 'app/workspace/user/models/dialog';

export const PermissionsDialog = observer(
  (props: { dialog: PermissionsDialogModel }) => {
    const { dialog } = props;
    const { user } = dialog;
    if (!user) return null;
    const form = user.permissions.form;
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
              if (await form.submit()) {
                dialog.onClose();
                events.emit(eventTypes.USER_CRUD, 'edited permissions');
              } else events.emit(eventTypes.USER_ERR, 'error');
            }}
          />
        </DialogActions>
      </BaseDialog>
    );
  },
);
