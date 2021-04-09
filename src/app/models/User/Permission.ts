import { BaseModel, BaseModelCollection } from "app/models/Base";
import { Workspace } from "../Workspaces";
import { User, UserModel, WorkspaceUserModel } from "app/models/User";
import { PermissionsFormModel, WorkspacePermissionsFormModel } from "app/forms";

interface permission_i{
    id: string
    roles: string[]
    permissions: string[]
}
interface userPermissions_i extends permission_i{
    workspaces: {[wid: string]: permission_i}
}

export class PermissionsBase{
    constructor(public _array: string[]){
        
    }
    get array(){
        return this._array || []
    }
    has = (value: string): boolean => {
        return this.array.includes(value)
    }
}

export class UserPermissions extends BaseModel<userPermissions_i>{
    workspacesPermissions: {[wid: string] : UserWorkspacePermissions} = {}
    constructor(public user: User){
        super()
    }
    get permissions(){
        return new PermissionsBase(this.responseData.permissions)
        // return this.state === 'loaded' ? this.responseData.permissions : []
    }

    get roles(){
        return new PermissionsBase(this.responseData.roles)
        // return this.state === 'loaded' ? this.responseData.roles : []
    }

    // hasPermission = (value: string): boolean => {
        // return this.permissions.includes(value)
    // }

    // hasRole = (value: string): boolean => {
        // return this.roles.includes(value)
    // }

    getWorkspacePermission = (wid: string) => {
        return this.workspacesPermissions[wid]
    }

    public async load(){
        // const res = await super.load('/api/user/permissions')
        this.state = 'loading'
        this.response = await fetch('/api/user/permissions')
        this.responseData = await this.response.json() as userPermissions_i
        console.log("YO", JSON.stringify(this.responseData.workspaces))
        for(const wid in this.responseData.workspaces){
            const data= this.responseData.workspaces[wid]
            this.workspacesPermissions[wid] = new UserWorkspacePermissions(wid, data)
        }
        this.state = 'loaded'
        return true
    }
}

export class UserWorkspacePermissions{
    constructor(public id: string, public data: permission_i){
        
    }

    get permissions(){
        return new PermissionsBase(this.data.permissions)
    }

    get roles(){
        return new PermissionsBase(this.data.roles)
    }
}

export class WorkspacePermissionsModel extends BaseModel<permission_i>{
    form: WorkspacePermissionsFormModel
    constructor(public user: WorkspaceUserModel, public workspace: Workspace){
        super()
        this.load()
        this.form = new WorkspacePermissionsFormModel(this, workspace)
    }
    get api(){
        return `${this.workspace.api}users/${this.user.id}/permissions`
    }
    public async load(){
        await super.load(this.api)
        this.form.data.permissions = this.responseData.permissions
        this.form.data.roles = this.responseData.roles
        console.log(this.form.data, this.responseData)
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