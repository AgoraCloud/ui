import { APIRepo, CollectionModel, Model } from '@mars-man/models';
import {
  CreateProjectFormModel,
  CreateWorkspaceFormModel,
  UpdateWorkspaceFormModel,
} from 'app/res/Workspaces/forms';
import { WorkspaceAdminModel } from 'app/res/Workspaces/Admin/models';
import { DeploymentsModel } from 'app/res/Deployments/models';
import { ProjectsModel } from 'app/res/Projects/models';
import { WikiSectionsModel } from 'app/res/Wiki/models';
import { DeploymentImagesModel } from './DeploymentImages';
import { WorkspaceMetricsModel } from './Metrics';
import { add, reload, remove, update } from 'app/constants/helpers';
import { rootStore } from 'app/stores';
import { CreateDeploymentFormModel } from 'app/res/Deployments';

export * from './DeploymentImages';
export * from './Metrics';

export class WorkspacesModel extends CollectionModel {
  /**
   * Collection of workspace objects
   */

  createWorkspaceForm: CreateWorkspaceFormModel;
  constructor() {
    super({
      collections: WorkspaceModel,
    });

    this.createWorkspaceForm = new CreateWorkspaceFormModel();

    add(this, this.createWorkspaceForm.submit);

    this.repos = {
      main: new APIRepo({ path: this.api }),
      create: new APIRepo({ path: this.api, method: 'POST' }),
    };
  }

  get api() {
    return '/api/workspaces';
  }

  get workspaces(): WorkspaceModel[] {
    return (this.collection.models || []) as WorkspaceModel[];
  }

  get selectedWorkspace() {
    return this.workspaces[0];
  }

  get workspaceUrl() {
    return `/w/${this.selectedWorkspace.id}`;
  }
  postLoad = async () => {
    // console.log('workspaces loaded');
  };
  // getById = (id?: string): Workspace | undefined => {
  //     return this.workspaces.filter((w: Workspace) => w.id === id)[0];
  // };
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
export class WorkspaceModel extends Model<workspaceData_i> {
  /**
   * A single workspace
   */

  // deployments: Deployments;
  // projects: Projects;
  wikiSections: WikiSectionsModel;
  deploymentImages: DeploymentImagesModel;
  deployments: DeploymentsModel;
  projects: ProjectsModel;
  metrics: WorkspaceMetricsModel;
  workspaceAdmin: WorkspaceAdminModel;
  // @observable metrics: WorkspaceMetrics;

  // workspaceAdminStore: WorkspaceAdminStore;

  workspaces: WorkspacesModel;

  // forms
  updateWorkspace: UpdateWorkspaceFormModel;
  createDeployment: CreateDeploymentFormModel;
  // createProject: CreateProjectFormModel;
  delete: APIRepo;
  constructor(config) {
    super(config);
    this.workspaces = this.parent as WorkspacesModel;

    this.repos = {
      update: new APIRepo({ path: this.api, method: 'PUT' }),
      createDeployment: new APIRepo({
        path: `${this.api}/deployments`,
        method: 'POST',
      }),
    };

    // Repos
    this.delete = new APIRepo({ path: this.api, method: 'DELETE' });

    // Forms
    this.updateWorkspace = new UpdateWorkspaceFormModel(this);
    // this.createProject = new CreateProjectFormModel(this);

    this.forms = {
      createDeployment: this.createDeployment,
      // createProject: this.createProject,
      update: this.updateWorkspace,
    };

    // CHILDREN

    this.deployments = new DeploymentsModel(this);
    this.projects = new ProjectsModel(this);
    this.wikiSections = new WikiSectionsModel(this);
    this.deploymentImages = new DeploymentImagesModel(this);
    this.metrics = new WorkspaceMetricsModel(this);
    this.workspaceAdmin = new WorkspaceAdminModel(this);

    this.dependents = [
      this.deployments,
      this.deploymentImages,
      this.workspaceAdmin,
      this.metrics,
      this.wikiSections,
      this.projects
    ];

    update(this, this.updateWorkspace.submit);
    remove(this, this.delete);
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
    return `/w/${this.id}`;
  }

  get api() {
    /**
     * /api/workspaces/{wid}
     */
    return `/api/workspaces/${this.id}`;
  }

  onDelete = async () => {
    await this.delete.call();
    if (this.delete.state === 'loaded') rootStore.routerStore.push('/');
  };
}
