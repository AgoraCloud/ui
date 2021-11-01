import {
  extendObservable,
  isBoxedObservable,
  isObservable,
  observable,
} from 'mobx';
import { FormModel } from '@mars-man/models';
import { ConfirmDeleteValidator } from 'app/constants/validators';

interface confirmDelete_i {
  name: string;
}

export class DialogModel {
  @observable
  open = false;
  constructor(open?: boolean) {
    this.open = open || false;
    extendObservable(this, { open: false });
  }
  onOpen = () => {
    this.open = true;
    console.log('OPEN', this);
  };
  onClose = () => {
    this.open = false;
  };
}

export class ConfirmDeleteModel extends FormModel<confirmDelete_i> {
  dialog: DialogModel;
  public callBack: () => any;
  public name: string;
  constructor() {
    super({ validator: ConfirmDeleteValidator, data: { name: '' } });
    this.dialog = new DialogModel();
  }

  get valid() {
    return this.data.name === this.name;
  }

  setTarget = (name, callBack) => {
    this.name = name;
    this.callBack = callBack;
  };

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

// export class UserDialogModel extends DialogModel {
//   @observable user: UserModel;
//   constructor() {
//     super();
//   }

//   setUserAndOpen(user: UserModel) {
//     this.user = user;
//     this.onOpen();
//   }
// }

// export class PermissionsDialogModel extends UserDialogModel {
//   constructor(public permissions: string[], public roles: string[]) {
//     super();
//   }
// }
