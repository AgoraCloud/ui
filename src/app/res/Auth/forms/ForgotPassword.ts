import { ForgotPasswordDto } from '@agoracloud/common';
import { APIRepo, FormModel } from '@mars-man/models';
import { types } from 'app/constants';

interface forgotPassword_i {
  email: string;
}
export class ForgotPasswordFormModel extends FormModel<forgotPassword_i> {
  constructor() {
    super({
      data: { email: '' },
      validator: ForgotPasswordDto,
      submit: new APIRepo({
        path: '/api/auth/forgot-password',
        method: 'POST',
        events: types.PASSWORD_RESET,
      }),
    });
  }
  reset = () => {
    this.data = {
      email: '',
    };
  };
}
