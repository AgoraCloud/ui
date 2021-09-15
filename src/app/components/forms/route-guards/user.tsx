import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { USER_STORE, ROUTER_STORE } from 'app/constants';
import { UserStore, RouterStore } from 'app/stores';
import { AuthedRoute } from './auth';

export const UserLoaded = inject(
  USER_STORE,
  ROUTER_STORE,
)(
  observer((props) => {
    const store = props[USER_STORE] as UserStore;
    const routerStore = props[ROUTER_STORE] as RouterStore;

    if (props.path === '/edit-profile') {
      routerStore.selected = 100;
    }

    switch (store.state) {
      // case 'unauthed' : return <Redirect to='/login'/>
      case 'loaded':
        return <AuthedRoute {...props} />;
      default:
        return null;
    }
  }),
);
