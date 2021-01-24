import { ROUTER_STORE, AUTH_STORE, WORKSPACES_STORE } from 'app/constants';
import { createBrowserHistory } from 'history';
import {RouterStore, AuthStore, WorkspacesStore} from 'app/stores';


export class RootStore {


    public routerStore: RouterStore
    public authStore: AuthStore
    public workspacesStore: WorkspacesStore
    constructor(history) {
        this.routerStore = new RouterStore(this, history);
        this.authStore = new AuthStore(this);
        this.workspacesStore = new WorkspacesStore(this)
    }

    get stores() {
        return {
            [ROUTER_STORE]: this.routerStore,
            [AUTH_STORE]: this.authStore,
            [WORKSPACES_STORE]: this.workspacesStore
        };
    }

}

export const history = createBrowserHistory();

export const rootStore = new RootStore(history) 