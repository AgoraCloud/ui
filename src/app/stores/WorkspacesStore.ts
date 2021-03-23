import { RootStore } from 'app/stores/RootStore';
import { observable, computed } from 'mobx';
import { Workspaces, Workspace } from 'app/models';
import { CreateWorkspaceFormModel } from 'app/forms';
import { events, eventTypes } from 'app/constants';

export class WorkspacesStore {


   @observable workspaces: Workspaces
   @observable _selectedWorkspace: Workspace
   @observable createWorkspaceForm: CreateWorkspaceFormModel

   @observable wikiEdit: boolean
   constructor(private rootStore: RootStore) {
      this.workspaces = new Workspaces(this)
      this.createWorkspaceForm = new CreateWorkspaceFormModel()
      // this.load()
      this.wikiEdit = false

      this.initEvents()
   }


   get createDeploymentForm(){
      return this.selectedWorkspace.createDeploymentForm
   }

   get createProjectForm(){
      return this.selectedWorkspace.createProjectForm
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

   @computed
   get selectedProject(){
      this.workspaces.workspaces
      const pathname = this.rootStore.routerStore.location.pathname
      try{
         const matches = pathname.match(/\/w\/(?<wid>[a-zA-Z0-9]{24})\/p\/(?<pid>[a-zA-Z0-9]{24})/)
         const {wid, pid} = matches?.groups as any
   
         const workspace = this.workspaces.getById(wid)
         const project = workspace?.projects?.getById(pid)
         // const page = section?.wikiPages.getById(pageid)
   
         return project
   
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
         events.emit(eventTypes.WORKSPACE_CRUD, 'created')
         form.reset()
      } else {
         events.emit(eventTypes.WORKSPACE_ERR, form.message)
      }
      return successful
   }

   updateWorkspace = async () => {
      const form = this.selectedWorkspace.updateWorkspaceForm
      const successful = await form.submit(this.selectedWorkspace.id)
      if (successful) {
         events.emit(eventTypes.WORKSPACE_CRUD, 'updated')
      } else {
         events.emit(eventTypes.WORKSPACE_ERR, form.message)
      }
      return successful
   }

   deleteWorkspace = async () => {
      const form = this.selectedWorkspace.updateWorkspaceForm
      const successful = await form.delete(this.selectedWorkspace.id)
      if (successful) {
         events.emit(eventTypes.WORKSPACE_CRUD, 'deleted')
      } else {
         events.emit(eventTypes.WORKSPACE_ERR, form.message)
      }
      return successful
   }


   initEvents = () => {
      events.on(eventTypes.WORKSPACE_CRUD, ()=>{
         this.load()
      })
   }

}