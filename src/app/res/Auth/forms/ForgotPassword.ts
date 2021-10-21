import { ForgotPasswordDto } from '@agoracloud/common';
import { APIRepo, FormModel } from '@mars-man/models';

interface forgotPassword_i {
  email: string;
}
export class ForgotPasswordFormModel extends FormModel<forgotPassword_i> {
  constructor() {
    super({ 
      data: { email: '' }, 
      validator: ForgotPasswordDto,
      submit: new APIRepo({path: '/api/auth/forgot-password', method: 'POST'})
    });
  }
}
