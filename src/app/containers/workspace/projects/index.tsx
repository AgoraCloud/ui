import * as React from 'react';
import { WORKSPACES_STORE, ROUTER_STORE, UI_STORE } from 'app/constants';
import { observer, inject } from 'mobx-react';
import { WorkspacesStore, RouterStore, UIStore } from 'app/stores';
import { MoreMenu, AddFAB } from 'app/components/inputs';
import { HomeWrapper } from 'app/containers/workspace';
import { Typography, makeStyles } from '@material-ui/core';
import { ConfirmDeleteDialog } from 'app/components/dialogs';
import Button from '@material-ui/core/Button';

// Table imports
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

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

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement>,
    ) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    return (
      <HomeWrapper>
        <Typography variant="h4" className={classes.heading}>
          Projects
        </Typography>
        {/* <Button variant="contained" color="primary" style={{ position: "absolute", top: "88px", right: "20px" }} onClick={() => { routerStore.push(workspace.link + 'p/new')}}>
        New Project
      </Button> */}
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
        <ConfirmDeleteDialog />
        <AddFAB link={workspace.link + 'p/new'} />
      </HomeWrapper>
    );
  }),
);
