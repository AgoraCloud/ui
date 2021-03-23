import { observable } from "mobx"
import { UpdateUserFormModel } from "app/forms/User"
import { BaseModel, BaseModelItem, BaseModelCollection } from "app/models/Base"
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
     * A user
     */

    updateUserForm: UpdateUserFormModel
    constructor() {
        super()
        this.updateUserForm = new UpdateUserFormModel()
    }
    get fullName() {
        return this.responseData.fullName
    }

    public async load() {
        await super.load('/api/user')
    }

    get fullname() {
        return this.fullName
    }
}


export class UsersModel extends BaseModelCollection<UserModel>{


    public async load() {
        await super.load('/api/users')
    }
}

interface userModel_i extends user_i {
    isEnabled: boolean
    isVerified: boolean
}
export class UserModel extends BaseModelItem<userModel_i>{

}