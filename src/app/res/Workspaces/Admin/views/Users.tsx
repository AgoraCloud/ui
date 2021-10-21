import * as React from 'react';
import { observer } from 'mobx-react';
import { useStores } from 'app/stores';
import { Typography } from '@material-ui/core';
import { PaginatedTable } from 'app/components';
import { MoreMenu, AddFABBase } from 'app/components/inputs';
import { PermissionsDialog, InviteUserDialog, WorkspaceAdminPermissionsDialogModel } from 'app/components/dialogs';
import { WorkspaceAdminModel } from 'app/res/Workspaces/Admin';

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
    (props: { workspaceAdmin: WorkspaceAdminModel }) => {
        const { workspaceAdmin } = props;
        const { permissionsDialog } = workspaceAdmin;
        const { users } = workspaceAdmin;
        if (users.state !== 'loaded') return null;
        const rows = users.map((user) => {
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
                                    WorkspaceAdminPermissionsDialogModel.setUserAndOpen(user);
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

export const WorkspaceAdminUsersPage = observer((props) => {
    const {workspacesstore} = useStores()
    const workspace = workspacesstore.selectedWorkspace;
    const workspaceAdmin = workspace.workspaceAdmin;
    return (
        <div>
            <UsersTable workspaceAdmin={workspaceAdmin} />
            <PermissionsDialog dialog={WorkspaceAdminPermissionsDialogModel} />
            <InviteUserDialog
                form={workspaceAdmin.inviteUserForm}
                dialog={workspaceAdmin.inviteUserDialog}
            />
            <AddFABBase onClick={workspaceAdmin.inviteUserDialog.onOpen} />
        </div>
    );
})