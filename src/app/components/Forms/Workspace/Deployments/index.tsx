import * as React from 'react'
import { CreateDeploymentFormModel, EditDeploymentFormModel } from 'app/forms/Workspace/Deployments/CreateDeployment'
import { Input, ImageSelect, ResourceInput, CancelCreateButtons, CPUMemoryInput } from 'app/components/Inputs'
import { Typography } from '@material-ui/core'
import { inject, observer } from 'mobx-react'

import { ROUTER_STORE } from 'app/constants'
import { RouterStore } from 'app/stores'

export const CreateDeploymentForm = inject(ROUTER_STORE)(observer((props: {form: CreateDeploymentFormModel}) => {
    const store = props[ROUTER_STORE] as RouterStore
    const {form} = props 
    return <div>
        <Typography variant="h6">
            Deployment Name
        </Typography>
        <Input form={form} id="name" label="name" />
        <Typography variant="h6">
            Sudo Password
        </Typography>
        <Input form={form} id="sudoPassword" type="password" label="Sudo Password" autoComplete="current-password" />
        <Typography variant="h6">
            Container Image
        </Typography>
        <ImageSelect form={form} id="image"/>
        <Typography variant="h6">
            Resources
        </Typography>
        <Typography variant="body1">
            Specify the maximum amount of resources the deployment can use:
        </Typography>
        <ResourceInput form={form}/>
        <CancelCreateButtons form={form} cancel={()=>{
            store.replace(form.workspace.link)
        }}
        submit={async ()=>{
            if(await form.submit()){
                store.replace(form.workspace.link)
            }
        }}
        />
    </div>
}))


export const EditDeploymentForm = inject(ROUTER_STORE)(observer((props: {form: EditDeploymentFormModel}) => {
    const store = props[ROUTER_STORE] as RouterStore
    const {form} = props 
    return <div>
        <Typography variant="h6">
            Deployment Name
        </Typography>
        <Input form={form} id="name" label="name" />
        <Typography variant="h6">
            Resources
        </Typography>
        <Typography variant="body1">
            Specify the maximum amount of resources the deployment can use:
        </Typography>
        <CPUMemoryInput form={form}/>
        <CancelCreateButtons form={form} cancel={()=>{
            store.replace(form.workspace.link)
        }}
        submit={async ()=>{
            if(await form.submit()){
                store.replace(form.workspace.link)
            }
        }}
        />
    </div>
}))
