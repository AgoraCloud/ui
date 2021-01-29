import * as React from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField, { StandardTextFieldProps } from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import { observer, inject } from 'mobx-react';
import { AUTH_STORE } from 'app/constants'
import { AuthStore } from 'app/stores';
import { BaseFormModel } from 'app/forms';

import { Link } from 'react-router-dom'


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
    }
}));

export interface SignupState extends SnackbarOrigin {
    open: boolean;
}

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


interface InputProps extends StandardTextFieldProps {
    form: BaseFormModel<any, any>
    id: string
}
export const Input = observer((props: InputProps) => {
    const { form, id, ...rest } = props
    const val = form.data[id]
    return <TextField
        onChange={form.onInputChange(id)}
        error={form.getError(id) != undefined && val != ""}
        // helperText={form.getError(id)} // to be implemented (currently all errors are just 'error')
        value={val}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id={id}
        name={id}
        {...rest}
    />
})

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
    
    const [statusMessage, setStatusMessage] = React.useState<String>("");

    const [state, setState] = React.useState<SignupState>({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
    });
    const { vertical, horizontal, open } = state;

    

    const handleSignup = async () => {
        await store.signup()
        setStatusMessage(store.serverResponse.statusText)
        setState(prevValue => {
            return {
                ...prevValue,
                open: true
            }
        });
      
    }

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setState(prevValue => {
            return {
                ...prevValue,
                open: false
            }
        });
      };

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
            <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSignup}
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
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}> 
                <Alert onClose={handleClose} severity={ statusMessage === "Bad Request" ? "error" : "success"}> {statusMessage} </Alert>
            </Snackbar>
        </div>
    </Container>
}))