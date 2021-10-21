import { DeploymentModel } from '.';
import { APIRepo, Model, OnDemandRepo } from '@mars-man/models';

export class DeploymentLogsModel extends Model<string> {
  constructor(public deployment: DeploymentModel) {
    super({
      data: '',
    });
    this.repos = OnDemandRepo(new APIRepo({ path: this.api }));
  }

  get logs() {
    return JSON.stringify(this.data);
  }

  get api() {
    return `${this.deployment.api}/logs`;
  }
}
