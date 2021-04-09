import * as React from 'react'
import { PermissionsFormModel } from 'app/forms'
import { Checkbox } from '@material-ui/core'
import { Role, WorkspaceActions, WorkspaceRole } from 'app/constants'
import { PaginatedTable } from 'app/components/Table'
import { observer } from 'mobx-react'
import { Label } from 'app/components/Inputs'


const columns = [
    {
        id: 'checkbox',
        label: ''
    },
    {
        id: 'permission',
        label: 'Permission'
    }
]

export const PermissionsForm = observer((props: {
    form: PermissionsFormModel
    permissions: string[]
}) => {
    const {form, permissions} = props
    let rows: any[] = []
    for (const value of permissions) {
        // const value = WorkspaceActions[key]
        rows.push({checkbox: <Checkbox onClick={form.onSelectPermission(value)} checked={form.hasPermission(value)}/>, permission: value,})
    }
    return <div>
        <Label>
            Permission Form
        </Label>
        <PaginatedTable columns={columns} rows={rows}/>
    </div>
})

export const RolesForm = observer((props: {
    form: PermissionsFormModel
    roles: string[]
}) => {
    const {form, roles} = props

    let rows: any[] = []
    for (const value of roles) {
        // const value = Role[key]
        rows.push({checkbox: <Checkbox onClick={form.onSelectRole(value)} checked={form.hasRole(value)}/>, permission: value,})
    }
    return <div>
        <Label>
            Role Form
        </Label>
        <PaginatedTable columns={columns} rows={rows}/>
    </div>
})