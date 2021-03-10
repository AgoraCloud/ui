import { RootStore } from 'app/stores/RootStore';
import { observable, computed } from 'mobx';
import { Workspaces, Workspace } from 'app/models';
import { CreateWorkspaceFormModel } from 'app/forms';

export class WorkspacesStore {


   @observable workspaces: Workspaces
   @observable _selectedWorkspace: Workspace
   @observable createWorkspaceForm: CreateWorkspaceFormModel


   constructor(private rootStore: RootStore) {
      this.workspaces = new Workspaces()
      this.createWorkspaceForm = new CreateWorkspaceFormModel()
      // this.load()
   }


   get createDeploymentForm(){
      return this.selectedWorkspace.createDeploymentForm
   }

   get state(){
      return this.workspaces.state
   }

   load = async () => {
      await this.workspaces.load()
      this._selectedWorkspace = this.workspaces.workspaces[0]
   }



   
   @computed
   get selectedDeployment(){
      this.workspaces.workspaces
      const pathname = this.rootStore.routerStore.location.pathname
      try{
         const matches = pathname.match(/\/w\/(?<wid>[a-zA-Z0-9]{24})\/d\/(?<did>[a-zA-Z0-9]{24})/)
         const {wid, did} = matches?.groups as any
   
         const workspace = this.workspaces.getById(wid)
         const deployment = workspace?.deployments?.getById(did)
         // const page = section?.wikiPages.getById(pageid)
   
         return deployment
   
      }catch(e){
         return undefined
      }
   }

   get selectedWiki(){
      const pathname = this.rootStore.routerStore.location.pathname
      try{
         const matches = pathname.match(/\/w\/(?<wid>[a-zA-Z0-9]{24})\/wiki\/(?<sectionid>[a-zA-Z0-9]{24})\/pages\/(?<pageid>[a-zA-Z0-9]{24})/)
         const {wid, sectionid, pageid} = matches?.groups as any
   
         const workspace = this.workspaces.getById(wid)
         const section = workspace?.wikiSections.getById(sectionid)
         const page = section?.wikiPages.getById(pageid)
   
         return page
   
      }catch(e){
         return undefined
      }
   }
   get selectedWorkspace(){
      const matches = this.rootStore.routerStore.location.pathname.match(/\/w\/(?<wid>[a-zA-Z0-9]{24})/)
      const wid = matches?.groups?.wid 
      const workspace = this.workspaces.getById(wid)
      this._selectedWorkspace = workspace || this._selectedWorkspace
      return this._selectedWorkspace
   }


   

   set selectedWorkspace(workspace: Workspace){
      this._selectedWorkspace = workspace
      const wid = workspace.id
      const path = this.rootStore.routerStore.location.pathname

      // the following will retain any values in the path after the workspace id
      // this may be problematic if for say the path is 
      // /w/:wID/d/:dID because the updated wID will not have the deployment with dID within it
      // TODO: this will have to be more sophisticated
      // const newPath = path.replace(/\/w\/[a-zA-Z0-9]{24}/, `/w/${wid}`)
      const newPath = `/w/${wid}/`
      this.rootStore.routerStore.replace(newPath)
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