import { RootStore } from 'app/stores/RootStore';
import { extendObservable, makeObservable, observable } from 'mobx';
import { WorkspaceModel, WorkspacesModel } from 'app/res/Workspaces/models';
import { DeploymentModel } from 'app/res/Deployments/models';
import {
  WikiPageModel,
  WikiSectionModel,
  WikiSectionsModel,
} from 'app/res/Wiki';
import { events } from '@mars-man/models';
import { types } from 'app/constants';

export class WorkspacesStore {
  // @observable workspaces: Workspaces;
  @observable _selectedWorkspace?: WorkspaceModel;

  @observable wikiEdit: boolean;
  workspaces: WorkspacesModel;

  @observable
  count = 0;
  constructor(private rootStore: RootStore) {
    // this.workspaces = new Workspaces(this);
    this.workspaces = new WorkspacesModel();
    this.wikiEdit = false;

    makeObservable(this);

    // rootStore.authStore.user.repo?.onLoad.subscribe((val) => {
    //   // console.log("authstore onload", val)
    //   this.workspaces.load();
    // });

    events.on(types.USERLOAD.onLoad.type, ()=>{
      this.workspaces.load()
    })
  }

  // get createDeploymentForm() {
  //   return this.selectedWorkspace.createDeploymentForm;
  // }

  // get createProjectForm() {
  //   return this.selectedWorkspace.createProjectForm;
  // }

  selectWorkspace = (wid: string) => {
    const selectedWorkspace = this.workspaces.getBy(
      'id',
      wid,
    )[0] as WorkspaceModel;
    if (selectedWorkspace) this.selectedWorkspace = selectedWorkspace;
  };

  set selectedWorkspace(workspace: WorkspaceModel | undefined) {
    if (!workspace) return;
    this.rootStore.routerStore.push(workspace.link);
    this._selectedWorkspace = this.selectedWorkspace;
  }
  get selectedWorkspace(): WorkspaceModel | undefined {
    // const params = useParams<{wid: string}>()

    const { wid } = this.rootStore.routerStore.params;
    let selectedWorkspace: WorkspaceModel | undefined = undefined;
    if (wid) {
      // if the URL parameter includes a wid
      selectedWorkspace = this.workspaces.getBy('id', wid)[0] as WorkspaceModel;
    } else if (this._selectedWorkspace !== undefined) {
      // if the _selectedWorkspace is already defined
      selectedWorkspace = this._selectedWorkspace;
    } else {
      // if there is no _selectedWorkspace
      // TODO return favorite workspace
      selectedWorkspace = this.workspaces.workspaces[0];
    }
    this._selectedWorkspace = selectedWorkspace;
    return selectedWorkspace;
  }

  get selectedDeployment() {
    // const params = useParams<{wid: string, did: string}>()
    const { did } = this.rootStore.routerStore.params;

    if (this.selectedWorkspace) {
      return this.selectedWorkspace.deployments.getBy(
        'id',
        did,
      )[0] as DeploymentModel;
    }
    return undefined;
  }

  get selectedWikiSection() {
    // const params = useParams<{wid: string, did: string}>()
    const { sectionId } = this.rootStore.routerStore.params;

    if (this.selectedWorkspace) {
      return this.selectedWorkspace.wikiSections.getBy(
        'id',
        sectionId,
      )[0] as WikiSectionModel;
    }
    return undefined;
  }
  get selectedWikiPage() {
    // const params = useParams<{wid: string, did: string}>()
    const { pageId } = this.rootStore.routerStore.params;
    if (this.selectedWikiSection) {
      return this.selectedWikiSection.wikiPages.getBy(
        'id',
        pageId,
      )[0] as WikiPageModel;
    }
    return undefined;
  }

  // @computed
  // get selectedProject() {
  //   this.workspaces.workspaces;
  //   const pathname = this.rootStore.routerStore.location.pathname;
  //   try {
  //     const matches = pathname.match(
  //       /\/w\/(?<wid>[a-zA-Z0-9]{24})\/p\/(?<pid>[a-zA-Z0-9]{24})/,
  //     );
  //     const { wid, pid } = matches?.groups as any;

