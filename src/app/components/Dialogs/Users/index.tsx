import * as React from 'react'
import { BaseDialog } from 'app/components/Dialogs'
import { inject, observer } from 'mobx-react'
import { ADMIN_STORE, events, eventTypes } from 'app/constants'
import { AdminStore } from 'app/stores'
import { DialogTitle, DialogContent, DialogActions } from '@material-ui/core'
import { Input, Label, CancelCreateButtons } from 'app/components/Inputs'

export const EditUserDialog = inject(ADMIN_STORE)(observer((props) => {
    const store = props[ADMIN_STORE] as AdminStore
    const { editUserDialog } = store
    const { user } = editUserDialog
    if (!user) return null
    const form = user.updateUserForm
    return <BaseDialog dialog={editUserDialog}>
        <DialogTitle>Edit: {user.fullName}</DialogTitle>
        <DialogContent>
            <Label>
                Full Name
            </Label>
            <Input form={form} id="fullName" />
            <Label>
                Password
            </Label>
            <Input form={form} id="password" type="password"/>
        </DialogContent>
        <DialogActions>
            <CancelCreateButtons form={form} cancel={() => {
                editUserDialog.onClose()
            }}
                submit={async () => {
                    if (await form.submit()) {
                        editUserDialog.onClose()
                        events.emit(eventTypes.USER_CRUD, 'updated')
                    }else events.emit(eventTypes.USER_ERR, 'error')
                }}
                labels={['Cancel', 'Edit']}
            />
        </DialogActions>
    </BaseDialog>
}))

export const CreateUserDialog = inject(ADMIN_STORE)(observer((props) => {
    const store = props[ADMIN_STORE] as AdminStore
    const { createUserDialog } = store
    const form = store.createUserForm
return <BaseDialog dialog={createUserDialog}>
        <DialogTitle>Create User</DialogTitle>
        <DialogContent>
            <Label>
                Full Name
            </Label>
            <Input form={form} id="fullName" />
            <Label>
                Email
            </Label>
            <Input form={form} id="email" />
            <Label>
                Password
            </Label>
            <Input form={form} id="password" type="password"/>
        </DialogContent>
        <DialogActions>
            <CancelCreateButtons form={form} cancel={() => {
                createUserDialog.onClose()
            }}
                submit={async () => {
                    if (await form.submit()) {
                        createUserDialog.onClose()
                        events.emit(eventTypes.USER_CRUD, 'created')
                    }else events.emit(eventTypes.USER_ERR, 'error')
                }}
                labels={['Cancel', 'Create']}
            />
        </DialogActions>
    </BaseDialog>
}))