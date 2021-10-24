import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { AUTH_STORE, USER_STORE } from 'app/constants';
import { AuthStore, UserStore } from 'app/stores';
import { Redirect, Route } from 'react-router';
import { useStores } from 'app/stores';

export const AuthedRoute = observer((props) => {
  const { authstore } = useStores();
  console.log(authstore.state);
  if (authstore.state == 'unauthed') return <Redirect to="/login" />;
  switch (authstore.state) {
    case 'loggedin':
      return <Route {...props} />;
    default:
      return null;
  }
});

export const UnauthedRoute = observer((props) => {
  // const store = props[AUTH_STORE] as AuthStore;
  const { authstore } = useStores();

  // const userStore = props[USER_STORE] as UserStore
  // if(userStore.state != 'loaded') return null
  switch (authstore.state) {
    case 'loggedin':
      return <Redirect to="/" />;
    case 'unauthed':
      return <Route {...props} />;
    default:
      return null;
  }
});