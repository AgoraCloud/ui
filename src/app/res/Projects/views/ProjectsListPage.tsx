import * as React from 'react';
import { observer } from 'mobx-react';
import { useStores } from 'app/stores';
import { MoreMenu, AddFAB } from 'app/components/inputs';
import { Typography, makeStyles } from '@material-ui/core';
import { ConfirmDeleteDialog } from 'app/components/dialogs';
import Button from '@material-ui/core/Button';
import { PaginatedTable } from 'app/components';
import { WorkspaceWrapper } from 'app/components/Wrapper';

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

export const ProjectListPage = observer((props) => {
  const { workspacesstore, routerstore, uistore } = useStores();
  const workspace = workspacesstore.selectedWorkspace;
  if (!workspace) return null;
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
            routerstore.push(project.lanes.link);
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
                routerstore.push(`${project.link}/edit`);
              },
            },
            {
              name: 'Delete',
              onClick: () => {
                uistore.setDeleteTarget(project.name, project.onDelete);
              },
            },
          ]}
        />
      ),
    }),
  );

  return (
    <WorkspaceWrapper>
      <Typography variant="h4" className={classes.heading}>
        Projects
      </Typography>
      <PaginatedTable columns={columns} rows={rows} />
      <ConfirmDeleteDialog />
      <AddFAB link={`${workspace.projects.link}/new`} />
    </WorkspaceWrapper>
  );
});
