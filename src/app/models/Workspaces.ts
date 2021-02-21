import { observable } from "mobx"
import { Deployments } from "./Deployments"

export class Workspaces{
    /**
     * Collection of workspace objects
     */

    @observable state: 'loaded'|'error'|'loading'|'unloaded'

    @observable _workspaces: Workspace[] = []
    constructor(){
        this.state = 'unloaded'
    }

    load = async ( ) => {
        this.state = 'loading'
        const response = await fetch('/api/workspaces', {

        })

        const workspacesData = await response.json()
        console.log("workspaces", response, workspacesData)
        this._workspaces = workspacesData.map((data)=>new Workspace(this, data))
        this.state = 'loaded'
    }

    get workspaces(){
        return this._workspaces || []
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
     constructor(public workspaces: Workspaces, public data: workspaceData_i){
        this.deployments = new Deployments(this)
     }


     get id(){
         return this.data._id
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