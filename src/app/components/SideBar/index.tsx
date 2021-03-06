import * as React from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { CreateWorkspaceDialog } from '../Forms/Workspace';


// icons

import DashboardIcon from '@material-ui/icons/Dashboard';
import DescriptionIcon from '@material-ui/icons/Description';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import CodeIcon from '@material-ui/icons/Code';
import ListItemText from '@material-ui/core/ListItemText';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SettingsIcon from '@material-ui/icons/Settings';
import AssessmentIcon from '@material-ui/icons/Assessment';
import { inject, observer } from 'mobx-react';
import { ROUTER_STORE } from 'app/constants';
import { RouterStore } from 'app/stores';

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

export const SideBar = inject(ROUTER_STORE)(observer((props) => {
    const store = props[ROUTER_STORE] as RouterStore 
    const classes = useStyles();

    //form dialog
    const [openForm, setOpenForm] = React.useState(false);

    const handleClickOpen = () => {
        setOpenForm(true);
    };

    const handleClose = () => {
        setOpenForm(false);
    };

    return <> <Drawer
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
            <ListItem button onClick={handleClickOpen}>  
                <ListItemIcon>
                    <AddCircleOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Create Workspace" />    
            </ListItem>
            <ListItem button component={Link} to="">
                <ListItemIcon>
                    <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Workspace Settings" />
            </ListItem>
            <ListItem button component={Link} to="">
                <ListItemIcon>
                    <AssessmentIcon />
                </ListItemIcon>
                <ListItemText primary="Metrics" />
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem button component={Link} to={store.workspaceUrl}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Deployments" />
            </ListItem>
            <ListItem button component={Link} to="">
                <ListItemIcon>
                    <CodeIcon />
                </ListItemIcon>
                <ListItemText primary="Code" />
            </ListItem>
            <ListItem button component={Link} to={store.workspaceUrl + "/wiki"}>
                <ListItemIcon>
                    <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary="Wiki" />
            </ListItem>
            <ListItem button component={Link} to={store.workspaceUrl + "/tasks"}>
                <ListItemIcon>
                    <FormatListBulletedIcon />
                </ListItemIcon>
                <ListItemText primary="Tasks" />
            </ListItem>
        </List>
    </Drawer>
    <CreateWorkspaceDialog open={openForm} closeDialog={handleClose}/>
    </>

}))