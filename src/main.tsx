import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { App } from 'app';
import { rootStore, history } from 'app/stores/RootStore';

// render react DOM
ReactDOM.render(
  <Provider {...rootStore.stores}>
    <App history={history} />
  </Provider>,
  document.getElementById('root')
);

