import { Deployments } from "./Deployments"
import { CreateDeploymentFormModel } from "app/forms/Workspace/Deployments/CreateDeployment"
import { WikiSections } from "./Wiki"
import { BaseModelCollection, BaseModelItem } from "../Base"

export class Workspaces extends BaseModelCollection<Workspace>{
    /**
     * Collection of workspace objects
     */


    constructor(){
        super(Workspace)
    }

    load = async ( ) => {
        await super.load('/api/workspaces')
    }

    get workspaces(){
        return this.collection || []
    }
}

interface workspaceData_i{
    users: string[]
    name: string
    id: string
}
export class Workspace extends BaseModelItem<workspaceData_i>{
    /**
     * A single workspace
     */


     deployments: Deployments
     wikiSections: WikiSections
     createDeploymentForm: CreateDeploymentFormModel
     constructor(public workspaces: Workspaces, public data: workspaceData_i){
        super(workspaces, data)
        this.deployments = new Deployments(this)
        this.createDeploymentForm = new CreateDeploymentFormModel(this)
        this.wikiSections = new WikiSections(this)

     }


     get id(){
         return this.data.id
     }

     get name(){
        return this.data.name
     }

     get users(){
         return this.data.users
     }

     get link(){
         return `/w/${this.id}/`
     }
}