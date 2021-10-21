import { APIRepo, FormModel, Model } from '@mars-man/models';
import { AdminUserModel } from 'app/res/Auth';

interface adminUpdateUser_i {
  fullName: string;
  password: string;
}

export class AdminUpdateUserFormModel extends FormModel<adminUpdateUser_i> {
  constructor(public user: AdminUserModel) {
    super({
      data: {
        fullName: user.fullName,
        password: '',
      },
      submit: new APIRepo({
        path: user.api,
        method: 'PUT',
      }),
    });
  }
}
