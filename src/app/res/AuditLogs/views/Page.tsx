import { useStores } from 'app/stores';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { AuditLogQuery, BaseAuditLogs } from '..';
// import { DataGrid } from '@mui/x-data-grid';

import {
  Table,
  Paper,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  TablePagination,
  CircularProgress,
  MenuItem,
  ListItemText,
  Checkbox,
  Box,
  Button,
  Menu,
} from '@material-ui/core';
import { AirlineSeatIndividualSuiteRounded } from '@material-ui/icons';
import { Loading, LoadingPage } from 'app/components/LoadingPage';

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

const columns = [
  {
    id: 'date',
    label: 'Date',
  },
  {
    id: 'resource',
    label: 'Resource',
  },
  {
    id: 'action',
    label: 'Action',
  },
  {
    id: 'fullName',
    label: 'User',
  },
];

export const FilterSelect = ({
  options,
  label,
  onSearch,
}: {
  options: string[];
  label: string;
  onSearch: (values?: string) => void;
}) => {
  const [value, setValue] = React.useState<string | undefined>(undefined);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSelect = (option: string) => {
    return () => {
      if (option == value) setValue(undefined);
      else setValue(option);
      // YOU CAN ONLY HAVE ONE VALUE

      // if (value.indexOf(option) == -1) {
      //   setValue([...value, option])
      // } else {
      //   setValue(value.filter((v) => v != option))
      // }
    };
  };
  const search = () => {
    onSearch(value);
  };
  return (
    <>
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {label}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Button color="primary" onClick={search}>
          Search
        </Button>
        {options.map((option) => (
          <MenuItem
            key={option}
            value={option}
            // style={getStyles(name, value, theme)}
            onClick={onSelect(option)}
          >
            {/* <Checkbox checked={value.indexOf(option) > -1} /> */}
            <Checkbox checked={option === value} />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
export const AdminAuditLogPage = () => {
  const { adminstore } = useStores();
  const auditLogs = adminstore.auditLogs;
  return <AuditLogTable auditLogs={auditLogs} />;
};

export const WorkspaceAdminAuditLogPage = () => {
  const { workspacesstore } = useStores();
  const workspace = workspacesstore.selectedWorkspace;
  if (!workspace) return null;
  const workspaceAdmin = workspace.workspaceAdmin;
  const auditLogs = workspaceAdmin.auditLogs;
  return <AuditLogTable auditLogs={auditLogs} />;
};

export const AuditLogTable = observer(
  ({ auditLogs }: { auditLogs: BaseAuditLogs }) => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [query, setQuery] = React.useState<AuditLogQuery | undefined>(
      undefined,
    );
    const [queryParams, setQueryParams] = React.useState({});
    React.useEffect(() => {
      setQuery(auditLogs.get(0, 100, queryParams));
      console.log('QUERY PARAMS', queryParams);
    }, [queryParams]);
    if (!query) return <div> Not Query </div>;
    // if (query.state !== 'loaded') return <Loading/>;

    const addQuery = (option: string) => {
      return (value?: string) => {
        setQueryParams({
          ...queryParams,
          // [option]: values.join(',')
          [option]: value,
        });
      };
    };
    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement>,
    ) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
    const rows = query.logs;
    return (
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell
                  key={'date'}
                // align={column.align}
                // style={{ minWidth: column.minWidth }}
                >
                  Date
                </TableCell>
                <TableCell
                  key={'resource'}
                // align={column.align}
                // style={{ minWidth: column.minWidth }}
                >
                  <FilterSelect
                    label="Resource"
                    options={resources}
                    onSearch={addQuery('resource')}
                  />
                </TableCell>
                <TableCell
                  key={'action'}
                // align={column.align}
                // style={{ minWidth: column.minWidth }}
                >
                  <FilterSelect
                    label="Action"
                    options={actions}
                    onSearch={addQuery('action')}
                  />
                </TableCell>
                <TableCell
                  key={'username'}
                // align={column.align}
                // style={{ minWidth: column.minWidth }}
                >
                  Username
                </TableCell>
              </TableRow>
            </TableHead>
              {/* {query.state === 'loaded' ? 
               */}
              {false ?
            <TableBody>

                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id}>
                              {value}
                              {/* {column.format && typeof value === 'number' ? column.format(value) : value} */}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
            </TableBody>
                  
                  : 

            <Box sx={{ display: 'flex', width: "100%" }}>
              <CircularProgress />
            </Box>}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    );
  },
);

const actions = [
  'CREATE',
  'READ',
  'READ_IMAGES',
  'READ_LOGS',
  'READ_METRICS',
  'PROXY',
  'UPDATE',
  'DELETE',
  'LOG_IN',
  'LOG_OUT',
  'READ_USERS',
  'ADD_USER',
  'REMOVE_USER',
  'TURN_ON',
  'TURN_OFF',
];

const resources = [
  'USER',
  'PERMISSION',
  'AUDIT_LOG',
  'WORKSPACE',
  'DEPLOYMENT',
  'PROJECT',
  'PROJECT_LANE',
  'PROJECT_TASK',
  'WIKI_SECTION',
  'WIKI_PAGE',
  'SHORTCUT',
];
