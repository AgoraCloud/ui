import * as React from 'react'
import { CreateDeploymentFormModel, EditDeploymentFormModel } from 'app/forms/Workspace/Deployments/CreateDeployment'
import { Input, ImageSelect, ResourceInput, CancelCreateButtons, CPUMemoryInput, Label } from 'app/components/Inputs'
import { Typography } from '@material-ui/core'
import { inject, observer } from 'mobx-react'

import { ROUTER_STORE } from 'app/constants'
import { RouterStore } from 'app/stores'

export const CreateDeploymentForm = inject(ROUTER_STORE)(observer((props: {form: CreateDeploymentFormModel}) => {
    const store = props[ROUTER_STORE] as RouterStore
    const {form} = props 
    
    return <div>
        <Label>
            Deployment Name
        </Label>
        <Input form={form} id="name" label="name" autoComplete='off'/>
        <Label>
            Sudo Password
        </Label>
        <Input form={form} id="sudoPassword" type="password" label="Sudo Password" autoComplete="current-password" />
        <Label>
            Container Image
        </Label>
        <ImageSelect form={form} id="image"/>
        <Label>
            Resources
        </Label>
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
        <Label>
            Deployment Name
        </Label>
        <Input form={form} id="name" label="name" autoComplete='off' />
        <Label>
            Resources
        </Label>
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
        labels={['Cancel', 'Edit']}
        />
    </div>
}))
