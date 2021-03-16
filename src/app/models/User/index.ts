import { observable } from "mobx"
import { UpdateUserFormModel } from "app/forms/User"
// import { BaseModel } from "../Base"

// interface userData_i{
//     id: string
//     fullName: string
//     email: string

// } 

// export class User extends BaseModel<userData_i> {

export class User {
    /**
     * A user
     */

     @observable fullName: String
     @observable state: 'loaded'|'error'|'loading'|'unloaded'
    //  @observable updateUserForm: UpdateUserFormModel
     updateUserForm: UpdateUserFormModel
     constructor(){
        // super()
        this.fullName = ''
        this.state = 'unloaded'
        // this.updateUserForm = new UpdateUserFormModel(this)
        this.updateUserForm = new UpdateUserFormModel()
     }

    //  load = async ( ) => {
    //     await super.load("/api/user")
    // }

    load = async ( ) => {
        this.state = 'loading'
        const response = await fetch('/api/user', {

        })

        const data = await response.json()
        console.log("user", response, data)
        this.fullName = data.fullName
        this.state = 'loaded'
    }



    //  get fullname(){
    //      return this.responseData.fullName
    //  }

     get fullname(){
        return this.fullName
    }
}