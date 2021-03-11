import * as React from 'react'
import { WORKSPACES_STORE } from 'app/constants'
import { observer, inject } from 'mobx-react'
import { WorkspacesStore } from 'app/stores'
import { DeploymentCard } from 'app/components/Cards/Deployment'
import { Grid } from '@material-ui/core'
import { AddFAB } from 'app/components/Inputs'

export const DeploymentsList = inject(WORKSPACES_STORE)(observer((props) => {
    const store = props[WORKSPACES_STORE] as WorkspacesStore
    const workspace = store.selectedWorkspace
    const deployments = workspace.deployments.deployments
    return <>
        <Grid container direction={'row'} spacing={3} style={{marginLeft: 0}}>
            {deployments.map((deployment) => (
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} key={deployment.id}>
                    <DeploymentCard deployment={deployment} />
                </Grid>
            ))}
        </Grid>
        <AddFAB link={workspace.link + 'new'}/>
    </>
}))