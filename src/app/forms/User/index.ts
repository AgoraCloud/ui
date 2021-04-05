import { BaseFormModel } from 'app/forms/Base';
import { UpdateUserDto, AdminUpdateUserDto } from 'app/forms/validators';
import { UserModel } from 'app/models';
import { events, eventTypes } from 'app/constants';
// import { User } from 'app/models';

interface updateUser_i {
    fullName: string,
}
export class UpdateUserFormModel extends BaseFormModel<updateUser_i, updateUser_i>{
    // constructor(user: User) {
    constructor() {
        super(UpdateUserDto)
        this.data = {
            fullName: "",
        }
        // this.fromDB(user.responseData)
    }

    submit = async () => {
        return await super.call('/api/user', { 'method': 'PUT' })
    }

}


interface adminUpdateUser_i {
    fullName?: string
    password?: string
    isEnabled?: boolean
    isVerified?: boolean
}

export class AdminDeleteUserFormModel extends BaseFormModel<null, null>{
    constructor(public user: UserModel) {
        super(undefined)
    }

    delete = async () => {
        try {
            await this.submit()
            events.emit(eventTypes.USER_CRUD, 'deleted')
        } catch (e) {
            events.emit(eventTypes.USER_ERR, 'error')
        }
    }

    submit = async () => {
        return await super.call(`/api/users/${this.user.id}`, { 'method': 'DELETE' })
    }

}

export class AdminUpdateUserFormModel extends BaseFormModel<adminUpdateUser_i, adminUpdateUser_i>{
    constructor(public user: UserModel) {
        super(AdminUpdateUserDto)
        this.data = {
            fullName: user.fullName
        }
    }


    disable = async () => {
        try {
            this.data = {isEnabled: false}
            await this.submit()
            events.emit(eventTypes.USER_CRUD, 'disabled')
        } catch (e) {
            events.emit(eventTypes.USER_ERR, 'error')
        }
    }
    enable = async () => {
        try {
            this.data = {isEnabled: true}
            await this.submit()
            events.emit(eventTypes.USER_CRUD, 'enabled')
        } catch (e) {
            events.emit(eventTypes.USER_ERR, 'error')
        }
    }

    unverify = async () => {
        try {
            this.data = {isVerified: false}
            await this.submit()
            events.emit(eventTypes.USER_CRUD, 'enabled')
        } catch (e) {
            events.emit(eventTypes.USER_ERR, 'error')
        }
    }

    verify = async () => {
        try {
            this.data = {isVerified: true}

            await this.submit()
            events.emit(eventTypes.USER_CRUD, 'enabled')
        } catch (e) {
            events.emit(eventTypes.USER_ERR, 'error')
        }
    }

    submit = async () => {
        return await super.call(`/api/users/${this.user.id}`, { 'method': 'PUT' })
    }

}