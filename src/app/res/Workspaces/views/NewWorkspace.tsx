import * as React from 'react';
import { HomeWrapper, WorkspaceWrapper } from 'app/components/Wrapper';
import { CreateWorkspaceForm } from '.';

export const NewWorkspace = () => {
  return (
    <HomeWrapper>
      <CreateWorkspaceForm />
    </HomeWrapper>
  );
};
