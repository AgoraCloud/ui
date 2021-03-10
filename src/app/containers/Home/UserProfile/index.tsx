import * as React from 'react';
import { UpdateUserForm } from 'app/components/Forms/Workspace/User'
import { HomeWrapper } from 'app/containers/Home';

export const UserProfile = () => {
    return <HomeWrapper>
        <UpdateUserForm />
        </HomeWrapper>
}