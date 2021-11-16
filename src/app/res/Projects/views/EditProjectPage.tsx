import React from 'react';
import { Typography } from '@material-ui/core';
import { WorkspaceWrapper } from 'app/components/Wrapper';
import { useStores } from 'app/stores';
import { observer } from 'mobx-react';
import { EditProjectForm } from 'app/res/Projects';

export const EditProjectPage = observer((props) => {
  const { workspacesstore } = useStores();
  const project = workspacesstore.selectedProject;
  if (!project) return null; // TODO figure out what to do here (no deployment by id...)
  const form = project.editProjectForm;
  return (
    <WorkspaceWrapper>
      <Typography variant="h4">Edit Project</Typography>
      <EditProjectForm form={form} />
    </WorkspaceWrapper>
  );
});
