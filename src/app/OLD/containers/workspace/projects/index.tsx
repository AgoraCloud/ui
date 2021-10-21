import * as React from 'react';
import { WORKSPACES_STORE, ROUTER_STORE, UI_STORE } from 'app/constants';
import { observer, inject } from 'mobx-react';
import { WorkspacesStore, RouterStore, UIStore } from 'app/stores';
import { MoreMenu, AddFAB } from 'app/components/inputs';
import { HomeWrapper } from 'app/containers/workspace';
import { Typography, makeStyles } from '@material-ui/core';
import { ConfirmDeleteDialog } from 'app/components/dialogs';
import Button from '@material-ui/core/Button';
import { PaginatedTable } from 'app/components';

interface Column {
  id: 'name' | 'description' | 'edit';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'name', label: 'Name', minWidth: 100 },
  { id: 'description', label: 'Description', minWidth: 300 },
  { id: 'edit', label: '', minWidth: 50, align: 'right' },
];

interface Data {
  id: string;
  name: JSX.Element;
  description: string;
  edit: JSX.Element;
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 580,
  },
  heading: {
    marginBottom: '20px',
  },
});

export const ProjectList = inject(
  WORKSPACES_STORE,
  ROUTER_STORE,
  UI_STORE,
)(
  observer((props) => {
    const store = props[WORKSPACES_STORE] as WorkspacesStore;
    const routerStore = props[ROUTER_STORE] as RouterStore;
    const uistore = props[UI_STORE] as UIStore;
    const workspace = store.selectedWorkspace;
    const projects = workspace.projects.projects;
    const classes = useStyles();
    const rows: Data[] = [];

    projects.forEach((project) =>
      rows.push({
        id: project.data.id,
        name: (
          <Button
            style={{ textTransform: 'none' }}
            onClick={() => {
              routerStore.push(workspace.link + 'p/' + project.id + '/lanes');
            }}
            color="inherit"
          >
            {' '}
            {project.data.name}{' '}
          </Button>
        ),
        description: project.data.description,
        edit: (
          <MoreMenu
            options={[
              {
                name: 'Edit',
                onClick: () => {
                  routerStore.push(project.link + 'edit/');
                },
              },
              {
                name: 'Delete',
                onClick: () => {
                  uistore.setDeleteTarget(project.name, project.delete);
                },
              },
            ]}
          />
        ),
      }),
    );

    return (
      <HomeWrapper>
        <Typography variant="h4" className={classes.heading}>
          Projects
        </Typography>
        <PaginatedTable columns={columns} rows={rows} />
        <ConfirmDeleteDialog />
        <AddFAB link={workspace.link + 'p/new'} />
      </HomeWrapper>
    );
  }),
);
