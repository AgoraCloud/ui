import * as React from 'react';
import { observer } from 'mobx-react';
import { useStores } from 'app/stores';
import { Typography } from '@material-ui/core';
import { PaginatedTable, Column, Row } from 'app/components/table';
import { MoreMenu, AddFABBase } from 'app/components/inputs';
import {
  PermissionsDialog,
  AdminPermissionsDialogModel,
} from 'app/components/dialogs';
import { EditUserDialog, CreateUserDialog } from '.';

const columns: Column[] = [
  {
    id: 'fullName',
    label: 'Full Name',
  },
  {
    id: 'email',
    label: 'Email',
  },
  {
    id: 'id',
    label: 'User ID',
  },
  {
    id: 'isEnabled',
    label: 'Enabled',
  },
  {
    id: 'isVerified',
    label: 'Verified',
  },
  {
    id: 'menu',
    label: '',
    align: 'right',
    minWidth: 50,
  },
];

export const UsersTable = observer(() => {
  const { adminstore, uistore } = useStores();
  const { users } = adminstore;
  if (users.state !== 'loaded') return null;
  const rows: any = users.map((user): Row => {
    return {
      email: user.email,
      fullName: user.fullName,
      id: user.id,
      isEnabled: user.isEnabled ? 'True' : 'False',
      isVerified: user.isVerified ? 'True' : 'False',
      menu: (
        <MoreMenu
          options={[
            {
              name: 'Delete',
              onClick: () => {
                // user.onDelete();
                uistore.setDeleteTarget(user.fullName, user.onDelete)
              },
            },
            {
              name: 'Edit',
              onClick: () => {
                // rootStore.routerStore.push(`/admin/users/${user.id}/edit`)
                adminstore.editUserDialog.setUserAndOpen(user);
              },
            },
            {
              name: user.isEnabled ? 'Disable' : 'Enable',
              onClick: () => {
                user.onFlipDisable();
              },
            },
            {
              name: user.isVerified ? 'Unverify' : 'Verify',
              onClick: () => {
                user.onFlipVerify();
              },
            },
            {
              name: 'Reset Password',
              onClick: () => {
                user.onResetPassword();
              },
            },
            {
              name: 'Permissions',
              onClick: () => {
                // TODO: open permissions dialog
                AdminPermissionsDialogModel.setUserAndOpen(user);
              },
            },
          ]}
        />
      ),
    };
  });
  return (
    <>
      <Typography variant="h4">Users</Typography>
      <PaginatedTable columns={columns} rows={rows} />
    </>
  );
});

export const AdminUsersPage = observer((props) => {
  const { adminstore } = useStores();
  return (
    <div>
      <UsersTable />
      <PermissionsDialog dialog={AdminPermissionsDialogModel} />
      <EditUserDialog />
      <CreateUserDialog />
      <AddFABBase onClick={adminstore.createUserDialog.onOpen} />
    </div>
  );
});
