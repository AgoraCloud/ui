import { BaseModel } from "app/models/Base";
import { Workspace } from "../Workspaces";
import { User } from "app/models/User";

interface permission_i{
    id: string
    roles: string[]
    permissions: string[]
}
export class Permissions extends BaseModel<permission_i>{
    
    constructor(public user: User){
        super()
        this.load()
    }

    public async load(){
        await super.load('/api/user/permissions')
    }
}

export class WorkspacePermissions extends BaseModel<permission_i>{
    constructor(public user: User, public workspace: Workspace){
        super()
    }

    public async load(){
        await super.load(`${this.workspace.api}users/${this.user.id}`)
    }
}