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
     * logged in user
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
    /**
     * collection of users
     */
    constructor(){
        super(UserModel)
        this.load()
    }
    
    public async load() {
        await super.load('/api/users')
        console.log(this.response, this.responseData)
    }


    get users(){
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

     get email(){
         return this.data.email
     }
     get fullName(){
         return this.data.fullName
     }
     get isEnabled(){
         return this.data.isEnabled
     }
     get isVerified(){
         return this.data.isVerified
     }
}