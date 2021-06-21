import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { WorkspacesStore, WorkspaceAdminStore } from 'app/stores';
import { WORKSPACES_STORE } from 'app/constants';
import { Typography } from '@material-ui/core';
import { PaginatedTable } from 'app/components/table';
import { MoreMenu, AddFABBase } from 'app/components/inputs';
import { PermissionsDialog } from 'app/components/dialogs';
import { InviteUserDialog } from 'app/components/dialogs/invite-user';

const columns = [
  {
    id: 'fullName',
    label: 'Full Name',
  },
  {
    id: 'email',
    label: 'Email',
  },
  {
    id: 'menu',
    label: '',
    align: 'right',
    minWidth: 50,
  },
];

export const UsersTable = observer(
  (props: { adminStore: WorkspaceAdminStore }) => {
    const { adminStore } = props;
    const { permissionsDialog } = adminStore;
    const { users } = adminStore;
    if (users.state !== 'loaded') return null;
    const rows = users.users.map((user) => {
      return {
        email: user.email,
        fullName: user.fullName,
        menu: (
          <MoreMenu
            options={[
              {
                name: 'Remove',
                onClick: () => {
                  user.onRemove();
                },
              },
              {
                name: 'Permissions',
                onClick: () => {
                  // TODO: open permissions dialog
                  permissionsDialog.setUserAndOpen(user);
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
  },
);

export const WorkspaceAdminUsersPage = inject(WORKSPACES_STORE)(
  observer((props) => {
    const store = props[WORKSPACES_STORE] as WorkspacesStore;
    const workspace = store.selectedWorkspace;
    const workspaceAdminStore = workspace.workspaceAdminStore;
    return (
      <div>
        <UsersTable adminStore={workspaceAdminStore} />
        <PermissionsDialog dialog={workspaceAdminStore.permissionsDialog} />
        <InviteUserDialog
          form={workspaceAdminStore.inviteUserForm}
          dialog={workspaceAdminStore.inviteUserDialog}
        />
        <AddFABBase onClick={workspaceAdminStore.inviteUserDialog.onOpen} />
      </div>
    );
  }),
);
