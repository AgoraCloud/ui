import * as React from 'react';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';

import { observer, inject } from 'mobx-react';
import { AUTH_STORE } from 'app/constants';
import { AuthStore } from 'app/stores';

import { Link } from 'react-router-dom';
import { Input } from 'app/components/inputs';

import { CircularProgress } from '@material-ui/core';
import { AuthWrapper } from 'app/components/Wrapper';
import { useQuery } from 'app/constants/helpers';

import { events } from '@mars-man/models';
import { types } from 'app/constants';

export const ChangePassword = inject(AUTH_STORE)(
  observer((props) => {
    // two input fields password, confirm password
    const store = props[AUTH_STORE] as AuthStore;
    // console.log('CHANGE PASSWORD');
    const query = useQuery();
    const { token } = query;
    const form = store.changePasswordForm;
    React.useEffect(() => {
      form.data.token = token;
    }, []);
    events.on(types.CHANGE_PASSWORD.onLoad.type, () => {
      form.reset();
    });
    const handleKeyDown = (event) => {
      if (event.key === 'Enter' && form.isValid) {
        store.changePassword();
      }
    };

    if (form.submit.state == 'loading') {
      return (
        <AuthWrapper>
          <CircularProgress />
        </AuthWrapper>
      );
    }

    if (form.submit.state == 'loaded') {
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
          onKeyDown={handleKeyDown}
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
