import { BaseFormModel } from 'app/forms/Base';

interface verify_i {
    token: string
}
export class VerifyAccountFormModel extends BaseFormModel<verify_i, verify_i>{
    constructor() {
        super(undefined)
        this.data = {
            token: ""
        }
    }

    submit = async () => {
        return await super.call('/api/auth/verify-account')
    }
}