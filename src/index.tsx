import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { inject, observer, Provider } from 'mobx-react';
import { App } from 'app';
import { rootStore, history } from 'app/stores/root-store';
import { ThemeProvider } from '@material-ui/core';
import { theme } from 'app/styles/theme';
import { SnackbarManager } from 'app/components/snackbar-manager';
import { Login } from 'app/containers/auth';
import { Router, Switch } from 'react-router';
import { UnauthedRoute } from 'app/components/forms/route-guards/auth';
import { AUTH_STORE } from 'app/constants';
import { AuthStore } from 'app/stores';
import { configure, isBoxedObservable, isObservable, observable } from 'mobx';

// render react DOM
ReactDOM.render(
  <Provider {...rootStore.stores}>
    <ThemeProvider theme={theme}>
      <App history={history} />
    </ThemeProvider>
    <SnackbarManager />
  </Provider>,
  document.getElementById('root'),
);
