import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { WORKSPACES_STORE, ROUTER_STORE } from 'app/constants'
import { WorkspacesStore, RouterStore } from 'app/stores'
import { HomeWrapper } from 'app/containers/Home'
import { CancelCreateButtons } from 'app/components/Inputs'
import { Typography, TextField, Button } from '@material-ui/core'

import InputAdornment from '@material-ui/core/InputAdornment';

// icons
import MemoryIcon from '@material-ui/icons/Memory';
import MoneyIcon from '@material-ui/icons/Money';
import StorageIcon from '@material-ui/icons/Storage';



export const UpdateWorkspace = inject(WORKSPACES_STORE, ROUTER_STORE)(observer((props) => { 
    const routerStore = props[ROUTER_STORE] as RouterStore 
    const workspaceStore = props[WORKSPACES_STORE] as WorkspacesStore
    const form = workspaceStore.selectedWorkspace.updateWorkspaceForm
    const val = workspaceStore.selectedWorkspace.workspaceData
    // console.log("YOOOOOOOOOOO")
    // console.log(val.properties.resources.cpuCount)
    return <HomeWrapper>
        <Typography variant="h4">
            Update Workspace
        </Typography>
        <Typography variant="h6" style={{marginTop: '10px'}}>
            Workspace Name
        </Typography>
        <TextField
            onChange={form.onInputChange("name")}
            error={form.getError("name") != undefined && val.name != ""}
            helperText={val.name != "" ? form.getError("name") : undefined} // to be implemented (currently all errors are just 'error')
            defaultValue={val.name}
            variant="outlined"
            margin="normal"
            fullWidth
            id="name"
            label="Workspace Name"
            name="name"
        />
        <Typography variant="h6" style={{marginTop: '10px'}}>
            Resources
        </Typography>
        <Typography variant="body1">
            Modify the maximum amount of resources the deployment(s) can use:
        </Typography>
        <TextField
            onChange={form.onInputChange("properties.resources.cpuCount")}
            error={form.getError("properties.resources.cpuCount") != undefined && String(val.properties.resources.cpuCount) != ""}
            helperText={String(val.properties.resources.cpuCount) != "" ? form.getError("properties.resources.cpuCount") : undefined} // to be implemented (currently all errors are just 'error')
            defaultValue={val.properties.resources.cpuCount}
            variant="outlined"
            name="properties.resources.cpuCount"
            margin="dense"
            id="properties.resources.cpuCount"
            label="CPU"
            type="number"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <MemoryIcon />
                    </InputAdornment>
                ),
            }}
            InputLabelProps={{
                required: false,
            }}
            fullWidth
        />
        <TextField
            onChange={form.onInputChange("properties.resources.memoryCount")}
            error={form.getError("properties.resources.memoryCount") != undefined && String(val.properties.resources.memoryCount) != ""}
            helperText={String(val.properties.resources.memoryCount) != "" ? form.getError("properties.resources.memoryCount") : undefined} // to be implemented (currently all errors are just 'error')
            defaultValue={val.properties.resources.memoryCount}
            variant="outlined"
            id="properties.resources.memoryCount"
            name="properties.resources.memoryCount"
            margin="dense"
            label="RAM"
            type="number"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <MoneyIcon />
                    </InputAdornment>
                ),
            }}
            InputLabelProps={{
                required: false,
            }}
            fullWidth
        />
        <TextField
            onChange={form.onInputChange("properties.resources.storageCount")}
            error={form.getError("properties.resources.storageCount") != undefined && String(val.properties.resources.storageCount) != ""}
            helperText={String(val.properties.resources.storageCount) != "" ? form.getError("properties.resources.storageCount") : undefined} // to be implemented (currently all errors are just 'error')
            defaultValue={val.properties.resources.storageCount}
            variant="outlined"
            margin="dense"
            id="properties.resources.storageCount"
            name="properties.resources.storageCount"
            label="Storage"
            type="number"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <StorageIcon />
                    </InputAdornment>
                ),
            }}
            InputLabelProps={{
                required: false,
            }}
            fullWidth
        />
        <div style={{float: 'right'}}>
            <Button onClick={()=>{
                routerStore.replace(workspaceStore.selectedWorkspace.link)}} color="primary">
                Cancel
            </Button>
            <Button onClick={async ()=>{
                if(await workspaceStore.updateWorkspace()){
                    routerStore.replace(workspaceStore.selectedWorkspace.link)
                }
            }} disabled={!form.isValid} color="primary">
                Save
            </Button>
        </div>
    </HomeWrapper>
}))