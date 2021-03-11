import * as React from 'react'
import * as style from './style.scss'
import { inject, observer } from 'mobx-react'
import { WORKSPACES_STORE } from 'app/constants'
import { WorkspacesStore } from 'app/stores'
import { HomeWrapperBase } from 'app/containers/Home'


export const DeploymentProxy = inject(WORKSPACES_STORE)(observer((props) => { 
    const store = props[WORKSPACES_STORE] as WorkspacesStore
    const deployment = store.selectedDeployment
    if(!deployment) return null
    const did = deployment.id
    return <HomeWrapperBase>
        <iframe id={style.iframe} src={`/proxy/${did}/`}/>
    </HomeWrapperBase>
}))


