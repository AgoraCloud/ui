import * as React from 'react'
import { Redirect } from 'react-router'
import { inject, observer } from 'mobx-react'
import { WORKSPACES_STORE } from 'app/constants'
import { WorkspacesStore } from 'app/stores'


export const FirstWorkspaceRedirect = inject(WORKSPACES_STORE)(observer((props) => {
    const store = props[WORKSPACES_STORE] as WorkspacesStore
    if(store.state != 'loaded'){
        return null
    }
    console.log(store.workspaces)
    const wid = store.workspaces.workspaces[0].id
    return <Redirect to={`w/${wid}`}/>
}))