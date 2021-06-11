import { observable } from 'mobx';
import { Deployments } from './Deployments';
import { Projects } from './Projects';
import { CreateDeploymentFormModel } from 'app/forms/Workspace/Deployments/CreateDeployment';
import { CreateProjectFormModel } from 'app/forms/Workspace/Projects/CreateProject';
import { UpdateWorkspaceFormModel } from 'app/forms/Workspace/UpdateWorkspace';
import { WikiSectionsModel } from './Wiki';
import { WorkspacesStore, WorkspaceAdminStore } from 'app/stores';
import { DeploymentImages } from './Images';
import { WorkspaceMetrics } from './Metrics';
import { UpdateWorkspaceResourcesDto } from 'app/forms/validators';

export class Workspaces {
  /**
   * Collection of workspace objects
   */

  @observable state: 'loaded' | 'error' | 'loading' | 'unloaded';

  @observable _workspaces: Workspace[] = [];
  constructor(public workspacesStore: WorkspacesStore) {
    this.state = 'unloaded';
  }

  load = async () => {
    this.state = 'loading';
    const response = await fetch('/api/workspaces', {});

    const data = await response.json();
    console.log('workspaces', response, data);
    this._workspaces = data.map((data) => new Workspace(this, data));
    this.state = 'loaded';
  };

  get workspaces() {
    return this._workspaces || [];
  }

  getById = (id?: string): Workspace | undefined => {
    return this.workspaces.filter((w: Workspace) => w.id === id)[0];
  };
}

interface workspaceData_i {
  users: string[];
  name: string;
  properties: {
    resources: {
      cpuCount: number;
      memoryCount: number;
      storageCount: number;
    };
  };
  id: string;
}
export class Workspace {
  /**
   * A single workspace
   */

  deployments: Deployments;
  projects: Projects;
  wikiSections: WikiSectionsModel;
  createDeploymentForm: CreateDeploymentFormModel;
  createProjectForm: CreateProjectFormModel;
  deploymentImages: DeploymentImages;
  updateWorkspaceForm: UpdateWorkspaceFormModel;
  @observable metrics: WorkspaceMetrics;

  workspaceAdminStore: WorkspaceAdminStore;
  constructor(public workspaces: Workspaces, public data: workspaceData_i) {
    this.deployments = new Deployments(this);
    this.projects = new Projects(this);
    this.createDeploymentForm = new CreateDeploymentFormModel(this);
    this.createProjectForm = new CreateProjectFormModel(this);
    this.updateWorkspaceForm = new UpdateWorkspaceFormModel();
    this.wikiSections = new WikiSectionsModel(this);
    this.deploymentImages = new DeploymentImages(this);
    this.metrics = new WorkspaceMetrics(this);

    this.workspaceAdminStore = new WorkspaceAdminStore(this);
  }

  get id() {
    return this.data.id;
  }

  get name() {
    return this.data.name;
  }

  get users() {
    return this.data.users;
  }

  get resources() {
    return this.data.properties.resources;
  }
  get cpuCount() {
    return this.resources.cpuCount;
  }
  get memoryCount() {
    return this.resources.memoryCount;
  }
  get storageCount() {
    return this.resources.storageCount || 0;
  }

  get link() {
    /**
     * @info has trailing slash
     */
    return `/w/${this.id}/`;
  }

  get api() {
    /**
     * /api/workspaces/{wid}/
     */
    return `/api/workspaces/${this.id}/`;
  }

  get workspaceData() {
    let { name, properties } = this.data;
    name = name ? this.data.name : '';
    const resources: UpdateWorkspaceResourcesDto = properties?.resources;
    let newProperties = {
      resources: {
        cpuCount: resources?.cpuCount ? Number(resources.cpuCount) : undefined,
        memoryCount: resources?.memoryCount
          ? Number(resources.memoryCount)
          : undefined,
        storageCount: resources?.storageCount
          ? Number(resources.storageCount)
          : undefined,
      },
    };
    return {
      name,
      properties: newProperties,
    };
  }
}
