import { RootStore } from 'app/stores/root-store';
import { observable } from 'mobx';
import {
  SignupFormModel,
  LoginFormModel,
  VerifyAccountFormModel,
  ChangePasswordFormModel,
  ForgotPasswordFormModel,
} from 'app/workspace/user/forms/auth';

export class AuthStore {
  @observable state: 'loading' | 'loggedin' | 'unauthed';

  @observable signupForm: SignupFormModel;
  @observable loginForm: LoginFormModel;
  @observable verifyForm: VerifyAccountFormModel;
  @observable forgotPasswordForm: ForgotPasswordFormModel;
  @observable changePasswordForm: ChangePasswordFormModel;

  constructor(private rootStore: RootStore) {
    this.state = 'unauthed';
    this.signupForm = new SignupFormModel();
    this.loginForm = new LoginFormModel();
    this.verifyForm = new VerifyAccountFormModel();
    this.forgotPasswordForm = new ForgotPasswordFormModel();
    this.changePasswordForm = new ChangePasswordFormModel();

    this.loadUser();
  }

  loadUser = async () => {
    this.state = 'loading';

    try {
      const response = await fetch('/api/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const userDoc = await response.json();

      switch (response.status) {
        case 401: {
          this.state = 'unauthed';
          break;
        }
        case 200: {
          console.log("LOGGED IN")
          this.state = 'loggedin';
          this.rootStore.userStore.load();
          this.rootStore.workspacesStore.load();
          break;
        }
        default: {
          this.state = 'unauthed';
          break;
        }
      }
    } catch (e) {
      this.state = 'unauthed';
    }
  };

  login = async () => {
    const form = this.loginForm;
    const successful = await form.submit();
    if (successful) {
      this.rootStore.snackbarStore.push({
        message: 'Successfully Logged In!',
        variant: 'success',
      });
      this.loadUser();
    } else {
      this.rootStore.snackbarStore.push({
        message: 'Failed to Login: ' + form.message,
        variant: 'error',
      });
      form.reset();
    }
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
    const form = this.signupForm;
    const successful = await form.submit();
    if (successful) {
      this.rootStore.snackbarStore.push({
        message: 'Registered! Please check your email to verify your account.',
        variant: 'success',
      });
    } else {
      this.rootStore.snackbarStore.push({
        message: 'Failed to Signup: ' + form.message,
        variant: 'error',
      });
    }
    form.reset();
  };

  forgotPassword = async () => {
    const form = this.forgotPasswordForm;
    const successful = await form.submit();
    if (successful) {
      this.rootStore.snackbarStore.push({
        message: 'Success: Please check your email to reset your password!',
        variant: 'success',
      });
    } else {
      this.rootStore.snackbarStore.push({
        message: 'Failure: ' + form.message,
        variant: 'error',
      });
    }
    form.reset();
  };

  verify = async () => {
    const form = this.verifyForm;
    return await form.submit();
  };

  changePassword = async () => {
    const form = this.changePasswordForm;
    const successful = await form.submit();
    if (successful) {
      this.rootStore.snackbarStore.push({
        message: 'Successfully Changed Password',
        variant: 'success',
      });
    } else {
      this.rootStore.snackbarStore.push({
        message: 'Failed to Change Password: ' + form.message,
        variant: 'error',
      });
    }
    form.reset();
  };
}
