import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { App } from 'app';
import { rootStore, history } from 'app/stores/RootStore';
import { ThemeProvider } from '@material-ui/core';
import { theme } from 'app/styles/theme';
import { SnackbarManager } from 'app/components/SnackbarManager';

// render react DOM
ReactDOM.render(
  <Provider {...rootStore.stores}>
      <ThemeProvider theme={theme}>
        <App history={history} />
      </ThemeProvider>
    <SnackbarManager/>
  </Provider>,
  document.getElementById('root')
);

