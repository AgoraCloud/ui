import * as React from 'react'
import { WORKSPACES_STORE } from 'app/constants'
import { observer, inject } from 'mobx-react'
import { WorkspacesStore } from 'app/stores'
import { DeploymentCard } from 'app/components/Cards/Deployment'

export const DeploymentsList = inject(WORKSPACES_STORE)(observer((props)=>{
    const store = props[WORKSPACES_STORE] as WorkspacesStore
    if(store.state !== 'loaded') return null

    if(!store.selectedWorkspace) return null

    if(store.selectedWorkspace.deployments.state !== 'loaded') return null

    
    const deployments = store.selectedWorkspace.deployments.deployments
    return <div>
        {deployments.map((deployment)=>(
            <DeploymentCard deployment={deployment}/>
        ))}
    </div>
}))