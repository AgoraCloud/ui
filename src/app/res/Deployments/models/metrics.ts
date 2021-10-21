import { APIRepo, Model, OnDemandRepo } from '@mars-man/models';
import { DeploymentModel } from '.';

interface metricsData_i {
  cpu: number;
  memory: number;
}

export class DeploymentMetricsModel extends Model<metricsData_i> {
  constructor(public deployment: DeploymentModel) {
    super({});

    // this.repos = OnDemandRepo(new APIRepo({ path: this.api }))
    this.repos = {
      main: OnDemandRepo(new APIRepo({ path: this.api }))
    }
  }

  get api() {
    return `${this.deployment.api}/metrics`
  }

  get memory() {
    return this.data.memory;
  }

  get cpu() {
    return this.data.cpu;
  }

  get cpuChart() {
    return {
      data: [
        {
          value: this.cpu,
          gauge: {
            axis: { range: [0, 100] },
          },
          number: { suffix: '%' },
          title: { text: 'CPU Usage' },
          type: 'indicator',
          mode: 'gauge+number',
        },
      ],
    };
  }

  get memoryChart() {
    return {
      data: [
        {
          value: this.memory,
          gauge: {
            axis: { range: [0, 100] },
          },
          number: { suffix: '%' },
          title: { text: 'Memory Usage' },
          type: 'indicator',
          mode: 'gauge+number',
        },
      ],
    };
  }
}
