import { Deployment } from './index';
import { BaseModel } from 'app/base-model';

interface metricsData_i {
  cpu: number;
  memory: number;
}

export class DeploymentMetrics extends BaseModel<metricsData_i> {
  constructor(public deployment: Deployment) {
    super();
  }

  get data() {
    if (this.state == 'unloaded') {
      this.load();
      return {} as metricsData_i;
    }

    return this.responseData;
  }

  get memory() {
    return this.data.memory;
  }

  get cpu() {
    // 1000m = 1 cpu core
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

  public async load() {
    const did = this.deployment.id;
    const wid = this.deployment.deployments.workspace.id;
    await super.load(`/api/workspaces/${wid}/deployments/${did}/metrics`);
  }
}
