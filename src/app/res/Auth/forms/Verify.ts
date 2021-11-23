import { VerifyAccountDto } from '@agoracloud/common';
import { APIRepo, FormModel } from '@mars-man/models';
import { types } from 'app/constants';

interface verify_i {
  token: string;
}
export class VerifyAccountFormModel extends FormModel<verify_i> {
  constructor() {
    super({
      data: {
        token: '',
      },
      validator: VerifyAccountDto,
      submit: new APIRepo({
        path: '/api/auth/verify-account',
        method: 'POST',
        events: types.VERIFY,
      }),
    });
  }
  reset = () => {
    this.data.token = '';
  };
}
