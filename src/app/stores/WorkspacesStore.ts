import { RootStore } from 'app/stores/RootStore';
import { observable } from 'mobx';
import { Workspaces, Workspace } from 'app/models';
import { CreateWorkspaceFormModel } from 'app/forms';

export class WorkspacesStore {


   @observable workspaces: Workspaces
   @observable selectedWorkspace: Workspace
   @observable createWorkspaceForm: CreateWorkspaceFormModel
   @observable state: 'loading' | 'loaded' | 'unloaded'
   constructor(private rootStore: RootStore) {
      this.workspaces = new Workspaces()
      this.state = 'unloaded'
      this.createWorkspaceForm = new CreateWorkspaceFormModel()
      // this.load()
   }

   load = async () => {
      this.state = 'loading'
      await this.workspaces.load()
      this.selectedWorkspace = this.workspaces.workspaces[0]
      this.state = 'loaded'
   }

   createWorkspace = async () => {
      const form = this.createWorkspaceForm
      const successful = await form.submit()
      if (successful) {
         this.rootStore.snackbarStore.push({
            message: 'Success: Workspace Created!',
            variant: 'success'
         })
         form.reset()
         this.load()
      } else {
         this.rootStore.snackbarStore.push({
            message: 'Failure: ' + form.message,
            variant: 'error'
         })
      }
      return successful
   }

}