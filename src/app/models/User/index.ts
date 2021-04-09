import { observable } from "mobx"
import { UpdateUserFormModel, AdminUpdateUserFormModel, AdminDeleteUserFormModel } from "app/forms/User"
import { BaseModel, BaseModelItem, BaseModelCollection } from "app/models/Base"
import { rootStore } from "app/stores"
import { events, eventTypes } from "app/constants"
import { UserPermissionsModel, WorkspacePermissionsModel, UserPermissions } from "./Permission"
import { Workspace } from "../Workspaces"

// import { BaseModel } from "../Base"

// interface userData_i{
//     id: string
//     fullName: string
//     email: string

// } 

// export class User extends BaseModel<userData_i> {


interface user_i {
    email: string
    fullName: string
    id: string
}

export class User extends BaseModel<user_i>{
    /**
     * logged in user
     */

    updateUserForm: UpdateUserFormModel
    permissions: UserPermissions
    constructor() {
        super()
        this.updateUserForm = new UpdateUserFormModel()
        this.permissions = new UserPermissions(this)
        this.dependents = [this.permissions]
    }
    get fullName() {
        return this.responseData.fullName
    }

    public async load() {
        await super.load('/api/user')
        return true
    }

    get fullname() {
        return this.fullName
    }
}


export class UsersModel extends BaseModelCollection<UserModel>{
    /**
     * collection of users
     */
    constructor() {
        super(UserModel)
        this.load()
        events.on(eventTypes.USER_CRUD, async () => {
            this.load()
        })
    }

    get api() {
        return '/api/users/'
    }

    public async load() {
        await super.load(this.api)
    }

    public async reload() {
        await super.load(this.api)
    }

    get users() {
        return this.collection
    }
}

interface userModel_i extends user_i {
    isEnabled: boolean
    isVerified: boolean
}
export class UserModel extends BaseModelItem<userModel_i>{
    /**
     * user as seen by admin
     */


    updateUserForm: AdminUpdateUserFormModel
    deleteUserForm: AdminDeleteUserFormModel
    permissions: UserPermissionsModel
    constructor(parent: UsersModel, data) {
        super(parent, data)
        this.updateUserForm = new AdminUpdateUserFormModel(this)
        this.deleteUserForm = new AdminDeleteUserFormModel(this)
        this.permissions = new UserPermissionsModel(this)

    }

    get email() {
        return this.data.email
    }
    get fullName() {
        return this.data.fullName
    }
    get isEnabled() {
        return this.data.isEnabled
    }
    get isVerified() {
        return this.data.isVerified
    }


    // get api(){
    // return `${this.parent.api}$`
    // }


    onFlipDisable = async () => {
        if (this.isEnabled) this.updateUserForm.disable()
        else this.updateUserForm.enable()
    }

    onFlipVerify = async () => {
        if (this.isVerified) this.updateUserForm.unverify()
        else this.updateUserForm.verify()
    }

    onDelete = () => {
        rootStore.uiStore.setDeleteTarget(this.fullName, this.deleteUserForm.delete)
    }

    onResetPassword = async () => {
        /**
         * calls forgot-password with the user email, giving them an email to reset their password 
         */
        await fetch('/api/auth/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: this.email }),
        })
    }
}
export class WorkspaceUsersModel extends BaseModelCollection<WorkspaceUserModel>{
    constructor(public workspace: Workspace){
        super(WorkspaceUserModel)
        this.iteratorKey = 'users'
        this.load()
        events.on(`WORKSPACE_USERS_CRUD`, ()=>{
            this.load()
        })
    }

    get api() {
        return `${this.workspace.api}users/`
    }

    get users() {
        return this.collection
    }

    public async load() {
        await super.load(this.api)
    }
}

export class WorkspaceUserModel extends BaseModelItem<user_i>{
    permissions: WorkspacePermissionsModel
    constructor(public parent: WorkspaceUsersModel, data){
        super(parent, data)
        this.permissions = new WorkspacePermissionsModel(this, parent.workspace)
    }
    get email() {
        return this.data.email
    }
    get fullName() {
        return this.data.fullName
    }

    onRemove = async () => {
        const res = await fetch(`${this.parent.api}${this.id}`, {method: 'DELETE'})
        if(res) events.emit(eventTypes.WORKSPACE_USER_CRUD, 'removed')
        else events.emit(eventTypes.WORKSPACE_USER_ERR, 'error removing user')
        return res
    }
}