  //     const workspace = this.workspaces.getById(wid);
  //     const project = workspace?.projects?.getById(pid);
  //     return project;
  //   } catch (e) {
  //     return undefined;
  //   }
  // }

  // get selectedWiki() {
  //   const pathname = this.rootStore.routerStore.location.pathname;
  //   try {
  //     const matches = pathname.match(
  //       /\/w\/(?<wid>[a-zA-Z0-9]{24})\/wiki\/(?<sectionId>[a-zA-Z0-9]{24})\/pages\/(?<pageId>[a-zA-Z0-9]{24})/,
  //     );
  //     const { wid, sectionId, pageId } = matches?.groups as any;

  //     const workspace = this.workspaces.getById(wid);
  //     const section = workspace?.wikiSections.getById(sectionId);
  //     if (section?.wikiPages?.state != 'loaded') return undefined;
  //     const page = section?.wikiPages.getById(pageId);
  //     if (page) workspace?.wikiSections.selectPage(page);
  //     return page;
  //   } catch (e) {
  //     return undefined;
  //   }
  // }
  // get selectedWorkspace() {
  //   const matches = this.rootStore.routerStore.location.pathname.match(
  //     /\/w\/(?<wid>[a-zA-Z0-9]{24})/,
  //   );
  //   const wid = matches?.groups?.wid;
  //   const workspace = this.workspaces.getById(wid);
  //   this._selectedWorkspace = workspace || this._selectedWorkspace;
  //   return this._selectedWorkspace;
  // }

  // set selectedWorkspace(workspace: Workspace) {
  //   this._selectedWorkspace = workspace;
  //   const wid = workspace.id;
  //   const path = this.rootStore.routerStore.location.pathname;

  //   // the following will retain any values in the path after the workspace id
  //   // this may be problematic if for say the path is
  //   // /w/:wID/d/:dID because the updated wID will not have the deployment with dID within it
  //   // TODO: this will have to be more sophisticated
  //   // const newPath = path.replace(/\/w\/[a-zA-Z0-9]{24}/, `/w/${wid}`)
  //   const newPath = `/w/${wid}/`;
  //   this.rootStore.routerStore.replace(newPath);
  // }

  // createWorkspace = async () => {
  //   const form = this.createWorkspaceForm;
  //   const successful = await form.submit();
  //   if (successful) {
  //     events.emit(eventTypes.WORKSPACE_CRUD.type, 'created');
  //     form.reset();
  //   } else {
  //     events.emit(eventTypes.WORKSPACE_ERR.type, form.message);
  //   }
  //   return successful;
  // };

  // updateWorkspace = async () => {
  //   const form = this.selectedWorkspace.updateWorkspaceForm;
  //   const successful = await form.submit(this.selectedWorkspace.id);
  //   if (successful) {
  //     events.emit(eventTypes.WORKSPACE_CRUD.type, 'updated');
  //   } else {
  //     events.emit(eventTypes.WORKSPACE_ERR.type, form.message);
  //   }
  //   return successful;
  // };

  // deleteWorkspace = async () => {
  //   const form = this.selectedWorkspace.updateWorkspaceForm;
  //   const successful = await form.delete(this.selectedWorkspace.id);
  //   if (successful) {
  //     events.emit(eventTypes.WORKSPACE_CRUD.type, 'deleted');
  //   } else {
  //     events.emit(eventTypes.WORKSPACE_ERR.type, form.message);
  //   }
  //   return successful;
  // };

  // initEvents = () => {
  //   events.on(eventTypes.WORKSPACE_CRUD.type, () => {
  //     this.load();
  //   });
  //   events.on(eventTypes.WORKSPACE_CRUD.type, async () => {
  //     await this.load();
  //     const newPath = `/w/${
  //       this.workspaces.workspaces[this.workspaces.workspaces.length - 1].id
  //     }/`;
  //     this.rootStore.routerStore.replace(newPath);
  //   });
  // };
}
