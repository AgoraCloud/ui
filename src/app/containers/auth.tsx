import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { observer, inject } from 'mobx-react';
import { AUTH_STORE } from 'app/constants';
import { AuthStore } from 'app/stores';

import { Link } from 'react-router-dom';
import { Input } from 'app/components/inputs';
import { useLocation } from 'react-router';

import qs from 'qs';
import { CircularProgress } from '@material-ui/core';
import { AuthPaper } from 'app/components/paper';

/**
 * Code sourced from https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-in
 * https://material-ui.com/getting-started/templates/sign-in/
 */

export const AuthWrapper = (props) => {
  const { children } = props;
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <AuthPaper>{children}</AuthPaper>
    </Container>
  );
};

export const Login = inject(AUTH_STORE)(
  observer((props) => {
    const store = props[AUTH_STORE] as AuthStore;
    const form = store.loginForm;

    // const onFormSubmit = (e) => {
    //     e.preventDefault();
    //     store.login();
    // }

    return (
      <AuthWrapper>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        {/* <form onSubmit={onFormSubmit}> */}
        <Input form={form} id="email" label="Email Address" autoFocus />
        <Input
          form={form}
          id="password"
          type="password"
          label="Password"
          autoComplete="current-password"
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          onClick={store.login}
          disabled={!form.isValid}
        >
          Log In
        </Button>
        {/* </form> */}
        <Grid container>
          <Grid item xs>
            <Link to="/forgotPassword">Forgot password?</Link>
          </Grid>
          <Grid item>
            <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
          </Grid>
        </Grid>
      </AuthWrapper>
    );
  }),
);

export const Signup = inject(AUTH_STORE)(
  observer((props) => {
    const store = props[AUTH_STORE] as AuthStore;
    const form = store.signupForm;

    return (
      <AuthWrapper>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>

        <Input form={form} id="fullName" label="Full Name" autoFocus />
        <Input form={form} id="email" label="Email Address" />
        <Input
          form={form}
          id="password"
          type="password"
          label="Password"
          autoComplete="current-password"
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={store.signup}
          disabled={!form.isValid}
        >
          Sign Up
        </Button>
        <Grid container>
          <Grid item xs></Grid>
          <Grid item>
            <Link to="/login">{'Already have an account? Log In!'}</Link>
          </Grid>
        </Grid>
      </AuthWrapper>
    );
  }),
);

export const ForgotPassword = inject(AUTH_STORE)(
  observer((props) => {
    const store = props[AUTH_STORE] as AuthStore;
    const form = store.forgotPasswordForm;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <AuthPaper>
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>

          <Input form={form} id="email" label="Email Address" />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={store.forgotPassword}
            disabled={!form.isValid}
          >
            Send Reset Link
          </Button>
        </AuthPaper>
      </Container>
    );
  }),
);

export const ChangePassword = inject(AUTH_STORE)(
  observer((props) => {
    // two input fields password, confirm password
    const store = props[AUTH_STORE] as AuthStore;

    const query = useQuery();
    const { token } = query;
    const form = store.changePasswordForm;
    React.useEffect(() => {
      form.data.token = token;
    }, []);

    if (form.state.loading) {
      return (
        <AuthWrapper>
          <CircularProgress />
        </AuthWrapper>
      );
    }

    if (form.success) {
      return (
        <AuthWrapper>
          <Typography>Success</Typography>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            component={Link}
            to="login"
          >
            Click here to login
          </Button>
        </AuthWrapper>
      );
    }

    return (
      <AuthWrapper>
        <Typography>Change Password</Typography>
        <Input
          form={form}
          id="password"
          type="password"
          label="Password"
          autoComplete="current-password"
        />

        <Input
          form={form}
          id="confirmPassword"
          type="password"
          label="Confirm Password"
          autoComplete="current-password"
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          disabled={!form.isValid}
          onClick={() => {
            store.changePassword();
          }}
        >
          Change Password
        </Button>
      </AuthWrapper>
    );
  }),
);

function useQuery() {
  return qs.parse(useLocation().search, { ignoreQueryPrefix: true });
}

export const VerifyAccount = inject(AUTH_STORE)(
  observer((props) => {
    const store = props[AUTH_STORE] as AuthStore;

    const query = useQuery();
    const { token } = query;
    const form = store.verifyForm;
    React.useEffect(() => {
      form.data.token = token;
      store.verify();
    }, []);

    if (form.state.loading) {
      return (
        <AuthWrapper>
          <CircularProgress />
        </AuthWrapper>
      );
    }
    if (form.success) {
      return (
        <AuthWrapper>
          <Typography>Account Succesfully Verified!</Typography>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            component={Link}
            to="login"
          >
            Click here to login
          </Button>
        </AuthWrapper>
      );
    }
    return (
      <AuthWrapper>
        <Typography color="error">{form.message}</Typography>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          component={Link}
          to="login"
        >
          Go back to Log In
        </Button>
      </AuthWrapper>
    );
  }),
);
