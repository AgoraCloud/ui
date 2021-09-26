import { APIRepo, CollectionModel, Model } from '@mars-man/models';
import { WorkspaceModel } from 'app/NewWorkspace/models';

export class DeploymentsModel extends CollectionModel {
  /**
   * Collection of workspace objects
   */
  repos = {
    main: new APIRepo({ path: this.api }),
    create: new APIRepo({ path: this.api, method: 'POST' }),
  };
  constructor(public workspace: WorkspaceModel) {
    super({
      collections: DeploymentModel,
    });
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
