import { RootStore } from 'app/stores/RootStore';
import { observable } from 'mobx';
import { Workspaces, Workspace } from 'app/models';

export class WorkspacesStore {


   @observable workspaces: Workspaces
   @observable selectedWorkspace: Workspace
   @observable state: 'loading' | 'loaded' | 'unloaded'
   constructor(private rootStore: RootStore) {
      this.workspaces = new Workspaces()
      this.state = 'unloaded'
      // this.load()
   }

   load = async () => {
      this.state = 'loading'
      await this.workspaces.load()
      this.selectedWorkspace = this.workspaces.workspaces[0]
      this.state = 'loaded'
   }



}