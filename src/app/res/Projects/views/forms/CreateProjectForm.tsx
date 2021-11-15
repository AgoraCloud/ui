import React from 'react';

import { Input, CancelCreateButtons } from 'app/components/inputs';
import { Typography } from '@material-ui/core';
import { observer } from 'mobx-react';

import { ROUTER_STORE } from 'app/constants';
import { RouterStore, useStores } from 'app/stores';
import { CreateProjectFormModel, EditProjectFormModel } from 'app/res/Projects';

export const CreateProjectForm = observer((props: { form: CreateProjectFormModel }) => {
    const { routerstore } = useStores()
    const { form } = props;

    return (
        <div>
            <Typography variant="h6">Name</Typography>
            <Input form={form} id="name" label="Name" />
            <Typography variant="h6">Description</Typography>
            <Input
                form={form}
                id="description"
                label="Description"
                InputLabelProps={{ required: false }}
            />
            <CancelCreateButtons
                form={form}
                cancel={() => {
                    routerstore.push(form.projects.link);
                    form.reset();
                }}
                submit={async () => {
                    await form.call()
                    routerstore.push(form.projects.link);
                    form.reset();
                }}
            />
        </div>
    );
})

export const EditProjectForm = observer((props: { form: EditProjectFormModel }) => {
    const { routerstore } = useStores()
    const { form } = props;
    return (
        <div>
            <Typography variant="h6">Name</Typography>
            <Input form={form} id="name" label="Name" />
            <Typography variant="h6">Description</Typography>
            <Input
                form={form}
                id="description"
                label="Description"
                InputLabelProps={{ required: false }}
            />
            <CancelCreateButtons
                form={form}
                cancel={() => {
                    routerstore.push(form.project.projects.link);
                }}
                submit={async () => {
                    await form.call()
                    routerstore.push(form.project.projects.link);
                }}
                labels={['Cancel', 'Save']}
            />
        </div>
    );
})