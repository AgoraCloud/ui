import { APIRepo, CollectionModel, Model } from '@mars-man/models';
import { WorkspaceModel } from 'app/res/Workspaces/models';

export class DeploymentsModel extends CollectionModel {
  /**
   * Collection of workspace objects
   */

  constructor(public workspace: WorkspaceModel) {
    super({
      collections: DeploymentModel,
    });
    this.repos = {
      main: new APIRepo({ path: this.api }),
      create: new APIRepo({ path: this.api, method: 'POST' }),
    };
  }

  get api() {
    return `${this.workspace.api}/deployments`;
  }
}




export class DeploymentModel extends Model {
  /**
   * A single deployment
   */

  constructor(data, public deploymentsModel: DeploymentsModel) {
    super({ data });
  }
}
