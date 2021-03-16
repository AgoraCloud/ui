import { observable } from "mobx"
import { Deployments } from "./Deployments"
import { CreateDeploymentFormModel } from "app/forms/Workspace/Deployments/CreateDeployment"
import { WikiSections } from "./Wiki"
import { WorkspacesStore } from "app/stores"
import { DeploymentImages } from "./Images"

export class Workspaces{
    /**
     * Collection of workspace objects
     */

    @observable state: 'loaded'|'error'|'loading'|'unloaded'

    @observable _workspaces: Workspace[] = []
    constructor(public workspacesStore: WorkspacesStore){
        this.state = 'unloaded'
    }

    load = async ( ) => {
        this.state = 'loading'
        const response = await fetch('/api/workspaces', {

        })

        const data = await response.json()
        console.log("workspaces", response, data)
        this._workspaces = data.map((data)=>new Workspace(this, data))
        this.state = 'loaded'
    }

    get workspaces(){
        return this._workspaces || []
    }


    getById = (id?: string): Workspace|undefined => {
        return this.workspaces.filter((w: Workspace)=>w.id === id)[0]
    }
}

interface workspaceData_i{
    users: string[]
    name: string
    id: string
}
export class Workspace{
    /**
     * A single workspace
     */


     deployments: Deployments
     wikiSections: WikiSections
     createDeploymentForm: CreateDeploymentFormModel
     deploymentImages: DeploymentImages
     constructor(public workspaces: Workspaces, public data: workspaceData_i){
        this.deployments = new Deployments(this)
        this.createDeploymentForm = new CreateDeploymentFormModel(this)
        this.wikiSections = new WikiSections(this)
        this.deploymentImages = new DeploymentImages(this)
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