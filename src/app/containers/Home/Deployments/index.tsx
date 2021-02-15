import * as React from 'react'
import { WORKSPACES_STORE } from 'app/constants'
import { observer, inject } from 'mobx-react'
import { WorkspacesStore } from 'app/stores'
import { DeploymentCard } from 'app/components/Cards/Deployment'
import { Grid } from '@material-ui/core'

export const DeploymentsList = inject(WORKSPACES_STORE)(observer((props)=>{
    const store = props[WORKSPACES_STORE] as WorkspacesStore
    if(store.state !== 'loaded') return null

    if(!store.selectedWorkspace) return null

    if(store.selectedWorkspace.deployments.state !== 'loaded') return null

    
    const deployments = store.selectedWorkspace.deployments.deployments
    return <Grid container  direction={'row'} spacing={3}>
        {deployments.map((deployment)=>(
            <Grid item xs={12} sm={6} md={4} lg={4} key={deployment.id}>
                <DeploymentCard deployment={deployment}/>
            </Grid>
        ))}
    </Grid>
}))