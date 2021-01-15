import { ROUTER_STORE, AUTH_STORE } from 'app/constants';
import { createBrowserHistory } from 'history';
import {RouterStore, AuthStore} from 'app/stores';


export class RootStore {


    public routerStore: RouterStore
    public authStore: AuthStore
    constructor(history) {
        this.routerStore = new RouterStore(this, history);
        this.authStore = new AuthStore(this);
    }

    get stores() {
        return {
            [ROUTER_STORE]: this.routerStore,
            [AUTH_STORE]: this.authStore,
        };
    }

}

export const history = createBrowserHistory();

export const rootStore = new RootStore(history) 