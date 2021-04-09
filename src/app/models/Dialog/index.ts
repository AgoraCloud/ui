import { UserModel } from "app/models"
import { observable } from "mobx"

export class DialogModel{
    
    @observable open: boolean
    constructor(open?: boolean){
        this.open = open || false
    }
    onOpen = () => {
        this.open = true
    }
    onClose = () => {
        this.open = false
    }
}

export class UserDialogModel extends DialogModel{
    @observable user: UserModel
    constructor(){
        super()
    }

    setUserAndOpen(user: UserModel){
        this.user = user
        this.onOpen()
    }
}

export class PermissionsDialogModel extends UserDialogModel{
    constructor(public permissions: string[], public roles: string[]){
        super()
    }
}