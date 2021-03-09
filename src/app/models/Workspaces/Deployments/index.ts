import { observable, computed } from "mobx"
import { Workspace } from ".."
import { EditDeploymentFormModel } from "app/forms/Workspace/Deployments/CreateDeployment"
import { BaseModelCollection, BaseModelItem } from "app/models/Base"
import { DeploymentMetrics } from "./Metrics"
import { DeploymentLogs } from "./Logs"

export class Deployments extends BaseModelCollection<Deployment>{
    /**
     * A collection of deployments within a workspace
     */

    constructor(public workspace: Workspace) {
        super(Deployment)

        const wid = this.workspace.id
        this.load(`/api/workspaces/${wid}/deployments`)
    }

    @computed
    get deployments() {
        return this.collection || []
    }
}


interface deploymentData_i {
    name: string
    properties: {
        image: string
        name: string
        tag: string
        resources: {
            cpuCount: number
            memoryCount: number
            storageCount?: number
        }
    }
    status: string
    user: string
    workspace: string
    __v: number
    id: string
}
export class Deployment extends BaseModelItem<deploymentData_i>{
    /**
     * A single deployment
     */
    @observable form: EditDeploymentFormModel

    @observable logs: DeploymentLogs
    @observable metrics: DeploymentMetrics
    constructor(public deployments: Deployments, public data: deploymentData_i) {
        super(deployments, data)
        this.form = new EditDeploymentFormModel(this)
        this.form.fromDB(data as any)

        this.logs = new DeploymentLogs(this)
        this.metrics = new DeploymentMetrics(this)
    }


    get id() {
        return this.data.id
    }

    get status() {
        return this.data.status
    }

    get name() {
        return this.data.name
    }


    get resources() {
        return this.data.properties.resources
    }
    get cpuCount() {
        return this.resources.cpuCount

    }
    get memoryCount() {
        return this.resources.memoryCount
    }
    get storageCount() {
        return this.resources.storageCount || 0
    }

    get link() {
        return this.deployments.workspace.link + `d/${this.id}/`
    }
}