import { RootStore } from 'app/stores/RootStore';
import { observable } from 'mobx';
import { SignupFormModel, LoginFormModel, VerifyAccountFormModel } from 'app/forms';

export class AuthStore {
  @observable state: "loading" | "loggedin" | "unauthed";
  @observable serverResponse: Response;

  @observable signupForm: SignupFormModel
  @observable loginForm: LoginFormModel
  @observable verifyForm: VerifyAccountFormModel

  constructor(private rootStore: RootStore) {
    this.state = 'unauthed'
    this.signupForm = new SignupFormModel()
    this.loginForm = new LoginFormModel()
    this.verifyForm = new VerifyAccountFormModel()

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

  login = async () => {
    const successful = this.loginForm.submit()
    if (successful) {
      this.loadUser()
    }
  }

  signup = async () => {
    const successful = await this.signupForm.submit()
    if (successful) {
      this.loadUser()
    }
  }

  verify = async () => {
    return await this.verifyForm.submit()
  }
}
