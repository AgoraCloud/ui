import { BaseFormModel } from './Base';
import { LoginUserDto, CreateUserDto } from './validators';

interface signup_i {
    fullName: string
    email: string
    password: string
}
export class SignupFormModel extends BaseFormModel<signup_i, signup_i>{
    constructor() {
        super(CreateUserDto)
        this.data = {
            fullName: "",
            email: "",
            password: ""
        }
    }
}

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
}