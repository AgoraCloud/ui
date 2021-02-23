import { observable } from "mobx"
import { Workspace } from "."

export class Deployments{
    /**
     * A collection of deployments within a workspace
     */

    @observable state: 'loaded'|'error'|'loading'|'unloaded'

    @observable _deployments: Deployment[]
    constructor(public workspace: Workspace){
        this.state = 'unloaded'
        this.load()
    }

    load = async ( ) => {
        this.state = 'loading'
        const wid = this.workspace.id
        const response = await fetch(`/api/workspaces/${wid}/deployments`, {

        })
        const deploymentsData = await response.json()
        console.log("deployments", response, deploymentsData)
        this._deployments = deploymentsData.map((data)=>new Deployment(this, data))
        // this._deployments = [...this._deployments, ...this._deployments, ...this._deployments, ...this._deployments, ...this._deployments,...this._deployments, ...this._deployments, ...this._deployments, ...this._deployments, ...this._deployments]
        this.state = 'loaded'
    }

    get deployments(){
        return this._deployments || []
    }
}


interface deploymentData_i{
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
export class Deployment{
    /**
     * A single deployment
     */
     constructor(public deployments: Deployments, public data: deploymentData_i){

     }


     get id(){
         return this.data.id
     }

     get status(){
         return this.data.status
     }

     get name(){
        return this.data.name
     }


     get resources(){
         return this.data.properties.resources
     }
     get cpuCount(){
        return this.resources.cpuCount

     }
     get memoryCount(){
         return this.resources.memoryCount
     }
     get storageCount(){
         return this.resources.storageCount || 0
     }

     get link(){
         return this.deployments.workspace.link + `d/${this.id}/`
     }
}