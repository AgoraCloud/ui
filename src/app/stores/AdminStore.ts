import { RootStore } from "./RootStore";
import { UsersModel, WorkspaceUsersModel, Workspace } from "app/models";
import { PermissionsDialogModel, UserDialogModel, DialogModel } from "app/models/Dialog";
import { SignupFormModel } from "app/forms";
import { InWorkspaceActions, InWorkspaceRole, WorkspaceActions, WorkspaceRole } from "app/constants";
import { InviteUserFormModel } from "app/forms/Workspace/Users";

export class AdminStore{    
    users: UsersModel
    permissionsDialog: PermissionsDialogModel
    editUserDialog: UserDialogModel
    createUserDialog: DialogModel
    createUserForm: SignupFormModel
    constructor(public rootStore: RootStore){
        console.log("# ADMIN STORE INIT")
        this.users = new UsersModel()
        this.permissionsDialog = new PermissionsDialogModel(WorkspaceActions, WorkspaceRole)
        this.editUserDialog = new UserDialogModel()
        this.createUserDialog = new DialogModel()
        this.createUserForm = new SignupFormModel()
    }
}

export class WorkspaceAdminStore{
    inviteUserDialog: DialogModel
    inviteUserForm: InviteUserFormModel
    users: WorkspaceUsersModel
    permissionsDialog: PermissionsDialogModel
    constructor(public workspace: Workspace){
        this.users = new WorkspaceUsersModel(workspace)
        this.inviteUserDialog = new DialogModel()
        this.inviteUserForm = new InviteUserFormModel(workspace)
        this.permissionsDialog = new PermissionsDialogModel(InWorkspaceActions, InWorkspaceRole)
    }
}