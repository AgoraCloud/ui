import {
  AUTH_STORE,
  ROUTER_STORE,
  WORKSPACES_STORE,
  SNACKBAR_STORE,
  UI_STORE,
  ADMIN_STORE,
} from 'app/constants';
import { createBrowserHistory } from 'history';
import {
  AuthStore,
  RouterStore,
  WorkspacesStore,
  SnackbarStore,
  AdminStore,
  UIStore,
} from 'app/stores';

export class RootStore {
  public routerStore: RouterStore;
  public authStore: AuthStore;
  public workspacesStore: WorkspacesStore;
  public snackbarStore: SnackbarStore;
  public uiStore: UIStore;
  public adminStore: AdminStore;

  constructor(history) {
    this.routerStore = new RouterStore(this, history);
    this.authStore = new AuthStore(this);
    this.workspacesStore = new WorkspacesStore(this);
    this.snackbarStore = new SnackbarStore();
    this.uiStore = new UIStore(this);
    this.adminStore = new AdminStore(this);
  }

  get stores() {
    return {
      [ROUTER_STORE]: this.routerStore,
      [AUTH_STORE]: this.authStore,
      [WORKSPACES_STORE]: this.workspacesStore,
      [SNACKBAR_STORE]: this.snackbarStore,
      [UI_STORE]: this.uiStore,
      [ADMIN_STORE]: this.adminStore,
    };
  }

  // get adminStores() {
  //   if (!this.adminStore) this.adminStore = new AdminStore(this);
  //   return {
  //     [ADMIN_STORE]: this.adminStore,
  //     // ...this.stores
  //   };
  // }
}

export const history = createBrowserHistory();

export const rootStore = new RootStore(history);
