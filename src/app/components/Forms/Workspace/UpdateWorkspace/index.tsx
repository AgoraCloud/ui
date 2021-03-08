import * as React from 'react'
import { UpdateWorkspaceFormModel } from 'app/forms/Workspace/UpdateWorkspace'
import { Input, ResourceInput, CancelCreateButtons } from 'app/components/Inputs'
import { Typography } from '@material-ui/core'
import { inject, observer } from 'mobx-react'

import { ROUTER_STORE } from 'app/constants'
import { RouterStore } from 'app/stores'

export const UpdateWorkspaceForm = inject(ROUTER_STORE)(observer((props: {form: UpdateWorkspaceFormModel}) => {
    const store = props[ROUTER_STORE] as RouterStore
    const {form} = props 
    return <div>
        <Typography variant="h4">
            Update Workspace
        </Typography>
        <Typography variant="h6">
            Workspace Name
        </Typography>
        <Input form={form} id="name" label="name" />
        <Typography variant="h6">
            Resources
        </Typography>
        <Typography variant="body1">
            Specify the maximum amount of resources the deployment can use:
        </Typography>
        <ResourceInput form={form}/>
    </div>
}))
