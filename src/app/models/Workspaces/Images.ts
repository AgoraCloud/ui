import { Workspace } from "app/models";
import { BaseModel } from "app/models/Base";




interface images_i{
    name: string
    tag: string
}

export class DeploymentImages extends BaseModel<images_i[]>{

    constructor(public workspace: Workspace){
        super()
        this.load()
    }


    get images(){
        if(this.state === 'loaded') return this.responseData.map((d)=>({value: d, label: `${d.name} ${d.tag}`}))
        return []
    }

    public async load (){
        const wid = this.workspace.id
        await super.load(`/api/workspaces/${wid}/deployments/images`)
    }
}