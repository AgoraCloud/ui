import { BaseFormModel } from 'app/forms/Base';
import { UpdateUserDto } from 'app/forms/validators';
// import { User } from 'app/models';

interface update_user_i {
    fullName: string,
}
export class UpdateUserFormModel extends BaseFormModel<update_user_i, update_user_i>{
    // constructor(user: User) {
    constructor() {
        super(UpdateUserDto)
        this.data = {
            fullName: "",
        }
        // this.fromDB(user.responseData)
    }

    submit = async () => {
        return await super.call('/api/user', {'method': 'PUT'})    
    }

}