import { RootStore } from 'app/stores/RootStore';
import { observable } from 'mobx';
import { SignupFormModel, LoginFormModel, VerifyAccountFormModel, ChangePasswordFormModel, ForgotPasswordFormModel } from 'app/forms';

export class AuthStore {
  @observable state: "loading" | "loggedin" | "unauthed";

  @observable signupForm: SignupFormModel
  @observable loginForm: LoginFormModel
  @observable verifyForm: VerifyAccountFormModel
  @observable forgotPasswordForm: ForgotPasswordFormModel
  @observable changePasswordForm: ChangePasswordFormModel

   constructor(private rootStore: RootStore) {
      this.state = 'unauthed'
      this.signupForm = new SignupFormModel()
      this.loginForm = new LoginFormModel()
      this.verifyForm = new VerifyAccountFormModel()
      this.forgotPasswordForm = new ForgotPasswordFormModel()
      this.changePasswordForm = new ChangePasswordFormModel()

      this.loadUser()
   }

   loadUser = async () => {
      this.state = 'loading'

      try {
         const response = await fetch('/api/user', {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json'
            },
         })
         const userDoc = await response.json()
         // console.log("userdoc", userDoc, response.status)

         switch (response.status) {
            case 401: {
               this.state = 'unauthed'
               break;
            }
            case 200: {
               this.state = 'loggedin'
               this.rootStore.workspacesStore.load()
               break;
            }
            default: {
               this.state = 'unauthed'
               break;
            }
         }
      } catch (e) {
         this.state = 'unauthed'
      }
  };


   login = async (e) => {
      const form = this.loginForm
      const successful = await form.submit()
      if (successful) {
         this.rootStore.snackbarStore.push({
            message: 'Successfully Logged In!',
            variant: 'success'
         })
         this.loadUser()
      } else {
         this.rootStore.snackbarStore.push({
            message: 'Failed to Login: ' + form.message,
            variant: 'error'
         })
         form.reset()
      }
   }

   signup = async () => {
      const signupform = this.signupForm
      const successful = await this.signupForm.submit()
      if (successful) {
         this.rootStore.snackbarStore.push({
            message: 'Registered! Please check your email to verify your account.',
            variant: 'success'
         })
      }else{
         this.rootStore.snackbarStore.push({
            message: 'Failed to Signup: ' + this.signupForm.message,
            variant: 'error'
         })
      }
      signupform.reset()
   }

   forgotPassword = async () => {
      const forgotPasswordForm = this.forgotPasswordForm
      const successful = await this.forgotPasswordForm.submit()
      if(successful){
          this.rootStore.snackbarStore.push({
              message: 'Success: Please check your email to reset your password!',
              variant: 'success'
          })
          
      }else{
          this.rootStore.snackbarStore.push({
              message: 'Failure: ' + this.forgotPasswordForm.message,
              variant: 'error'
          })
      }
      forgotPasswordForm.reset()
    }

   verify = async () => {
      return await this.verifyForm.submit()
   }

   changePassword = async () => {
      const successful = await this.changePasswordForm.submit()
      if (successful) {
         this.rootStore.snackbarStore.push({
            message: 'Successfully Changed Password In!',
            variant: 'success'
         })
         this.loadUser()
      } else {
         this.rootStore.snackbarStore.push({
            message: 'Failed to Change Password: ' + this.changePasswordForm.message,
            variant: 'error'
         })
      }
   }
}
