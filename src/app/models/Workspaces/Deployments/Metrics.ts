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
            return {}
        }

        return this.responseData
    }

    get memory(){
        if(this.data?.memory) return Number(this.data.memory.replace('Ki', ''))/1048576
        return 0
    }

    get cpu(){
        // 1000m = 1 cpu core
        if(this.data?.cpu) return Number(this.data.cpu.replace('m', ''))/1000
        return 0
    }

    get cpuChart() {
        return {
            data: [{
                value: this.cpu,
                gauge: {
                    axis: { range: [0, this.deployment.cpuCount] },
                },
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
                    axis: { range: [0, this.deployment.memoryCount] },
                },
                title: { text: "Memory Usage" },
                type: "indicator",
                mode: "gauge+number"
            }]
        }
    }

    public async load() {
        const did = this.deployment.id
        const wid = this.deployment.deployments.workspace.id
        // this.state = 'loaded'
        await super.load(`/api/workspaces/${wid}/deployments/${did}/metrics`)
        this.responseData = {
            cpu: '50m',
            memory: '143928Ki'
        }
        console.log(this.responseData)
    }
}