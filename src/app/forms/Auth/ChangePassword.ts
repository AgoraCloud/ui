import { BaseFormModel } from 'app/forms/Base';
import { ChangePasswordDto } from 'app/forms/validators';

interface changePassword_i {
    token: string
    password: string
}
interface changePasswordForm_i{
    token: string
    password: string
    confirmPassword: string
}
export class ChangePasswordFormModel extends BaseFormModel<changePasswordForm_i, changePassword_i>{
    constructor() {
        super(ChangePasswordDto)
        this.data = {
            token: "",
            password: "",
            confirmPassword: ""
        }
    }
    toDB = () => {
        const {password, confirmPassword, token} = this.data
        return {
            password,
            confirmPassword,
            token
        }
    }
    submit = async () => {
        return await super.submit('/api/auth/change-password')
    }
}
