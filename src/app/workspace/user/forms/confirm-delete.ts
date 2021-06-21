import { BaseFormModel } from 'app/forms/base';
import { ConfirmDeleteValidator } from 'app/forms/validators';
import { observable } from 'mobx';
import { DialogModel } from 'app/workspace/user/models/dialog';

interface create_workspace_i {
  name: string;
}
export class ConfirmDelete extends BaseFormModel<
  create_workspace_i,
  create_workspace_i
> {
  @observable open: boolean;
  dialog: DialogModel;
  constructor(public _name: string, public callBack: () => any) {
    super(ConfirmDeleteValidator);
    this.data = {
      name: '',
    };
    this.open = true;
    this.dialog = new DialogModel();
  }

  get name() {
    return this._name;
  }

  get valid() {
    return this.data.name === this.name;
  }

  submit = async () => {
    if (this.valid) {
      await this.callBack();
      this.dialog.onClose();
    }
  };

  reset = () => {
    this.data.name = '';
  };
}
