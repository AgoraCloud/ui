import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { WORKSPACES_STORE } from 'app/constants';
import { WorkspacesStore } from 'app/stores';
import { HomeWrapper } from 'app/containers/workspace';
import {
  CreateProjectForm,
  EditProjectForm,
} from 'app/components/forms/workspace/projects';
import { Typography } from '@material-ui/core';

export const CreateProject = inject(WORKSPACES_STORE)(
  observer((props) => {
    const store = props[WORKSPACES_STORE] as WorkspacesStore;
    const form = store.createProjectForm;
    return (
      <HomeWrapper>
        <Typography variant="h4">Create Project</Typography>
        <CreateProjectForm form={form} />
      </HomeWrapper>
    );
  }),
);

export const EditProject = inject(WORKSPACES_STORE)(
  observer((props) => {
    const store = props[WORKSPACES_STORE] as WorkspacesStore;
    const form = store.selectedProject?.form;
    if (!form) return null; // TODO figure out what to do here (no deployment by id...)
    return (
      <HomeWrapper>
        <Typography variant="h4">Edit Project</Typography>
        <EditProjectForm form={form} />
      </HomeWrapper>
    );
  }),
);
