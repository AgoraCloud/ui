import { BaseFormModel } from 'app/forms/Base';
import { ConfirmDeleteValidator } from 'app/forms/validators';
import { observable } from 'mobx';

interface create_workspace_i {
    name: string
}
export class ConfirmDelete extends BaseFormModel<create_workspace_i, create_workspace_i>{
    @observable open: boolean
    constructor(public _name: string, public callBack: ()=>any) {
        super(ConfirmDeleteValidator)
        this.data = {
            name: "",
        }
        this.open = true
    }
    
    get name(){
        return this._name
    }

    get valid(){
        return this.data.name === this.name
    }


    submit = async () => {
        if(this.valid){
            await this.callBack()
            this.open = false
        }
    }

    closeDialog = () => {
        this.open = false
    }

    reset = () => {
        this.data.name = ""
    }
}