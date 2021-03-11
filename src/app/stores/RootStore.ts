import { ROUTER_STORE, AUTH_STORE, WORKSPACES_STORE, SNACKBAR_STORE, USER_STORE } from 'app/constants';
import { createBrowserHistory } from 'history';
import {RouterStore, AuthStore, WorkspacesStore, SnackbarStore, UserStore} from 'app/stores';


export class RootStore {


    public routerStore: RouterStore
    public authStore: AuthStore
    public workspacesStore: WorkspacesStore
    public snackbarStore: SnackbarStore
    public userStore: UserStore
    constructor(history) {
        this.routerStore = new RouterStore(this, history);
        this.authStore = new AuthStore(this);
        this.workspacesStore = new WorkspacesStore(this)
        this.snackbarStore = new SnackbarStore()
        this.userStore = new UserStore(this)
    }

    get stores() {
        return {
            [ROUTER_STORE]: this.routerStore,
            [AUTH_STORE]: this.authStore,
            [WORKSPACES_STORE]: this.workspacesStore,
            [SNACKBAR_STORE]: this.snackbarStore,
            [USER_STORE]: this.userStore
        };
    }

}

export const history = createBrowserHistory();

export const rootStore = new RootStore(history) 