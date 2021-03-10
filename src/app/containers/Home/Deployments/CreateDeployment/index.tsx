import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { WORKSPACES_STORE } from 'app/constants'
import { WorkspacesStore } from 'app/stores'
import { HomeWrapper } from 'app/containers/Home'
import { CreateDeploymentForm, EditDeploymentForm } from 'app/components/Forms/Workspace/Deployments'
import { Typography } from '@material-ui/core'

export const CreateDeployment = inject(WORKSPACES_STORE)(observer((props) => { 
    const store = props[WORKSPACES_STORE] as WorkspacesStore
    const form = store.createDeploymentForm
    return <HomeWrapper>
        <Typography variant="h4">
            Create Deployment
        </Typography>
        <CreateDeploymentForm form={form}/>
    </HomeWrapper>
}))


export const EditDeployment = inject(WORKSPACES_STORE)(observer((props) => { 
    const store = props[WORKSPACES_STORE] as WorkspacesStore
    const form = store.selectedDeployment?.form
    if(!form) return null // TODO figure out what to do here (no deployment by id...)
    return <HomeWrapper>
        <Typography variant="h4">
            Edit Deployment
        </Typography>
        <EditDeploymentForm form={form}/>
    </HomeWrapper>
}))
