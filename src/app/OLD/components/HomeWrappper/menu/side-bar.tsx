import * as React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

// icons

import AppsIcon from '@material-ui/icons/Apps';
import NotesIcon from '@material-ui/icons/Notes';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SettingsIcon from '@material-ui/icons/Settings';
import AssessmentIcon from '@material-ui/icons/Assessment';
import { observer } from 'mobx-react';
import { Role } from 'app/constants';
import { ListSubheader } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import { RenderIf, RenderIfRole } from '../../RouteGuards';
import { useStores } from 'app/stores';

/**
 * Code Sourced from: https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/dashboard
 * https://material-ui.com/getting-started/templates/dashboard/
 */

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

// const { forwardRef, useImperativeHandle } = React;

interface sidebarItem_i {
  icon: React.ReactNode;
  url: string;
  text: string;
}

// const allItems = [
//   ...sideBarItems,
//   ...workspaceSidebarItems,
//   ...workspaceAdminSidebarItems,
//   ...adminSideb
// ]

const SideBarItems = ({ links }: { links: sidebarItem_i[] }) => {
  const selected = (url) => {
    // this is a bad way of doing it IMO
    return window.location.pathname == url;
  };
  return (
    <>
      {links.map((link) => (
        <ListItem
          key={link.text}
          button
          component={Link}
          to={link.url}
          selected={selected(link.url)}
        >
          <ListItemIcon>{link.icon}</ListItemIcon>
          <ListItemText primary={link.text} />
        </ListItem>
      ))}
    </>
  );
};
export const SideBar = observer((props) => {
  const { workspacesstore } = useStores();
  // const routerstore = props[ROUTER_STORE] as routerstore;
  // const workspacesstore = props[WORKSPACES_STORE] as WorkspacesStore;
  const classes = useStyles();
  const workspaces = workspacesstore.workspaces;
  const selectedWorkspace = workspacesstore.selectedWorkspace;
  const workspaceUrl = workspaces.workspaceUrl;

  const sidebarItems = [
    {
      icon: <AppsIcon />,
      url: workspaceUrl,
      text: 'Deployments',
      workspaces,
    },
    {
      icon: <AssignmentIcon />,
      url: workspaceUrl + '/p',
      text: 'Projects',
    },
    {
      icon: <NotesIcon />,
      url: workspaceUrl + '/wiki',
      text: 'Wiki',
    },
  ];

  const workspaceSidebarItems = [
    {
      icon: <AddCircleOutlineIcon />,
      url: `/w/new`,
      text: 'New',
    },
    {
      icon: <SettingsIcon />,
      url: `${workspaceUrl}/edit-worspace`,
      text: 'Settings',
    },
    {
      icon: <AssessmentIcon />,
      url: `${workspaceUrl}/metrics`,
      text: 'Metrics',
    },
  ];
  const workspaceAdminSidebarItems = [
    {
      icon: <PeopleIcon />,
      url: `${workspaceUrl}/admin/users`,
      text: 'Workspace Users',
    },
  ];
  const adminSidebarItems = [
    {
      icon: <PeopleIcon />,
      url: '/admin/users',
      text: 'Users',
    },
  ];
  return (
    <>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(
            classes.drawerPaper,
            !props.open && classes.drawerPaperClose,
          ),
        }}
        open={props.open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={props.closeDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <SideBarItems links={sidebarItems} />
        </List>
        <Divider />
        <List
          subheader={
            <RenderIf if={props.open}>
              <ListSubheader>Workspace</ListSubheader>
            </RenderIf>
          }
        >
          <SideBarItems links={workspaceSidebarItems} />
          <RenderIfRole
            roles={[Role.WorkspaceAdmin, Role.SuperAdmin]}
            wid={selectedWorkspace.id}
          >
            <SideBarItems links={workspaceAdminSidebarItems} />
          </RenderIfRole>
        </List>
        <Divider />
        <RenderIfRole roles={[Role.SuperAdmin]}>
          <List
            subheader={
              <RenderIf if={props.open}>
                <ListSubheader>Admin</ListSubheader>
              </RenderIf>
            }
          >
            <SideBarItems links={adminSidebarItems} />
          </List>
        </RenderIfRole>
      </Drawer>
    </>
  );
});
