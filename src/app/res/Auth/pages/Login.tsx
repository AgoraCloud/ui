import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

import { observer } from 'mobx-react';
import { useStores } from 'app/stores';

import { Link } from 'react-router-dom';
import { Input } from 'app/components/inputs';

import { AuthWrapper } from 'app/components/Wrapper';

import { events } from '@mars-man/models';
import { types } from 'app/constants';

/**
 * Code sourced from https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-in
 * https://material-ui.com/getting-started/templates/sign-in/
 */

export const Login = observer((props) => {
  const { authstore } = useStores();
  const form = authstore.signinForm;
  events.on(types.SIGNIN.onLoad.type, () => {
    form.reset();
  });
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && form.isValid) {
      authstore.login();
    }
  };

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
      <Input form={form} id="email" label="Email Address" autoFocus />
      <Input
        form={form}
        id="password"
        type="password"
        label="Password"
        autoComplete="current-password"
        onKeyDown={handleKeyDown}
      />

      <Button
        fullWidth
        variant="contained"
        color="primary"
        type="submit"
        onClick={authstore.login}
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
});
