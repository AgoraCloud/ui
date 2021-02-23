import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { WORKSPACES_STORE } from 'app/constants'
import { WorkspacesStore } from 'app/stores'
import { HomeWrapper } from 'app/containers/Home'
import { CreateDeploymentForm } from 'app/components/Forms/Workspace/Deployments'

export const CreateDeployment = inject(WORKSPACES_STORE)(observer((props) => { 
    const store = props[WORKSPACES_STORE] as WorkspacesStore
    const form = store.createDeploymentForm
    return <HomeWrapper>
        <CreateDeploymentForm form={form}/>
    </HomeWrapper>
}))