import { RootStore } from "./RootStore";
import { UsersModel } from "app/models";
import { PermissionsDialogModel, UserDialogModel, DialogModel } from "app/models/Dialog";
import { SignupFormModel } from "app/forms";

export class AdminStore{



    
    users: UsersModel
    permissionsDialog: PermissionsDialogModel
    editUserDialog: UserDialogModel
    createUserDialog: DialogModel
    createUserForm: SignupFormModel
    constructor(public rootStore: RootStore){
        console.log("# ADMIN STORE INIT")
        this.users = new UsersModel()
        this.permissionsDialog = new PermissionsDialogModel()
        this.editUserDialog = new UserDialogModel()
        this.createUserDialog = new DialogModel()
        this.createUserForm = new SignupFormModel()
    }
}