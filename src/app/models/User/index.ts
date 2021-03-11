import { observable } from "mobx"
import { UpdateUserFormModel } from "app/forms/User"


export class User{
    /**
     * A user
     */
    
     @observable fullName: String
     @observable state: 'loaded'|'error'|'loading'|'unloaded'
     updateUserForm: UpdateUserFormModel
     constructor(){
        this.fullName = ''
        this.state = 'unloaded'
        this.updateUserForm = new UpdateUserFormModel()
     }

     load = async ( ) => {
        this.state = 'loading'
        const response = await fetch('/api/user', {

        })

        const data = await response.json()
        console.log("user", response, data)
        this.fullName = data.fullName
        this.state = 'loaded'
    }

     get fullname(){
         return this.fullName
     }
}