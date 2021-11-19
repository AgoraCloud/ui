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
import { ProjectModel } from 'app/res/Projects';

export class WorkspacesStore {
  // @observable workspaces: Workspaces;
  @observable _selectedWorkspace?: WorkspaceModel;

  @observable wikiEdit: boolean;
  workspaces: WorkspacesModel;

  @observable
  count = 0;
  constructor(private rootStore: RootStore) {
    this.workspaces = new WorkspacesModel();
    this.wikiEdit = false;

    makeObservable(this);

    events.on(types.USERLOAD.onLoad.type, () => {
      this.workspaces.load();
    });
  }

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
    const { wid } = this.rootStore.routerStore.params;
    let selectedWorkspace: WorkspaceModel | undefined = undefined;
    if (wid) {
      // if the URL parameter includes a wid
      selectedWorkspace = this.workspaces.getBy('id', wid)[0] as WorkspaceModel;
    } else if (this._selectedWorkspace !== undefined) {
      // if the _selectedWorkspace is already defined
      selectedWorkspace = this._selectedWorkspace;
    } else if(this.workspaces.workspaces.length > 0) {
      // if there is no _selectedWorkspace
      // TODO return favorite workspace
      selectedWorkspace = this.workspaces.workspaces[0];
    }
    this._selectedWorkspace = selectedWorkspace;
    return selectedWorkspace;
  }

  get selectedDeployment() {
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
    const { pageId } = this.rootStore.routerStore.params;
    if (this.selectedWikiSection) {
      return this.selectedWikiSection.wikiPages.getBy(
        'id',
        pageId,
      )[0] as WikiPageModel;
    }
    return undefined;
  }

  get selectedProject() {
    const { projectId } = this.rootStore.routerStore.params;
    if (this.selectedWorkspace) {
      return this.selectedWorkspace.projects.getBy(
        'id',
        projectId,
      )[0] as ProjectModel;
    }
    return undefined;
  }
}
