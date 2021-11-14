import {
  APIRepo,
  CollectionModel,
  Model,
  PeriodicRepo,
} from '@mars-man/models';
import { add, reload, remove, update } from 'app/constants/helpers';
import { DeploymentLogsModel } from 'app/res/Deployments/models/logs';
import { DeploymentMetricsModel } from 'app/res/Deployments/models/metrics';
import { WorkspaceModel } from 'app/res/Workspaces/models';
import { CreateDeploymentFormModel, EditDeploymentFormModel } from '../forms';

interface deploymentData_i {
  name: string;
  createdAt: string
  updatedAt: string
  properties: {
    image: {
      type: string
      version: string
    };
    name: string;
    tag: string;
    proxyUrl: string;
    scalingMethod: 'ON_DEMAND' | 'ALWAYS_ON'
    isFavorite: boolean
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
  // create: APIRepo;
  createDeployment: CreateDeploymentFormModel;
  /**
   * Collection of workspace objects
   */

  constructor(public workspace: WorkspaceModel) {
    super({
      collections: DeploymentModel,
    });

    this.createDeployment = new CreateDeploymentFormModel(this);
    this.repos = {
      main: PeriodicRepo(new APIRepo({ path: this.api }), 5000),
      // main: new APIRepo({ path: this.api }),
    };

    add(this, this.createDeployment.submit);
  }
  postLoad = async () => {
    console.log('deployments loaded');
  };
  get deployments(): DeploymentModel[] {
    let out = (this.collection.models || []) as DeploymentModel[];
    return out.slice().sort((a,b)=>Date.parse(a.createdAt) - Date.parse(b.createdAt))
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
  start: APIRepo;
  stop: APIRepo;
  unfavorite: APIRepo;
  favorite: APIRepo;
  upgrade: APIRepo;
  constructor({ data, parent, parentCollection }) {
    super({ data, parentCollection, parent });
    this.deployments = parent;
    this.workspace = this.deployments.workspace;
    // console.log(this.deployments, data, parentCollection)
    this.logs = new DeploymentLogsModel(this);
    this.metrics = new DeploymentMetricsModel(this);


    this.start = new APIRepo({
      path: `${this.api}/on`,
      method: 'PUT'
    })
    this.stop = new APIRepo({
      path: `${this.api}/off`,
      method: 'PUT'
    })

    this.dependents = [this.logs, this.metrics];
    this.forms = {
      edit: new EditDeploymentFormModel(this),
    };

    this.delete = new APIRepo({ path: this.api, method: 'DELETE' });
    this.favorite = new APIRepo({ path: this.api, method: 'PUT', body: {
      properties: {
        isFavorite: true
      }
    } });
    this.unfavorite = new APIRepo({ path: this.api, method: 'PUT', body: {
      properties: {
        isFavorite: false
      }
    } });


    this.upgrade = new APIRepo({path: this.api, method: 'PUT', body: this.upgradeBody})

    this.repos = {
      delete: this.delete,
    };

    remove(this, this.delete);
    update(this, [this.favorite, this.unfavorite, this.upgrade])
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



  /**
   * 
   * Upgrade Section
   */

  upgradeBody = () => {
    return {
      properties: {
        image: {
          type: this.data.properties.image.type,
          version: this.workspace.deploymentImages.getLatest(this.data.properties.image.type)
        }  
      }
    }
  }

  get isUpgradeable(){
    const latestVersion = this.workspace.deploymentImages.getLatest(this.data.properties.image.type)

    return this.data.properties.image.version !== latestVersion
  }


  get scalingMethod(){
    return this.data.properties.scalingMethod
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


  get isFavorite(){
    return this.data.properties.isFavorite
  }


  get createdAt(){
    return this.data.createdAt
  }

  get updatedAt(){
    return this.data.updatedAt
  }
}
