import { APIRepo, CollectionModel, Model } from '@mars-man/models';
import {
  CreateDeploymentFormModel,
  CreateProjectFormModel,
  UpdateWorkspaceFormModel,
} from 'app/res/Workspaces/forms';
import { WorkspaceAdminModel } from '../../Admin/models';
import { DeploymentsModel } from 'app/res/Deployments/models';
import { ProjectsModel } from 'app/res/Projects/models';
import { WikiSectionsModel } from 'app/res/Wiki/models';
import { DeploymentImagesModel } from './DeploymentImages';
import { WorkspacesMetricsModel } from './Metrics';

export class WorkspacesModel extends CollectionModel {
  /**
   * Collection of workspace objects
   */
  repos = {
    main: new APIRepo({ path: this.api }),
    create: new APIRepo({ path: this.api, method: 'POST' }),
  };
  constructor() {
    super({
      collections: WorkspaceModel,
    });

    this.test();
  }

  test = async () => {
    await this.load();
    console.log('workspace', this);
    // console.log(this.workspaces[0].deploymentImages);
  };

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
  metrics: WorkspacesMetricsModel;
  workspaceAdminModel: WorkspaceAdminModel;
  // @observable metrics: WorkspaceMetrics;

  // workspaceAdminStore: WorkspaceAdminStore;

  workspaces: WorkspacesModel;
  repos = {
    update: new APIRepo({ path: this.api, method: 'PUT' }),
  };
  forms = {
    createDeployment: new CreateDeploymentFormModel(this),
    createProject: new CreateProjectFormModel(this),
    update: new UpdateWorkspaceFormModel(this),
  };
  constructor(config) {
    super(config);
    this.workspaces = this.parent as WorkspacesModel;

    // CHILDREN

    this.deployments = new DeploymentsModel(this);
    this.projects = new ProjectsModel(this);
    this.wikiSections = new WikiSectionsModel(this);
    this.deploymentImages = new DeploymentImagesModel(this);
    this.metrics = new WorkspacesMetricsModel(this);
    this.workspaceAdminModel = new WorkspaceAdminModel(this);
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
     * /api/workspaces/{wid}
     */
    return `/api/workspaces/${this.id}`;
  }
}
