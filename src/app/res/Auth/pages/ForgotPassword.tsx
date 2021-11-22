import * as React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { observer, inject } from 'mobx-react';
import { AUTH_STORE } from 'app/constants';
import { AuthStore } from 'app/stores';

import { Input } from 'app/components/inputs';

import { AuthPaper } from 'app/components';
import { events } from '@mars-man/models';
import { types } from 'app/constants';

export const ForgotPassword = inject(AUTH_STORE)(
  observer((props) => {
    const store = props[AUTH_STORE] as AuthStore;
    const form = store.forgotPasswordForm;
    events.on(types.PASSWORD_RESET.onLoad.type, () => {
      form.reset();
    });
    const handleKeyDown = (event) => {
      if (event.key === 'Enter' && form.isValid) {
        store.forgotPassword();
        form.reset();
      }
    };

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <AuthPaper>
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>

          <Input
            form={form}
            id="email"
            label="Email Address"
            onKeyDown={handleKeyDown}
          />
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
