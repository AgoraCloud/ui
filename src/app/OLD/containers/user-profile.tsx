import * as React from 'react';
import { UpdateUserForm } from 'app/components/forms/workspace/user';
import { HomeWrapper } from 'app/containers/workspace';

export const UserProfile = () => {
  return (
    <HomeWrapper>
      <UpdateUserForm />
    </HomeWrapper>
  );
};
