import * as React from 'react'
import { PermissionsFormModel } from 'app/forms'
import { Checkbox } from '@material-ui/core'
import { Action, Role } from 'app/constants'
import { PaginatedTable } from 'app/components/Table'
import { observer } from 'mobx-react'


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
}) => {
    const {form} = props
    let rows: any[] = []
    for (const key in Action) {
        const value = Action[key]
        rows.push({checkbox: <Checkbox onClick={form.onSelectPermission(value)} checked={form.hasPermission(value)}/>, permission: value,})
    }
    return <div>
        Permissions Form
        <PaginatedTable columns={columns} rows={rows}/>
    </div>
})

export const RolesForm = observer((props: {
    form: PermissionsFormModel
}) => {
    const {form} = props
    let rows: any[] = []
    for (const key in Role) {
        const value = Role[key]
        rows.push({checkbox: <Checkbox onClick={form.onSelectRole(value)} checked={form.hasRole(value)}/>, permission: value,})
    }
    return <div>
        Role Form
        <PaginatedTable columns={columns} rows={rows}/>
    </div>
})