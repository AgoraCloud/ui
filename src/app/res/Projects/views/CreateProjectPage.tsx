import React from "react";
import { Typography } from "@material-ui/core";
import { WorkspaceWrapper } from "app/components/Wrapper";
import { useStores } from "app/stores";
import { observer } from "mobx-react";
import { CreateProjectForm } from "app/res/Projects";

export const CreateProjectPage = observer((props) => {
    const {workspacesstore} = useStores()
    const workspace = workspacesstore.selectedWorkspace
    if(!workspace) return null 
    const form = workspace.projects.createProjectForm;
    return (
        <WorkspaceWrapper>
            <Typography variant="h4">Create Project</Typography>
            <CreateProjectForm form={form} />
        </WorkspaceWrapper>
    );
})

