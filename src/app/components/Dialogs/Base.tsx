import * as React from 'react'
import { Dialog } from '@material-ui/core'
import { DialogModel } from 'app/models/Dialog'
import { observer } from 'mobx-react'

export const BaseDialog = observer((props: {
    dialog: DialogModel
    children: React.ReactNode
}) => {
    const {dialog} = props
    const {open, onClose} = dialog
    return <Dialog open={open} onClose={onClose}>
        {props.children}
    </Dialog>
})