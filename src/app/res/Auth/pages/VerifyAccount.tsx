import * as React from 'react';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';

import { observer } from 'mobx-react';
import { useStores } from 'app/stores';

import { Link } from 'react-router-dom';

import { CircularProgress } from '@material-ui/core';
import { AuthWrapper } from 'app/components/Wrapper';
import { useQuery } from 'app/constants/helpers';

export const VerifyAccount = observer((props) => {
  const { authstore } = useStores()

  const query = useQuery();
  const { token } = query;
  const form = authstore.verifyForm;
  React.useEffect(() => {
    form.data.token = token;
    authstore.verify();
  }, []);

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
      <Typography color="error">{form.submit?.data?.message}</Typography>
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
})