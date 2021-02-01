import { observable } from "mobx"
import { Workspace } from "./Workspaces"

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
        const wid = this.workspace._id
        const response = await fetch(`/api/workspaces/${wid}/deployments`, {

        })
        const deploymentsData = await response.json()
        console.log("deployments", response, deploymentsData)
        this._deployments = deploymentsData.map((data)=>new Deployment(data))
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
    }
    resources: {
        cpuCount: number
        memoryCount: number
    }
    status: string
    user: string
    workspace: string
    __v: number
    _id: string
}
export class Deployment{
    /**
     * A single deployment
     */
     constructor(public data: deploymentData_i){

     }


     get _id(){
         return this.data._id
     }

     get name(){
        return this.data.name
     }

}