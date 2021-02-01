import * as React from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Checkbox from '@material-ui/core/Checkbox';

import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { observer, inject } from 'mobx-react'
import { AUTH_STORE } from 'app/constants'
import { AuthStore } from 'app/stores';

import { Link } from 'react-router-dom'
import { Input } from 'app/components/Inputs';
import { useLocation } from 'react-router';

import qs from 'qs'
import { CircularProgress } from '@material-ui/core';



/**
 * Code sourced from https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-in
 * https://material-ui.com/getting-started/templates/sign-in/
 */
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export const Login = inject(AUTH_STORE)(observer((props) => {
    const store = props[AUTH_STORE] as AuthStore
    const form = store.loginForm
    const classes = useStyles();

    return <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Log in
            </Typography>
            <Input form={form} id="email" label="Email Address" autoFocus />
            <Input form={form} id="password" type="password" label="Password" autoComplete="current-password" />

            <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
            />
            <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={store.login}
            >
                Log In
          </Button>
            <Grid container>
                <Grid item xs>
                    <Link href="/forgotPassword">
                        Forgot password?
                    </Link>
                </Grid>
                <Grid item>
                    <Link to="/signup">
                        {"Don't have an account? Sign Up"}
                    </Link>
                </Grid>
            </Grid>
        </div>
    </Container>
}))




export const Signup = inject(AUTH_STORE)(observer((props) => {
    const store = props[AUTH_STORE] as AuthStore
    const form = store.signupForm
    const classes = useStyles();

    return <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign Up
            </Typography>

            <Input form={form} id="fullName" label="Full Name" autoFocus />
            <Input form={form} id="email" label="Email Address" />
            <Input form={form} id="password" type="password" label="Password" autoComplete="current-password" />
            <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
            />
            <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={store.signup}
            >
                Sign Up
          </Button>
            <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item>
                    <Link to="/login">
                        {"Already have an account? Log In!"}
                    </Link>
                </Grid>
            </Grid>
        </div>
    </Container>
}))


export const ForgotPassword = () => {
    return null
}

export const ChangePassword = () => {
    return null
}


function useQuery() {
    return qs.parse(useLocation().search, { ignoreQueryPrefix: true });
}

export const VerifyAccount = inject(AUTH_STORE)(observer((props) => {
    const store = props[AUTH_STORE] as AuthStore

    let query = useQuery();
    const [verified, setVerified] = React.useState(undefined)
    const { token } = query
    const form = store.verifyForm
    React.useEffect(() => {
        store.verifyForm.data.token = token
        store.verify().then((v)=>{
            setVerified(v)
        })
    }, [])


    if (form.state.loading) return <CircularProgress />

    if (verified) {
        return <div>
            Account Succesfully Verified!
        <Link to="login">
                Click here to login
        </Link>
        </div>
    }else{
        return <div>
            {form.message}
        </div>
    }
}))