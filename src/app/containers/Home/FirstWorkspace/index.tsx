import * as React from 'react'
import { CreateWorkspaceDialog } from 'app/components/Forms/Workspace'



export const FirstWorkspace = () => {

    
    return <CreateWorkspaceDialog open={true} closeDialog={()=>{
        // TODO: on closeDialog redirect to the newly created workspace
    }}/>
}