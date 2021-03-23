import * as React from 'react'
import { HomeWrapperBase, HomeWrapper } from 'app/containers/Home'
import { Switch } from 'react-router-dom'
import { Route } from 'react-router'
import { Provider, inject, observer } from 'mobx-react'
import { rootStore, AdminStore } from 'app/stores'
import { ADMIN_STORE } from 'app/constants'
import { UsersModel } from 'app/models'
import { Typography } from '@material-ui/core'
import { PaginatedTable } from 'app/components/Table'
import { MoreMenu } from 'app/components/Inputs'



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
        align: 'right',
        minWidth: 50
    }
]

export const UsersTable = observer((props: { users: UsersModel }) => {
    const { users } = props
    if (users.state !== 'loaded') return null
    const rows = users.users.map((user) => {
        return {
            email: user.email,
            fullName: user.fullName,
            isEnabled: user.isEnabled ? 'True' : 'False',
            isVerified: user.isVerified ? 'True' : 'False',
            menu: <MoreMenu options={[
                {
                    name: 'Delete',
                    onClick: () => {
                        console.log('delete', user.fullName)
                    }
                },
                {
                    name: 'Edit',
                    onClick: () => {
                        console.log('edit user', user.fullName)
                    }
                },
                {
                    name: user.isEnabled ? 'Disable' : 'Enable',
                    onClick: () => {
                        console.log('enable', user.fullName)
                    }
                },
                {
                    name: user.isVerified ? 'Unverify' : 'Verify',
                    onClick: () => {
                        console.log('verify', user.fullName)
                    }
                },
                {
                    name: 'Reset Password',
                    onClick: () => {
                        console.log('reset password', user.fullName)
                    }
                },
                {
                    name: 'Permissions',
                    onClick: () => {
                        // TODO: open permissions dialog
                        console.log('users permissions', user.fullName)
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
})


export const AdminUsersPage = inject(ADMIN_STORE)(observer((props) => {
    const store = props[ADMIN_STORE] as AdminStore
    const users = store.users
    return <div>
        <UsersTable users={users} />
    </div>
}))

export const AdminPage = () => {
    return <div>
        admin home page
    </div>
}


const path = '/admin/'

export const AdminRoutes = () => {
    return <HomeWrapper>
        <Provider {...rootStore.adminStores}>
            <Switch>
                <Route path={`${path}users`} component={AdminUsersPage} />
                <Route path={`${path}`} component={AdminPage} />
            </Switch>
        </Provider>
    </HomeWrapper>
}