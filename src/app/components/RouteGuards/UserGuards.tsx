import * as React from 'react';
import { observer } from 'mobx-react';
import { useStores } from 'app/stores';
import { AuthedRoute } from './AuthGuards';

export const UserLoaded = observer((props) => {
  const { authstore } = useStores();
  // if (props.path === '/edit-profile') {
  //   routerStore.selected = 100;
  // }

  switch (authstore.user.state) {
    case 'loaded':
      return <AuthedRoute {...props} />;
    default:
      return null;
  }
});
