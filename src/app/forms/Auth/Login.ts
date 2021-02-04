import { BaseFormModel } from 'app/forms/Base';
import { LoginUserDto } from 'app/forms/validators';

interface login_i {
    email: string
    password: string
}
export class LoginFormModel extends BaseFormModel<login_i, login_i>{
    constructor() {
        super(LoginUserDto)
        this.data = {
            email: "",
            password: ""
        }
    }

    submit = async () => {
        return await super.submit('/api/auth/login')
    }
}
