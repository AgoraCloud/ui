import * as React from 'react';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';

import { observer, inject } from 'mobx-react';
import { AUTH_STORE } from 'app/constants';
import { AuthStore } from 'app/stores';

import { Link } from 'react-router-dom';

import { CircularProgress } from '@material-ui/core';
import { AuthWrapper } from 'app/components/Wrapper';
import { useQuery } from 'app/constants/helpers';

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
