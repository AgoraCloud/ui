import { UserModel } from './model';
import { observable } from 'mobx';
import { DialogModel } from 'app/components/dialogs';
/**
 * DEPRICATED FOR app/components/model
 */


export class UserDialogModel extends DialogModel {
  @observable user: UserModel;
  constructor() {
    super();
  }

  setUserAndOpen(user: UserModel) {
    this.user = user;
    this.onOpen();
  }
}

export class PermissionsDialogModel extends UserDialogModel {
  constructor(public permissions: string[], public roles: string[]) {
    super();
  }
}
