import * as React from 'react'
// import * as style from './style.scss'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

// my components
import { WorkspaceSelect } from 'app/components/Inputs'
import { DeploymentsList } from './Deployments';
import { TopAndSideBar } from 'app/components/TopAndSideBar';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

/**
 * Code Sourced from: https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/dashboard
 * https://material-ui.com/getting-started/templates/dashboard/
 */


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    fixedHeight: {
        height: 240,
    },
}));


export const Home = () => {
    const classes = useStyles();

    return <div className={classes.root}>
        <CssBaseline />
        <TopAndSideBar>
            <WorkspaceSelect />
        </TopAndSideBar>
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                {/* Dashboard Stuff */}
                <DeploymentsList />
            </Container>

            <Fab color="secondary" aria-label="add" style={{
                position: "absolute",
                bottom: "40px",
                right: "50px"
            }}>
                <AddIcon />
            </Fab>
        </main>
    </div>
}