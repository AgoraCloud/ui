import * as React from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { observer, inject } from 'mobx-react';
import { AUTH_STORE } from 'app/constants'
import { AuthStore } from 'app/stores';

import { Link } from 'react-router-dom'
import { Input } from 'app/components/Inputs';
import { useLocation } from 'react-router';

import qs from 'qs'
import { CircularProgress } from '@material-ui/core';
import { AuthPaper } from 'app/components/Paper';



/**
 * Code sourced from https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-in
 * https://material-ui.com/getting-started/templates/sign-in/
 */

export const Login = inject(AUTH_STORE)(observer((props) => {
    const store = props[AUTH_STORE] as AuthStore
    const form = store.loginForm

    return <Container component="main" maxWidth="xs">
        <CssBaseline />
        <AuthPaper>
            <Avatar>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Log in
            </Typography>
            <Input form={form} id="email" label="Email Address" autoFocus />
            <Input form={form} id="password" type="password" label="Password" autoComplete="current-password" />
            <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={store.login}
                disabled={!form.isValid}
            >
                Log In
          </Button>
            <Grid container>
                <Grid item xs>
                    <Link to="/forgotPassword">
                        Forgot password?
                    </Link>
                </Grid>
                <Grid item>
                    <Link to="/signup">
                        {"Don't have an account? Sign Up"}
                    </Link>
                </Grid>
            </Grid>
        </AuthPaper>
    </Container>
}))




export const Signup = inject(AUTH_STORE)(observer((props) => {
    const store = props[AUTH_STORE] as AuthStore
    const form = store.signupForm
    
    // const [requestStatus, setRequestStatus] = React.useState<any>({
    //     code: "",
    //     message:""
    // });
    // const [state, setState] = React.useState<SignupState>({
    //     open: false,
    //     vertical: 'bottom',
    //     horizontal: 'center',
    // });

    const handleSignup = async () => {
        await store.signup()
        //const response = store.serverResponse

        // switch (response.status) {
        //     case 400: {
        //         setRequestStatus({
        //             code: 400,
        //             message: "The email you entered is already in use!"
        //         })
        //         break;
        //     }
        //     case 201: {
        //         setRequestStatus({
        //             code: 201,
        //             message: "Registered! Please check your email to verify your account."
        //         })
        //         break;
        //     }
        //     default: {
        //         setRequestStatus({
        //             code: response.status,
        //             message: "Sorry, there was an error in the server!"
        //         })
        //         break;
        //     }
        // }

        // setState(prevValue => {
        //     return {
        //         ...prevValue,
        //         open: true
        //     }
        // });
     
    }

    // const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    //     if (reason === 'clickaway') {
    //       return;
    //     }
    
    //     setState(prevValue => {
    //         return {
    //             ...prevValue,
    //             open: false
    //         }
    //     });
    // };

    return <Container component="main" maxWidth="xs">
        <CssBaseline />
        <AuthPaper>
            <Avatar>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign Up
            </Typography>

            <Input form={form} id="fullName" label="Full Name" autoFocus />
            <Input form={form} id="email" label="Email Address" />
            <Input form={form} id="password" type="password" label="Password" autoComplete="current-password" />
            <Button
                fullWidth
                variant="contained"
                color="primary"
                // onClick={handleSignup}
                onClick={store.signup}
                disabled={!form.isValid}
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
            {/* <Snackbar open={state.open} autoHideDuration={6000} onClose={handleClose}> 
                <Alert onClose={handleClose} severity={ requestStatus.code === 201  ? "success" : "error"}> { requestStatus.message } </Alert>       
            </Snackbar> */}
        </AuthPaper>
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
    const [verified, setVerified] = React.useState<boolean|undefined>(undefined)
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