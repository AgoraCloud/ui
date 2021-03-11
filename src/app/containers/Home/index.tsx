import * as React from "react";
// import * as style from './style.scss'
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

// my components
import { DeploymentsList } from "./Deployments";
import { AppMenu } from "app/components/AppMenu";

/**
 * Code Sourced from: https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/dashboard
 * https://material-ui.com/getting-started/templates/dashboard/
 */

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
    },
    // appBarSpacer: theme.mixins.toolbar,
    content: {
      overflow: "auto",
      marginTop: "64px",
      boxSizing: "border-box",
      // flexGrow: 0,
      width: "100%",
      height: `calc(100vh - 64px)`,
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    fixedHeight: {
      height: 240,
    },
  };
});

export const HomeWrapperBase = (props: { children: React.ReactNode }) => {
  const classes = useStyles();
  const { children } = props;
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppMenu />
      <main className={classes.content}>
        {/* <div className={classes.appBarSpacer} /> */}
        {children}
      </main>
    </div>
  );
};

export const HomeWrapper = (props: { children: React.ReactNode }) => {
  const classes = useStyles();
  const { children } = props;
  return (
    <HomeWrapperBase>
      <Container maxWidth={false} className={classes.container}>
        {/* Dashboard Stuff */}

        {children}
      </Container>
    </HomeWrapperBase>
  );
};

export const Home = () => {
  return (
    <HomeWrapper>
      <DeploymentsList />
    </HomeWrapper>
  );
};
