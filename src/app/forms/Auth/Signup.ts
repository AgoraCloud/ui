import { BaseFormModel } from 'app/forms/Base';
import { CreateUserDto } from 'app/forms/validators';

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

    submit = async () => {
        return await super.submit('/api/auth/register')
    }
}
