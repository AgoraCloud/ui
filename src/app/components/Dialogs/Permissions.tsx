import * as React from 'react'
import { BaseDialog } from 'app/components/Dialogs'
import { inject, observer } from 'mobx-react'
import { ADMIN_STORE, events, eventTypes } from 'app/constants'
import { AdminStore } from 'app/stores'
import { DialogTitle, DialogContent, DialogActions } from '@material-ui/core'
import { PermissionsForm, RolesForm } from '../Forms/Permissions'
import { CancelCreateButtons, RolesSelect } from 'app/components/Inputs'

export const PermissionsDialog = inject(ADMIN_STORE)(observer((props) => {
    const store = props[ADMIN_STORE] as AdminStore
    const { permissionsDialog } = store
    const { user } = permissionsDialog
    if (!user) return null
    const form = user.permissions.form
    return <BaseDialog dialog={permissionsDialog}>
        <DialogTitle>Permissions: {user.fullName}</DialogTitle>
        <DialogContent>
            <RolesForm form={form}/>
            <PermissionsForm form={form} />
        </DialogContent>
        <DialogActions>
            <CancelCreateButtons
            form={form}
            labels={['Cancel', 'Edit']}
            cancel={permissionsDialog.onClose}
            submit={async ()=>{
                if(await form.submit()){
                    events.emit(eventTypes.USER_CRUD, 'edited permissions')
                }else events.emit(eventTypes.USER_ERR, 'error')
            }}
            />

        </DialogActions>
    </BaseDialog>
}))