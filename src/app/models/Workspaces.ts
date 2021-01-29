import { observable } from "mobx"
import { Deployments } from "./Deployments"

export class Workspaces{
    /**
     * Collection of workspace objects
     */

    @observable state: 'loaded'|'error'|'loading'|'unloaded'

    @observable workspaces: Workspace[] = []
    constructor(){
        this.state = 'unloaded'
    }

    load = async ( ) => {
        this.state = 'loading'
        const response = await fetch('/api/workspaces', {

        })

        const workspacesData = await response.json()
        console.log("workspaces", response, workspacesData)
        this.workspaces = workspacesData.map((data)=>new Workspace(data))
        this.state = 'loaded'

    }
}

interface workspaceData_i{
    users: string[]
    name: string
    _id: string
}
export class Workspace{
    /**
     * A single workspace
     */


     deployments: Deployments
     constructor(public data: workspaceData_i){
        this.deployments = new Deployments(this)
     }


     get _id(){
         return this.data._id
     }

     get name(){
        return this.data.name
     }

     get users(){
         return this.data.users
     }
}