import { Model, APIRepo } from '@mars-man/models';
import { WorkspaceModel } from 'app/NewWorkspace/models';

export class DeploymentImages extends Model {
  repos = {
    main: new APIRepo({ path: this.api })
  }
  constructor(public workspace: WorkspaceModel) {
    super({});

    // autoload
    this.load();
  }

  get api() {
    return `${this.workspace.api}/deployments/images/`;
  }
}
