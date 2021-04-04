import { History } from "history";
import { RouterStore as BaseRouterStore, syncHistoryWithStore } from "mobx-react-router";
import { RootStore } from "app/stores/RootStore";

export class RouterStore extends BaseRouterStore {
  private selectedIndex = 0;

  constructor(private rootStore: RootStore, history?: History) {
    super();
    if (history) {
      this.history = syncHistoryWithStore(history, this);
    }
  }

  get workspaceUrl() {
    const wid = this.rootStore.workspacesStore.selectedWorkspace?.id;
    return `/w/${wid}`;
  }

  get selected(): number {
    return this.selectedIndex;
  }

  set selected(index: number) {
    this.selectedIndex = index;
  }
}
