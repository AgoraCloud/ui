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

        return this.responseData
    }

    public async load (){
        const did = this.deployment.id
        const wid = this.deployment.deployments.workspace.id
        super.load(`/api/workspaces/${wid}/deployments/${did}/logs`)
    }
}