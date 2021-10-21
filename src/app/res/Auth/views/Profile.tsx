import * as React from 'react';
import { WorkspaceWrapper } from 'app/components/Wrapper';
import { Typography } from '@material-ui/core';
import { observer } from 'mobx-react';
import { useStores } from 'app/stores';
import { CancelCreateButtons, Input } from 'app/components/inputs';

export const UpdateUserForm = observer((props) => {
    const { authstore, routerstore } = useStores()
    const user = authstore.user
    const form = user.updateUserForm;
    return (
        <div>
            <Typography variant="h4">Edit Profile</Typography>
            <Typography variant="h6" style={{ marginTop: '20px' }}>
                Full Name
            </Typography>
            <Input form={form} id="fullName" />
            <CancelCreateButtons form={form} labels={["Cancel", "Update"]}/>
        </div>
    );
})

export const UserProfile = () => {
    return (
        <WorkspaceWrapper>
            <UpdateUserForm />
        </WorkspaceWrapper>
    );
};
