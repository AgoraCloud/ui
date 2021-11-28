import * as React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useStores } from 'app/stores';
// import * as style from './style.scss'
import clsx from 'clsx';
import { makeStyles, alpha } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { WorkspaceSelect } from 'app/res/Workspaces/views/WorkspaceSelect';

// icons
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

/**
 * Code Sourced from: https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/dashboard
 * https://material-ui.com/getting-started/templates/dashboard/
 */

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    marginTop: 5,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // borderRadius: '20px'
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  accountIcon: {
    position: 'absolute',
    right: '0px',
  },
}));

export const WorkspaceTopBar = observer((props) => {
  const { uistore, authstore } = useStores();
  const classes = useStyles();

  //account icon handlers
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openAccount = Boolean(anchorEl);
  const open = uistore.sideBarOpen;
  const handleAccountMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleIconClose = () => {
    setAnchorEl(null);
  };
  const handleSignOut = async () => {
    await authstore.logout();
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="absolute"
      className={clsx(classes.appBar, open && classes.appBarShift)}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={uistore.toggleSidebar}
          className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        <WorkspaceSelect />

        <div className={classes.accountIcon}>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleAccountMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={openAccount}
            onClose={handleIconClose}
          >
            <MenuItem button component={Link} to="/edit-profile">
              My Profile
            </MenuItem>
            <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
});

export const TopBar = observer((props) => {
  const { uistore, authstore } = useStores();
  const classes = useStyles();

  //account icon handlers
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openAccount = Boolean(anchorEl);
  const open = uistore.sideBarOpen;
  const handleAccountMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleIconClose = () => {
    setAnchorEl(null);
  };
  const handleSignOut = async () => {
    await authstore.logout();
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="absolute"
      className={clsx(classes.appBar, open && classes.appBarShift)}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={uistore.toggleSidebar}
          className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>

        <div className={classes.accountIcon}>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleAccountMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={openAccount}
            onClose={handleIconClose}
          >
            <MenuItem button component={Link} to="/edit-profile">
              My Profile
            </MenuItem>
            <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
});
