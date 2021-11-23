import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

import { observer, inject } from 'mobx-react';
import { AUTH_STORE } from 'app/constants';
import { AuthStore } from 'app/stores';

import { Link } from 'react-router-dom';
import { Input } from 'app/components/inputs';

import { AuthWrapper } from 'app/components/Wrapper';

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
