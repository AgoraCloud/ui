import { BaseFormModel } from '../Base';
import { UserPermissionsModel, WorkspacePermissionsModel } from 'app/models/User/Permission';
import { Workspace } from 'app/models';

export class PermissionsFormModel extends BaseFormModel<any, any>{
    constructor(public permissions: UserPermissionsModel){
        super(undefined)
        this.data = {
            roles: [],
            permissions: []
        }
    }


    hasPermission = (value): boolean => {
        return this.data.permissions.includes(value)
    }
    hasRole = (value): boolean => {
        // console.log(value)
        return this.data.roles.includes(value)
    }
    onSelectPermission(value){
        return (e) => {
            let permissions = this.data.permissions
            if(e.target.checked) permissions.push(value)
            else permissions = permissions.filter((v)=>v!==value)
            // console.log()
            this.onChange('permissions')(permissions)
        }
    }
    onSelectRole(value){
        return (e) => {
            // let roles = this.data.roles
            // if(e.target.checked) roles.push(value)
            // else roles = roles.filter((v)=>v!==value)
            // console.log()
            // this.onChange('roles')(roles)
            this.onChange('roles')([value])
        }
    }

    submit = async () => {
        return await this.call(`/api/users/${this.permissions.user.id}/permissions`, {method: 'PUT'})
    }
}


export class WorkspacePermissionsFormModel  extends BaseFormModel<any, any>{
    constructor(public permissions: WorkspacePermissionsModel, workspace: Workspace){
        super(undefined)
        this.data = {
            roles: [],
            permissions: []
        }
    }


    hasPermission = (value): boolean => {
        return this.data.permissions.includes(value)
    }
    hasRole = (value): boolean => {
        // console.log(value)
        return this.data.roles.includes(value)
    }
    onSelectPermission(value){
        return (e) => {
            let permissions = this.data.permissions
            if(e.target.checked) permissions.push(value)
            else permissions = permissions.filter((v)=>v!==value)
            // console.log()
            this.onChange('permissions')(permissions)
        }
    }
    onSelectRole(value){
        return (e) => {
            // let roles = this.data.roles
            // if(e.target.checked) roles.push(value)
            // else roles = roles.filter((v)=>v!==value)
            // console.log()
            // this.onChange('roles')(roles)
            this.onChange('roles')([value])
        }
    }

    submit = async () => {
        return await this.call(`${this.permissions.api}`, {method: 'PUT'})
    }
}