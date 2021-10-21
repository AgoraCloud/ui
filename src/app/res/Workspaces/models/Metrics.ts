import { APIRepo, Model } from '@mars-man/models';
import { WorkspaceModel } from '.';

export class WorkspaceMetricsModel extends Model {
  constructor(public workspace: WorkspaceModel) {
    super({});
    this.repos = {
      main: new APIRepo({ path: this.api }),
    };
  }

  get api() {
    return `${this.workspace.api}/metrics`;
  }



  get memory() {
    return this.data.memory;
  }

  get cpu() {
    // 1000m = 1 cpu core
    return this.data.cpu;
  }

  get storage() {
    return this.data.storage;
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

  get storageChart() {
    return {
      data: [
        {
          value: this.storage,
          gauge: {
            axis: { range: [0, 100] },
          },
          number: { suffix: '%' },
          title: { text: 'Storage Usage' },
          type: 'indicator',
          mode: 'gauge+number',
        },
      ],
    };
  }
}
