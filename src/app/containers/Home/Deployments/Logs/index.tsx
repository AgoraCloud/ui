import * as React from 'react'
import { HomeWrapper } from '../..'
import { Typography } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import { WORKSPACES_STORE } from 'app/constants'
import { WorkspacesStore } from 'app/stores'


export const DeploymentLogsPage = inject(WORKSPACES_STORE)(observer((props) => {
    const store = props[WORKSPACES_STORE] as WorkspacesStore
    const deployment = store.selectedDeployment
    const logs = deployment.logs
    return <HomeWrapper>
        <Typography variant="h4">
            Logs
        </Typography>
        {logs}
    </HomeWrapper>
}))