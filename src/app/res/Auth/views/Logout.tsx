import { useStores } from 'app/stores';
import { observer } from 'mobx-react';
import * as React from 'react';

export const Logout = observer((props) => {
  const { authstore } = useStores();
  React.useEffect(() => {
    authstore.logout();
  }, []);
  return null;
});
