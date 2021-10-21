import { UpdateUserDto } from '@agoracloud/common';
import { APIRepo, FormModel } from '@mars-man/models';
import { eventTypes } from 'app/constants';
import { UserModel } from 'app/res/Auth';

interface signup_i {
  fullName: string;
}

export class UpdateUserFormModel extends FormModel<signup_i> {
  constructor(user: UserModel) {
    super({
      repo: user.repo,
      validator: UpdateUserDto,
      submit: new APIRepo({
        path: '/api/user',
        method: 'PUT',
        events: {
          onLoad: eventTypes.USER_CRUD,
          onError: eventTypes.USER_ERR,
        },
      }),
    });
  }
}
