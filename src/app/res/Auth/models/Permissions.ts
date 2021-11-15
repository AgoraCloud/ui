import { APIRepo, Model } from '@mars-man/models';
import { PermissionsDialogModel } from 'app/components/dialogs';
import {
  InWorkspaceActions,
  InWorkspaceRole,
  WorkspaceActions,
  WorkspaceRole,
} from 'app/constants';
import {
  AdminPermissionsFormModel,
  BaseAdminPermissionsFormModel,
  WorkspacePermissionsFormModel,
} from 'app/res/Auth';
import { UserModel } from 'app/res/Auth';
import { AdminUserModel, WorkspaceUserModel } from 'app/res/Auth';
import { WorkspaceModel } from 'app/res/Workspaces/models';

interface permission_i {
  id: string;
  roles: string[];
  permissions: string[];
}
interface userPermissions_i extends permission_i {
  workspaces: { [wid: string]: permission_i };
}

export class PermissionsBase {
  constructor(public _array: string[]) {}
  get array() {
    return this._array || [];
  }
  has = (value: string): boolean => {
    return this.array.includes(value);
  };
}

export class PermissionsModel<T extends permission_i> extends Model<T> {}

export class UserPermissions extends PermissionsModel<userPermissions_i> {
  workspacesPermissions: { [wid: string]: UserWorkspacePermissions } = {};
  constructor(public user: UserModel) {
    super({});

    this.repos = {
      main: new APIRepo({
        path: this.api,
      }),
    };
  }

  get api() {
    return `/api/user/permissions`;
  }

  get permissions() {
    return new PermissionsBase(this.data.permissions);
    // return this.state === 'loaded' ? this.responseData.permissions : []
  }

  get roles() {
    return new PermissionsBase(this.data.roles);
    // return this.state === 'loaded' ? this.responseData.roles : []
  }

  getWorkspacePermission = (wid: string) => {
    return this.workspacesPermissions[wid];
  };

  postLoad = async () => {
    for (const wid in this.data.workspaces) {
      const data = this.data.workspaces[wid];
      this.workspacesPermissions[wid] = new UserWorkspacePermissions(wid, data);
    }
  };
}

export class UserWorkspacePermissions {
  /**
   * Every UserModel has one of these
   *
   */
  constructor(public id: string, public data: permission_i) {}

  get permissions() {
    return new PermissionsBase(this.data.permissions);
  }

  get roles() {
    return new PermissionsBase(this.data.roles);
  }
}

export class BaseAdminPermissionsModel extends Model<permission_i> {
  permissionsForm: BaseAdminPermissionsFormModel;
  constructor() {
    super();
  }
  get permissions() {
    return new PermissionsBase(this.data.permissions);
  }

  get roles() {
    return new PermissionsBase(this.data.roles);
  }
}

export class WorkspaceAdminPermissionsModel extends BaseAdminPermissionsModel {
  /**
   * Every WorkspaceUser has one of these classes
   */
  permissionsForm: WorkspacePermissionsFormModel;
  permissionsDialog: PermissionsDialogModel;
  constructor(
    public user: WorkspaceUserModel,
    public workspace: WorkspaceModel,
  ) {
    super();

    this.forms = {
      main: this.permissionsForm,
    };
    this.repos = {
      main: new APIRepo({ path: this.api }),
    };
    this.permissionsForm = new WorkspacePermissionsFormModel(this, workspace);
  }
  get api() {
    return `${this.workspace.api}/users/${this.user.id}/permissions`;
  }
  get permissions() {
    return new PermissionsBase(this.data.permissions);
  }

  get roles() {
    return new PermissionsBase(this.data.roles);
  }
  // postLoad = async () => {
  //     this.permissionsForm.data.permissions = this.data.permissions;
  //     this.permissionsForm.data.roles = this.data.roles;
  // }
}

export class AdminUserPermissionsModel extends BaseAdminPermissionsModel {
  /**
   * Every AdminUser has one of these classes
   */
  permissionsForm: AdminPermissionsFormModel;
  constructor(public user: AdminUserModel) {
    super();

    this.repos = {
      main: new APIRepo({ path: this.api }),
    };
    this.forms = {
      main: this.permissionsForm,
    };
    this.permissionsForm = new AdminPermissionsFormModel(this);
  }
  get api() {
    return `${this.user.api}/permissions`;
  }

  get permissions() {
    return new PermissionsBase(this.data.permissions);
  }

  get roles() {
    return new PermissionsBase(this.data.roles);
  }
}
