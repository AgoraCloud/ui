import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { WORKSPACES_STORE } from 'app/constants'
import { WorkspacesStore } from 'app/stores'
import { HomeWrapper } from 'app/containers/Home'

export const UpdateWorkspace = inject(WORKSPACES_STORE)(observer((props) => { 
    const store = props[WORKSPACES_STORE] as WorkspacesStore
    return <HomeWrapper> <h1> Hello World </h1> </HomeWrapper>
}))