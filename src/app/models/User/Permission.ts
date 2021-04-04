import { BaseModel } from "app/models/Base";
import { Workspace } from "../Workspaces";
import { User, UserModel } from "app/models/User";
import { PermissionsFormModel } from "app/forms";

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


export class UserPermissionsModel extends BaseModel<permission_i>{

    form: PermissionsFormModel
    constructor(public user: UserModel){
        super()
        this.load()
        this.form = new PermissionsFormModel(this)
    }

    get permissions(){
        return this.state === 'loaded' ? this.responseData.permissions : []
    }

    has = (value: string): boolean => {
        return this.permissions.includes(value)
    }

    public async load(){
        await super.load(`/api/users/${this.user.id}/permissions`)
        console.log(this.responseData)
        this.form.data.permissions = this.responseData.permissions
        this.form.data.roles = this.responseData.roles
    }
}