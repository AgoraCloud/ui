import { CreateUserDto } from '@agoracloud/common';
import { APIRepo, FormModel } from '@mars-man/models';
import { eventTypes } from 'app/constants';

interface signup_i {
  fullName: string;
  email: string;
  password: string;
}

export class SignupFormModel extends FormModel<signup_i> {
  constructor() {
    super({
      data: {
        fullName: '',
        email: '',
        password: '',
      },
      validator: CreateUserDto,
      submit: new APIRepo({
        path: '/api/auth/register',
        method: 'POST',
        events: {
          onLoad: eventTypes.SIGNUP,
          onError: eventTypes.SIGNUP_ERR,
        },
      }),
    });
  }
}
