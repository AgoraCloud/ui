import {
  APIRepo,
  CollectionModel,
  Model,
  PeriodicRepo,
} from '@mars-man/models';
import { DeploymentLogsModel } from 'app/res/Deployments/models/logs';
import { DeploymentMetricsModel } from 'app/res/Deployments/models/metrics';
import { WorkspaceModel } from 'app/res/Workspaces/models';
import { EditDeploymentFormModel } from '../forms';

interface deploymentData_i {
  name: string;
  properties: {
    image: string;
    name: string;
    tag: string;
    proxyUrl: string;
    resources: {
      cpuCount: number;
      memoryCount: number;
      storageCount?: number;
    };
  };
  status: string;
  user: string;
  workspace: string;
  __v: number;
  id: string;
}

export class DeploymentsModel extends CollectionModel<deploymentData_i[]> {
  /**
   * Collection of workspace objects
   */

  constructor(public workspace: WorkspaceModel) {
    super({
      collections: DeploymentModel,
    });
    this.repos = {
      main: PeriodicRepo(new APIRepo({ path: this.api })),
      create: new APIRepo({ path: this.api, method: 'POST' }),
    };
  }
  postLoad = async () => {
    console.log('deployments loaded');
  };
  get deployments(): DeploymentModel[] {
    return (this.collection.models || []) as DeploymentModel[];
  }
  get api() {
    return `${this.workspace.api}/deployments`;
  }
}

export class DeploymentModel extends Model<deploymentData_i> {
  /**
   * A single deployment
   */
  deployments: DeploymentsModel;
  logs: DeploymentLogsModel;
  metrics: DeploymentMetricsModel;
  workspace: WorkspaceModel;

  delete: APIRepo;
  constructor({ data, parent, parentCollection }) {
    super({ data });
    this.deployments = parent;
    this.workspace = this.deployments.workspace;
    // console.log(this.deployments, data, parentCollection)
    this.logs = new DeploymentLogsModel(this);
    this.metrics = new DeploymentMetricsModel(this);
    this.dependents = [this.logs, this.metrics];
    this.forms = {
      edit: new EditDeploymentFormModel(this),
    };

    this.delete = new APIRepo({ path: this.api, method: 'DELETE' });
    this.repos = {
      delete: this.delete,
    };
  }

  get name() {
    return this.data.name;
  }

  get status() {
    return this.data.status;
  }

  get id() {
    return this.data.id;
  }

  get link() {
    return `${this.deployments.workspace.link}/d/${this.id}`;
  }

  get api() {
    return `${this.deployments.api}/${this.id}`;
  }

  get cpuCount() {
    return this.data.properties.resources.cpuCount;
  }
  get memoryCount() {
    return this.data.properties.resources.memoryCount;
  }
  get storageCount() {
    return this.data.properties.resources.storageCount;
  }

  get proxyUrl() {
    return this.data.properties.proxyUrl;
  }
}
