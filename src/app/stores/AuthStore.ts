import { RootStore } from 'app/stores/RootStore';
import { makeObservable, observable } from 'mobx';
import {
  SignupFormModel,
  SignInFormModel,
  VerifyAccountFormModel,
  ChangePasswordFormModel,
  ForgotPasswordFormModel,
  UpdateUserFormModel,
} from 'app/res/Auth/forms';
import { UserModel } from 'app/res/Auth';
import { APIRepo, events } from '@mars-man/models';
import { types } from 'app/constants';

export class AuthStore {
  @observable state: 'loading' | 'loggedin' | 'unauthed';

  signupForm: SignupFormModel;
  signinForm: SignInFormModel;
  verifyForm: VerifyAccountFormModel;
  forgotPasswordForm: ForgotPasswordFormModel;
  changePasswordForm: ChangePasswordFormModel;
  user: UserModel;
  logoutRepo: APIRepo<any>;
  constructor(private rootStore: RootStore) {
    this.state = 'unauthed';
    this.signupForm = new SignupFormModel();
    this.signinForm = new SignInFormModel();
    this.verifyForm = new VerifyAccountFormModel();
    this.forgotPasswordForm = new ForgotPasswordFormModel();
    this.changePasswordForm = new ChangePasswordFormModel();

    this.logoutRepo = new APIRepo({
      path: '/api/auth/logout',
      method: 'POST',
    });
    this.user = new UserModel();
    this.loadUser();
    makeObservable(this);
    events.on(types.SIGNIN.onLoad.type, () => {
      this.loadUser();
    });
  }

  loadUser = async () => {
    this.state = 'loading';
    await this.user.load();
    // await this.rootStore.workspacesStore.workspaces.load();
    this.state = this.user.state == 'loaded' ? 'loggedin' : 'unauthed';
  };

  login = async () => {
    await this.signinForm.call();
    if (this.signinForm.submit.state == 'loaded') {
      this.rootStore.routerStore.push('/');
    }
  };

  logout = async () => {
    await this.logoutRepo.call();
    if (this.logoutRepo.state == 'loaded') {
      this.rootStore.routerStore.push('/');
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
