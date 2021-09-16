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
import { configure, isBoxedObservable, observable } from 'mobx';

// render react DOM
// ReactDOM.render(
//   <Provider {...rootStore.stores}>
//     <ThemeProvider theme={theme}>
//       <App history={history} />
//     </ThemeProvider>
//     <SnackbarManager />
//   </Provider>,
//   document.getElementById('root'),
// );

/**
 * https://github.com/mobxjs/mobx/blob/d216e5ee979b134631a4a7e71320269452a997d0/packages/mobx/src/errors.ts#L69
 */
configure({ isolateGlobalState: true });

class Teststore {
  @observable state: 'on' | 'off' = 'off';
  constructor() {
    setTimeout(() => {
      console.log('SWITCH');
      this.state = 'on';
    }, 2000);

    console.log(isBoxedObservable(this.state));
  }
}

const Test = inject('test')(
  observer((props) => {
    const store = props['test'] as AuthStore;
    // const recurse = () => {
    //   setTimeout(()=>{
    //     console.log("STATE", store.state)
    //     recurse()
    //   }, 1000)
    // }
    // recurse()

    return <div>state {store.state}</div>;
  }),
);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    {/* <Provider {...rootStore.stores}> */}
    <Provider
      {...{
        test: new Teststore(),
      }}
    >
      {/* <App history={history} /> */}
      <Router history={history}>
        <Switch>
          {/* <UnauthedRoute path="/login" component={Login} /> */}
        </Switch>
      </Router>
      <div>Test</div>
      <Test />
      {/* <SnackbarManager /> */}
    </Provider>
  </ThemeProvider>,
  document.getElementById('root'),
);
