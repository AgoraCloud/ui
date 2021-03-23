import { Deployment } from "app/models";
import { observable } from "mobx";
import { BaseModel } from "app/models/Base";


interface metricsData_i {
    cpu: string
    memory: string
}

export class DeploymentMetrics extends BaseModel<metricsData_i>{

    constructor(public deployment: Deployment) {
        super()
    }


    get data() {
        if (this.state == 'unloaded') {
            this.load()
            return {} as metricsData_i
        }

        return this.responseData
    }

    get memory(){
        let out = 0;
        if(this.data?.memory) out = Number(this.data.memory.replace('Ki', ''))/1048576
        return out
    }

    get cpu(){
        // 1000m = 1 cpu core
        let out = 0;
        if(this.data?.cpu) out = Number(this.data.cpu.replace('m', ''))/1000
        if(this.data?.cpu && !out) out = Number(this.data.cpu.replace('n', ''))/10000000
        return out
    }

    get cpuChart() {
        return {
            data: [{
                value: this.cpu,
                gauge: {
                    axis: { range: [0, 100] },
                },
                number: { suffix: "%" },
                title: { text: "CPU Usage" },
                type: "indicator",
                mode: "gauge+number"
            }]
        }
    }

    get memoryChart() {
        return {
            data: [{
                value: this.memory,
                gauge: {
                    axis: { range: [0, 100] },
                },
                number: { suffix: "%" },
                title: { text: "Memory Usage" },
                type: "indicator",
                mode: "gauge+number"
            }]
        }
    }

    public async load() {
        const did = this.deployment.id
        const wid = this.deployment.deployments.workspace.id
        await super.load(`/api/workspaces/${wid}/deployments/${did}/metrics`)
        console.log(this.responseData)
    }
}