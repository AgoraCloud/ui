import { APIRepo, Model } from '@mars-man/models';
import { WorkspaceModel } from '.';

export class WorkspacesMetricsModel extends Model {
  constructor(public workspace: WorkspaceModel) {
    super({});
    this.repos = {
      main: new APIRepo({path: this.api})
    }
  }

  get api(){
    return `${this.workspace}/metrics`
  }
}
