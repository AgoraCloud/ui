import { History } from 'history';
import {
  RouterStore as BaseRouterStore,
  syncHistoryWithStore,
} from 'mobx-react-router';
import { RootStore } from 'app/stores/root-store';

export class RouterStore extends BaseRouterStore {
  constructor(public rootStore: RootStore, history?: History) {
    super();
    if (history) {
      this.history = syncHistoryWithStore(history, this);
    }
  }

  get workspaceUrl() {
    const wid = this.rootStore.workspacesStore.selectedWorkspace?.id;
    return `/w/${wid}`;
  }
}
