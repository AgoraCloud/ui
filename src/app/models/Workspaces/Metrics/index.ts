import { Workspace } from 'app/models';
import { observable } from 'mobx';
import { BaseModel } from 'app/models/Base';

interface metricsData_i {
  cpu: string;
  memory: string;
  storage: string;
  status: string;
}

export class WorkspaceMetrics extends BaseModel<metricsData_i> {
  constructor(public workspace: Workspace) {
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

  get storage() {
    // 1000m = 1 cpu core
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

  public async load() {
    const wid = this.workspace.id;
    await super.load(`/api/workspaces/${wid}/metrics`);
    console.log('joking reeee');
    console.log(this.responseData);
  }
}
