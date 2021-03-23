import * as React from 'react'
import { CreateWorkspaceForm } from 'app/components/Forms/Workspace'
import { HomeWrapper } from 'app/containers/Home'



export const FirstWorkspace = () => { 
    return <HomeWrapper>
                <CreateWorkspaceForm />
        </HomeWrapper> 
   
}