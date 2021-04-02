import * as React from 'react'
import { CreateProjectFormModel, EditProjectFormModel } from 'app/forms/Workspace/Projects/CreateProject'
import { Input, CancelCreateButtons } from 'app/components/Inputs'
import { Typography } from '@material-ui/core'
import { inject, observer } from 'mobx-react'

import { ROUTER_STORE } from 'app/constants'
import { RouterStore } from 'app/stores'

export const CreateProjectForm = inject(ROUTER_STORE)(observer((props: {form: CreateProjectFormModel}) => {
    const store = props[ROUTER_STORE] as RouterStore
    const {form} = props 
    
    return <div>
        <Typography variant="h6">
            Name
        </Typography>
        <Input form={form} id="name" label="Name" />
        <Typography variant="h6">
            Description
        </Typography>
        <Input form={form} id="description" label="Description" InputLabelProps={{required: false,}} />
        {/* <TextField
            onChange={form.onInputChange("name")}
            error={form.getError("name") != undefined}
            helperText={form.getError("name") != undefined ? form.getError("name") : undefined} // to be implemented (currently all errors are just 'error')
            defaultValue={form.data.name}
            variant="outlined"
            margin="normal"
            fullWidth
            id="name"
            label="Name"
            name="name"
        />
        <Typography variant="h6">
            Description
        </Typography>
        <TextField
            onChange={form.onInputChange("description")}
            error={form.getError("description") != undefined}
            helperText={form.getError("description") != undefined ? form.getError("description") : undefined} // to be implemented (currently all errors are just 'error')
            defaultValue={form.data.description}
            variant="outlined"
            margin="normal"
            fullWidth
            id="description"
            label="Description"
            name="name"
        /> */}
        <CancelCreateButtons form={form} cancel={()=>{
            store.replace(form.workspace.link + 'projects')
            form.reset()
        }}
        submit={async ()=>{
            if(await form.submit()){
                store.replace(form.workspace.link + 'projects')
                form.reset()
            }
        }}
        />
    </div>
}))


export const EditProjectForm = inject(ROUTER_STORE)(observer((props: {form: EditProjectFormModel}) => {
    const store = props[ROUTER_STORE] as RouterStore
    const {form} = props 
    return <div>
        <Typography variant="h6">
            Name
        </Typography>
        <Input form={form} id="name" label="Name" />
        <Typography variant="h6">
            Description
        </Typography>
        <Input form={form} id="description" label="Description" InputLabelProps={{required: false,}} />
        <CancelCreateButtons form={form} cancel={()=>{
            store.replace(form.project.projects.workspace.link + 'projects')
        }}
        submit={async ()=>{
            if(await form.submit()){
                store.replace(form.project.projects.workspace.link + 'projects')
            }
        }}
        labels={['Cancel', 'Edit']}
        />
    </div>
}))
