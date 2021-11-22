import { ChangePasswordDto } from '@agoracloud/common';
import { APIRepo, FormModel } from '@mars-man/models';

interface changePassword_i {
  token: string;
  password: string;
  confirmPassword: string;
}
export class ChangePasswordFormModel extends FormModel<changePassword_i> {
  constructor() {
    super({
      data: {
        token: '',
        password: '',
        confirmPassword: '',
      },
      validator: ChangePasswordDto,
      submit: new APIRepo({
        path: '/api/auth/change-password',
        method: 'POST',
      }),
    });
  }

  reset = () => {
    this.data = {
      password: '',
      confirmPassword: '',
    };
  };

  get payload() {
    return {
      password: this.data.password,
      token: this.data.token,
    };
  }
}
