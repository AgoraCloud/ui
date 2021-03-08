import { BaseFormModel } from 'app/forms/Base';
import { UpdateUserDto } from 'app/forms/validators';

interface update_user_i {
    fullName: string,
}
export class UpdateUserFormModel extends BaseFormModel<update_user_i, update_user_i>{
    constructor() {
        super(UpdateUserDto)
        this.data = {
            fullName: "",
        }
    }

    submit = async () => {
        return await super.submit('/api/user', {'method': 'PUT'})    
    }

    reset = () => {
        this.data.fullName = ""
    }
}