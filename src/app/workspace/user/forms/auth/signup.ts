import { BaseFormModel } from 'app/forms/base';
import { CreateUserDto } from 'app/forms/validators';

interface signup_i {
  fullName: string;
  email: string;
  password: string;
}
export class SignupFormModel extends BaseFormModel<signup_i, signup_i> {
  constructor() {
    super(CreateUserDto);
    this.data = {
      fullName: '',
      email: '',
      password: '',
    };
  }

  submit = async () => {
    return await super.call('/api/auth/register');
  };

  reset = () => {
    this.data.fullName = '';
    this.data.email = '';
    this.data.password = '';
  };
}
