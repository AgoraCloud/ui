import * as React from 'react';
import { CreateWorkspaceForm } from 'app/components/forms/workspace';
import { HomeWrapper } from 'app/containers/workspace';

export const FirstWorkspace = () => {
  return (
    <HomeWrapper>
      <CreateWorkspaceForm />
    </HomeWrapper>
  );
};
