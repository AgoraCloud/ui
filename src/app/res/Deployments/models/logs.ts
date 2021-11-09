import { DeploymentModel } from 'app/res/Deployments';
import { APIRepo, Model, OnDemandRepo } from '@mars-man/models';

export class DeploymentLogsModel extends Model<string> {
  constructor(public deployment: DeploymentModel) {
    super({
      data: '',
    });
    this.repos = {
      main: OnDemandRepo(new APIRepo({ path: this.api })),
    };
  }

  get logs() {
    return this.data
    // return JSON.stringify(this.data, null, 4);
  }

  get api() {
    return `${this.deployment.api}/logs`;
  }
}
