import { BaseFormModel } from 'app/forms/base';
import { LoginUserDto } from 'app/forms/validators';

interface login_i {
  email: string;
  password: string;
}
export class LoginFormModel extends BaseFormModel<login_i, login_i> {
  constructor() {
    super(LoginUserDto);
    this.data = {
      email: '',
      password: '',
    };
  }

  submit = async () => {
    return await super.call('/api/auth/login');
  };

  reset = () => {
    this.data.password = '';
  };
}
