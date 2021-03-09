import { BaseFormModel } from 'app/forms/Base';
import { ForgotPasswordDto } from 'app/forms/validators';

interface forgotPassword_i {
    email: string
}
export class ForgotPasswordFormModel extends BaseFormModel<forgotPassword_i, forgotPassword_i>{
    constructor() {
        super(ForgotPasswordDto)
        this.data = {
            email: ""
        }
    }

    submit = async () => {
        return await super.call('/api/auth/forgot-password')
    }

    reset = () => {
        this.data.email = ""
    }

}