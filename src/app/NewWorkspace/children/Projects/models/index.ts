import { APIRepo, CollectionModel, Model } from '@mars-man/models';
import { WorkspaceModel } from 'app/NewWorkspace/models';

export class ProjectsModel extends CollectionModel {
  /**
   * Collection of workspace objects
   */
  repos = {
    main: new APIRepo({ path: this.api }),
    create: new APIRepo({ path: this.api, method: 'POST' }),
  };
  constructor(public workspace: WorkspaceModel) {
    super({
      collections: ProjectModel,
    });
  }

  get api() {
    return `${this.workspace.api}/deployments`;
  }
}
export class ProjectModel extends Model {
  /**
   * A single deployment
   */

  constructor(data, public projects: ProjectsModel) {
    super({ data });
  }
}
