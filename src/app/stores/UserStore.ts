import { RootStore } from 'app/stores/RootStore';
import { observable } from 'mobx';
import { User } from 'app/models';
import { UpdateUserFormModel } from 'app/forms/User';

export class UserStore {


   @observable user: User
   @observable updateUserForm: UpdateUserFormModel
   @observable state: 'loading' | 'loaded' | 'unloaded'


   constructor(private rootStore: RootStore) {
      this.user = new User()
      this.state = 'unloaded'
      this.updateUserForm = new UpdateUserFormModel()
      //this.load()
   }



   load = async () => {
      this.state = 'loading'
      await this.user.load()
      this.state = 'loaded'
   }

   get userFullName(){
       return this.user.fullname
   }

   
   updateUser = async () => {
      const form = this.updateUserForm
      const successful = await form.submit()
      if (successful) {
         this.rootStore.snackbarStore.push({
            message: 'Success: Information Updated!',
            variant: 'success'
         })
         this.load()
      } else {
         this.rootStore.snackbarStore.push({
            message: 'Failure: ' + form.message,
            variant: 'error'
         })
      }
      return successful
   }

}