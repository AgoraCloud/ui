import * as React from 'react';
import {
  CreateProjectFormModel,
  EditProjectFormModel,
} from 'app/forms/Workspace/Projects/CreateProject';
import { Input, CancelCreateButtons } from 'app/components/Inputs';
import { Typography } from '@material-ui/core';
import { inject, observer } from 'mobx-react';

import { ROUTER_STORE } from 'app/constants';
import { RouterStore } from 'app/stores';

export const CreateProjectForm = inject(ROUTER_STORE)(
  observer((props: { form: CreateProjectFormModel }) => {
    const store = props[ROUTER_STORE] as RouterStore;
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
            store.replace(form.workspace.link + 'p');
            form.reset();
          }}
          submit={async () => {
            if (await form.submit()) {
              store.replace(form.workspace.link + 'p');
              form.reset();
            }
          }}
        />
      </div>
    );
  }),
);

export const EditProjectForm = inject(ROUTER_STORE)(
  observer((props: { form: EditProjectFormModel }) => {
    const store = props[ROUTER_STORE] as RouterStore;
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
            store.replace(form.project.projects.workspace.link + 'p');
          }}
          submit={async () => {
            if (await form.submit()) {
              store.replace(form.project.projects.workspace.link + 'p');
            }
          }}
          labels={['Cancel', 'Save']}
        />
      </div>
    );
  }),
);
