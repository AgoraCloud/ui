import { CreateUserDto } from '@agoracloud/common';
import { APIRepo, FormModel } from '@mars-man/models';
import { eventTypes, types } from 'app/constants';

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
        events: types.SIGNUP,
      }),
    });
  }
}

export class CreateUserFormModel extends SignupFormModel {
  constructor() {
    super();
    this.submit = new APIRepo({
      path: '/api/users',
      method: 'POST',
      events: types.SIGNUP,
    });
  }
}
