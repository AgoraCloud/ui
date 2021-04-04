import * as React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";

// icons

import AppsIcon from "@material-ui/icons/Apps";
import NotesIcon from "@material-ui/icons/Notes";
import ListItemText from "@material-ui/core/ListItemText";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import SettingsIcon from "@material-ui/icons/Settings";
import AssessmentIcon from "@material-ui/icons/Assessment";
import { inject, observer } from "mobx-react";
import { ROUTER_STORE } from "app/constants";
import { RouterStore } from "app/stores";
import { ListSubheader } from "@material-ui/core";
import PeopleIcon from "@material-ui/icons/People";

/**
 * Code Sourced from: https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/dashboard
 * https://material-ui.com/getting-started/templates/dashboard/
 */

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

// const { forwardRef, useImperativeHandle } = React;

export const SideBar = inject(ROUTER_STORE)(
  observer((props) => {
    const store = props[ROUTER_STORE] as RouterStore;
    const classes = useStyles();

    const handleListItemClick = (index: number) => {
      store.selected = index;
    };

    return (
      <>
        {" "}
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !props.open && classes.drawerPaperClose),
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
            <ListItem
              button
              component={Link}
              to={store.workspaceUrl}
              selected={store.selected === 0}
              onClick={(event) => handleListItemClick(0)}
            >
              <ListItemIcon>
                <AppsIcon />
              </ListItemIcon>
              <ListItemText primary="Deployments" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to={store.workspaceUrl + "/projects"}
              selected={store.selected === 1}
              onClick={(event) => handleListItemClick(1)}
            >
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Projects" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to={store.workspaceUrl + "/wiki"}
              selected={store.selected === 2}
              onClick={(event) => handleListItemClick(2)}
            >
              <ListItemIcon>
                <NotesIcon />
              </ListItemIcon>
              <ListItemText primary="Wiki" />
            </ListItem>
          </List>
          <Divider />
          <List subheader={<ListSubheader>Workspace</ListSubheader>}>
            <ListItem
              button
              component={Link}
              to={"/w/new"}
              selected={store.selected === 3}
              onClick={(event) => handleListItemClick(3)}
            >
              <ListItemIcon>
                <AddCircleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="New" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to={store.workspaceUrl + "/edit-workspace"}
              selected={store.selected === 4}
              onClick={(event) => handleListItemClick(4)}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to={store.workspaceUrl + "/metrics"}
              selected={store.selected === 5}
              onClick={(event) => handleListItemClick(5)}
            >
              <ListItemIcon>
                <AssessmentIcon />
              </ListItemIcon>
              <ListItemText primary="Metrics" />
            </ListItem>
          </List>
          <Divider />
          <List subheader={<ListSubheader>Admin</ListSubheader>}>
            <ListItem
              button
              component={Link}
              to={'/admin/users'}
              selected={store.selected === 6}
              onClick={(event) => handleListItemClick(6)}
            >
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
          </List>
        </Drawer>
      </>
    );
  })
);
