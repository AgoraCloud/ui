import {
  makeObservable,
  observable,
} from 'mobx';
import { FormModel } from '@mars-man/models';
import { ConfirmDeleteValidator } from 'app/constants/validators';
import {
  AdminUserModel,
  BaseAdminUserModel,
  BaseUserModel,
  UserModel,
  user_i,
  WorkspaceUserModel,
} from 'app/res/Auth';
import {
  InWorkspaceActions,
  InWorkspaceRole,
  WorkspaceActions,
  WorkspaceRole,
} from 'app/constants';

interface confirmDelete_i {
  name: string;
}

export class DialogModel {
  @observable
  open: boolean = false;
  constructor(open?: boolean) {
    this.open = open || false;
    makeObservable(this);
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
  @observable
  public name: string;
  constructor() {
    super({ validator: ConfirmDeleteValidator, data: { name: '' } });
    this.dialog = new DialogModel();
    makeObservable(this);
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

export class BaseUserDialogModel<
  T extends BaseUserModel<any>,
> extends DialogModel {
  @observable user: T;
  constructor() {
    super();
    makeObservable(this);
  }

  setUserAndOpen(user: T) {
    this.user = user;
    this.onOpen();
  }
}

export class UserDialogModel extends BaseUserDialogModel<UserModel> {
  constructor() {
    super();
  }
}

export class BaseAdminUserDialogModel extends BaseUserDialogModel<
  BaseAdminUserModel<user_i>
> {}
export class AdminUserDialogModel extends BaseUserDialogModel<AdminUserModel> {}
export class WorkspaceAdminUserDialogModel extends BaseUserDialogModel<WorkspaceUserModel> {}

// export class AdminUserDialogModel extends DialogModel {
//   @observable user: AdminUserModel;
//   constructor() {
//     super();
//   }

//   setUserAndOpen(user: AdminUserModel) {
//     this.user = user;
//     this.onOpen();
//   }
// }

export class PermissionsDialogModel extends BaseAdminUserDialogModel {
  constructor(public permissions: string[], public roles: string[]) {
    super();
  }
}

export const WorkspaceAdminPermissionsDialogModel = new PermissionsDialogModel(
  InWorkspaceActions,
  InWorkspaceRole,
);

export const AdminPermissionsDialogModel = new PermissionsDialogModel(
  WorkspaceActions,
  WorkspaceRole,
);
