import * as React from 'react'
import { SnackbarProvider, withSnackbar } from 'notistack'
import { inject, observer } from 'mobx-react'
import { SNACKBAR_STORE } from 'app/constants'
import { SnackbarStore } from 'app/stores'


let displayed: number[] = []

const Notifier = withSnackbar(inject(SNACKBAR_STORE)(observer((props) => {
    const store = props[SNACKBAR_STORE] as SnackbarStore
    store.alerts.forEach((alert) => {
        const { message, ...rest } = alert
        if (displayed.includes(alert.key)) return;
        props.enqueueSnackbar(message, rest)
        displayed = [...displayed, alert.key]
        store.remove(alert)
    })
    return null
})))

export const SnackbarManager = (props) => {
    return <SnackbarProvider anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
    }}>
        <Notifier />
    </SnackbarProvider>
} 