import * as React from 'react';
// import * as style from './style.scss'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

// my components
import { WorkspaceAppMenu, AppMenu } from 'app/components/Wrapper/menu';
import { ConfirmDeleteDialog } from 'app/components/dialogs';

export * from './AuthWrapper';

/**
 * Code Sourced from: https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/dashboard
 * https://material-ui.com/getting-started/templates/dashboard/
 */

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: 'flex',
    },
    // appBarSpacer: theme.mixins.toolbar,
    content: {
      overflow: 'auto',
      marginTop: '69px',
      boxSizing: 'border-box',
      // flexGrow: 0,
      width: '100%',
      height: `calc(100vh - 64px)`,
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
      height: "100%"
    },
    fixedHeight: {
      height: 240,
    },
  };
});

export const ProxyWrapper = (props: {
  children: React.ReactChild | React.ReactChild[];
}) => {
  const classes = useStyles();
  const { children } = props;
  return (
    <div className={classes.root}>
      <WorkspaceAppMenu />
      <main className={classes.content}>
          {children}
      </main>
      <ConfirmDeleteDialog />
    </div>
  );
};

interface HomeWrapper_i {
  children: React.ReactChild | React.ReactChild[];
}

export const WorkspaceWrapperBase = (props: HomeWrapper_i) => {
  const { children } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <WorkspaceAppMenu />
      <main className={classes.content}>{children}</main>
      <ConfirmDeleteDialog />
    </div>
  );
};

export const WorkspaceWrapper = (props: HomeWrapper_i) => {
  const { children } = props;
  const classes = useStyles();

  return (
    <WorkspaceWrapperBase>
      <Container maxWidth={false} className={classes.container}>
        {children}
      </Container>
    </WorkspaceWrapperBase>
  );
};

export const HomeWrapper = (props: HomeWrapper_i) => {
  const classes = useStyles();
  const { children } = props;
  return (
    <div className={classes.root}>
      {/* <CssBaseline /> */}
      <AppMenu />
      <main className={classes.content}>
        {/* <div className={classes.appBarSpacer} /> */}
        <Container maxWidth={false} className={classes.container}>
          {children}
        </Container>
      </main>
      <ConfirmDeleteDialog />
    </div>
  );
};
