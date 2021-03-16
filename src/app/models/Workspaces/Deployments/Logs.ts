import { Deployment } from "app/models";
import { observable } from "mobx";
import { BaseModel } from "app/models/Base";






export class DeploymentLogs extends BaseModel<string>{

    constructor(public deployment: Deployment){
        super()
    }


    get logs(){
        if(this.state == 'unloaded'){
            this.load()
            return ""
        }
        if(typeof this.responseData === "object") return JSON.stringify(this.responseData)
        return this.responseData
    }

    public async load (){
        const did = this.deployment.id
        const wid = this.deployment.deployments.workspace.id
        await super.load(`/api/workspaces/${wid}/deployments/${did}/logs`, false)
        console.log(this.responseData)
    }
}