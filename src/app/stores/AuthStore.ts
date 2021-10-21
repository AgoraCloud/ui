import { RootStore } from 'app/stores/RootStore';
import { makeObservable, observable } from 'mobx';
import {
  SignupFormModel,
  SignInFormModel,
  VerifyAccountFormModel,
  ChangePasswordFormModel,
  ForgotPasswordFormModel,
  UpdateUserFormModel
} from 'app/res/Auth/forms';
import { UserModel } from 'app/res/Auth';

export class AuthStore {
  @observable state: 'loading' | 'loggedin' | 'unauthed';

  signupForm: SignupFormModel;
  signinForm: SignInFormModel;
  verifyForm: VerifyAccountFormModel;
  forgotPasswordForm: ForgotPasswordFormModel;
  changePasswordForm: ChangePasswordFormModel;
  user: UserModel
  constructor(private rootStore: RootStore) {
    this.state = 'unauthed';
    this.signupForm = new SignupFormModel();
    this.signinForm = new SignInFormModel();
    this.verifyForm = new VerifyAccountFormModel();
    this.forgotPasswordForm = new ForgotPasswordFormModel();
    this.changePasswordForm = new ChangePasswordFormModel();
    this.user = new UserModel();
    this.loadUser();
    makeObservable(this)

  }

  loadUser = async () => {
    this.state = 'loading';
    await this.user.load()
    // await this.rootStore.workspacesStore.workspaces.load();
    this.state = this.user.state == 'loaded' ? 'loggedin' : 'unauthed'
  };

  login = async () => {
    await this.signinForm.call();
  };

  logout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        this.loadUser();
      }
    } catch (e) {
      console.warn('ERROR', e);
    }
  };

  signup = async () => {
    await this.signupForm.call();
    // form.reset();
  };

  forgotPassword = async () => {
    await this.forgotPasswordForm.call();
    // form.reset();
  };

  verify = async () => {
    await this.verifyForm.call();
  };

  changePassword = async () => {
    await this.changePasswordForm.call();
    // form.reset();
  };
}
