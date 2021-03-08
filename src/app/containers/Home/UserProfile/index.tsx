import * as React from 'react';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { UpdateUserForm } from 'app/components/Forms/Workspace/User'
import { HomeWrapper } from 'app/containers/Home';

export const UserProfile = () => {
    return <HomeWrapper>
        <UpdateUserForm />
        </HomeWrapper>
}