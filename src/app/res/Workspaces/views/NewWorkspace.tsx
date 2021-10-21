import * as React from 'react';
import { WorkspaceWrapper } from 'app/components/Wrapper';
import { CreateWorkspaceForm } from '.';

export const NewWorkspace = () => {
  return (
    <WorkspaceWrapper>
      <CreateWorkspaceForm />
    </WorkspaceWrapper>
  );
};
