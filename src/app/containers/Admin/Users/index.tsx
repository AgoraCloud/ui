import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { AdminStore } from 'app/stores'
import { ADMIN_STORE } from 'app/constants'
import { UsersModel } from 'app/models'
import { Typography } from '@material-ui/core'
import { PaginatedTable } from 'app/components/Table'
import { MoreMenu, AddFABBase } from 'app/components/Inputs'
import { PermissionsDialog, EditUserDialog, CreateUserDialog } from 'app/components/Dialogs'



const columns = [
    {
        id: 'fullName',
        label: 'Full Name'
    },
    {
        id: 'email',
        label: 'Email'
    },
    {
        id: 'id',
        label: 'User ID'
    },
    {
        id: 'isEnabled',
        label: 'Enabled'
    },
    {
        id: 'isVerified',
        label: 'Verified'
    },
    {
        id: 'menu',
        label: '',
        align: "right",
        minWidth: 50
    }
]

export const UsersTable = inject(ADMIN_STORE)(observer((props: { users: UsersModel }) => {
    const store = props[ADMIN_STORE] as AdminStore
    const { users } = props
    if (users.state !== 'loaded') return null
    const rows = users.users.map((user) => {
        return {
            email: user.email,
            fullName: user.fullName,
            id: user.id,
            isEnabled: user.isEnabled ? 'True' : 'False',
            isVerified: user.isVerified ? 'True' : 'False',
            menu: <MoreMenu options={[
                {
                    name: 'Delete',
                    onClick: () => {
                        // console.log('delete', user.fullName)
                        user.onDelete()
                    }
                },
                {
                    name: 'Edit',
                    onClick: () => {
                        // console.log('edit user', user.fullName)
                        // rootStore.routerStore.push(`/admin/users/${user.id}/edit`)
                        store.editUserDialog.setUserAndOpen(user)
                    }
                },
                {
                    name: user.isEnabled ? 'Disable' : 'Enable',
                    onClick: () => {
                        // console.log('enable', user.fullName)
                        user.onFlipDisable()
                    }
                },
                {
                    name: user.isVerified ? 'Unverify' : 'Verify',
                    onClick: () => {
                        // console.log('verify', user.fullName)
                        user.onFlipVerify()
                    }
                },
                {
                    name: 'Reset Password',
                    onClick: () => {
                        // console.log('reset password', user.fullName)
                        user.onResetPassword()
                    }
                },
                {
                    name: 'Permissions',
                    onClick: () => {
                        // TODO: open permissions dialog
                        // console.log('users permissions', user.fullName)
                        store.permissionsDialog.setUserAndOpen(user)
                    }
                }
            ]} />
        }
    })
    return <>
        <Typography variant="h4">
            Users
        </Typography>
        <PaginatedTable columns={columns} rows={rows} />
    </>
}))


export const AdminUsersPage = inject(ADMIN_STORE)(observer((props) => {
    const store = props[ADMIN_STORE] as AdminStore
    const users = store.users
    return <div>
        <UsersTable users={users} />
        <PermissionsDialog dialog={store.permissionsDialog}/>
        <EditUserDialog/>
        <CreateUserDialog/>
        <AddFABBase onClick={store.createUserDialog.onOpen}/>
    </div>
}))

