import { APIRepo, Model } from '@mars-man/models';
import {
  AdminDeleteUserFormModel,
  AdminUpdateUserFormModel,
  UserPermissionsModel,
} from 'app/res/Admin';
import {
  BaseAdminPermissionsFormModel,
  AdminPermissionsFormModel,
  WorkspacePermissionsFormModel,
  UserPermissions,
  WorkspaceAdminPermissionsModel,
  BaseAdminPermissionsModel,
  AdminUserPermissionsModel,
  UpdateUserFormModel,
  SignupFormModel,
} from 'app/res/Auth';
import { CollectionModel } from '@mars-man/models';
import { WorkspaceModel } from 'app/res/Workspaces/models';
import { WorkspaceAdminModel } from 'app/res/Workspaces/Admin';
import { InviteWorkspaceUserFormModel } from 'app/res/Workspaces/Admin';
import { add, reload, remove, update } from 'app/constants/helpers';
import { types } from 'app/constants';

export interface user_i {
  id: string;
  email: string;
  fullName: string;
}

export class BaseUserModel<T extends user_i> extends Model<T> {
  get fullName() {
    return this.data.fullName;
  }
  get id() {
    return this.data.id;
  }
  get email() {
    return this.data.email;
  }
}

export class BaseAdminUserModel<T extends user_i> extends BaseUserModel<T> {
  permissions: BaseAdminPermissionsModel;
}

export class UserModel extends BaseUserModel<user_i> {
  permissions: UserPermissions;
  updateUserForm: UpdateUserFormModel;

  constructor() {
    super();

    this.repos = {
      main: new APIRepo({ path: this.api, events: types.USERLOAD }),
    };

    this.permissions = new UserPermissions(this);

    this.dependents = [this.permissions];
    this.updateUserForm = new UpdateUserFormModel(this);
  }

  get api() {
    return '/api/user';
  }
}

/**
 * SUPER ADMIN USERS
 */

export class AdminUsersModel extends CollectionModel {
  createUserForm: SignupFormModel;
  /**
   * collection of users
   */
  constructor() {
    super({
      collections: AdminUserModel,
    });
    //   events.on(eventTypes.USER_CRUD, async () => {
    // this.load();
    //   });
    this.createUserForm = new SignupFormModel();

    this.repos = {
      main: new APIRepo({ path: this.api }),
    };

    add(this, this.createUserForm.submit);
  }

  get api() {
    return '/api/users/';
  }

  get users() {
    return this.collection;
  }
}

interface adminUserModel_i extends user_i {
  // id: string;
  // email: string;
  // fullName: string;
  isEnabled: boolean;
  isVerified: boolean;
}
export class AdminUserModel extends BaseAdminUserModel<adminUserModel_i> {
  /**
   * user as seen by admin
   */

  updateUserForm: AdminUpdateUserFormModel;
  deleteUserForm: AdminDeleteUserFormModel;
  users: AdminUsersModel;
  disable: APIRepo;
  enable: APIRepo;
  verify: APIRepo;
  unverify: APIRepo;
  delete: APIRepo;
  resetPassword: APIRepo<adminUserModel_i, unknown>;
  constructor({ parent, data, parentCollection }) {
    super({ parent, data, parentCollection });
    this.users = parent;
    this.updateUserForm = new AdminUpdateUserFormModel(this);
    this.permissions = new AdminUserPermissionsModel(this);

    // this.deleteUserForm = new AdminDeleteUserFormModel(this);
    // this.permissions = new UserPermissionsModel(this);
    this.disable = new APIRepo<adminUserModel_i>({
      path: this.api,
      method: 'PUT',
      body: { isEnabled: false },
    });
    this.enable = new APIRepo<adminUserModel_i>({
      path: this.api,
      method: 'PUT',
      body: { isEnabled: true },
    });
    this.verify = new APIRepo<adminUserModel_i>({
      path: this.api,
      method: 'PUT',
      body: { isVerified: true },
    });
    this.unverify = new APIRepo<adminUserModel_i>({
      path: this.api,
      method: 'PUT',
      body: { isVerified: false },
    });
    this.resetPassword = new APIRepo<adminUserModel_i>({
      path: '/api/auth/forgot-password',
      method: 'POST',
      body: { email: this.email },
    });

    this.delete = new APIRepo({
      path: this.api,
      method: 'DELETE',
    });

    update(this, [
      this.disable,
      this.enable,
      this.verify,
      this.unverify,
      this.updateUserForm.submit,
    ]);

    remove(this, this.delete);

    this.dependents = [this.permissions];
    // this.repos = {
    //   main: new APIRepo({
    //     path: this.api
    //   })
    // }
  }

  get email() {
    return this.data.email;
  }
  get fullName() {
    return this.data.fullName;
  }
  get isEnabled() {
    return this.data.isEnabled;
  }
  get isVerified() {
    return this.data.isVerified;
  }

  get id() {
    return this.data.id;
  }

  get api() {
    return `/api/users/${this.data.id}`;
  }

  onFlipDisable = async () => {
    if (this.isEnabled) this.disable.call();
    else this.enable.call();
  };

  onFlipVerify = async () => {
    if (this.isVerified) this.unverify.call();
    else this.verify.call();
  };

  onDelete = async () => {
    // rootStore.uiStore.setDeleteTarget(
    //     this.fullName,
    //     this.deleteUserForm.delete,
    // );
    await this.delete.call();
  };

  onResetPassword = async () => {
    /**
     * calls forgot-password with the user email, giving them an email to reset their password
     */
    await this.resetPassword.call();
  };
}

/**
 * WORKSPACE USERS
 */
export class WorkspaceUsersModel extends CollectionModel {
  /**
   * Collection of workspace users
   */

  forms = {
    invite: new InviteWorkspaceUserFormModel(),
  };
  constructor(
    public workspace: WorkspaceModel,
    public workspaceAdmin: WorkspaceAdminModel,
  ) {
    super({
      collections: { main: { key: 'users', model: WorkspaceUserModel } },
    });
    this.repos = {
      main: new APIRepo({ path: this.api }),
    };
  }

  get api() {
    return `${this.workspace.api}/users`;
  }
}
export class WorkspaceUserModel extends BaseAdminUserModel<user_i> {
  /**
   * A single workspace users
   */
  workspaceUsers: WorkspaceUsersModel;
  workspace: WorkspaceModel;
  constructor({ data, parent }) {
    super({ data });
    this.workspaceUsers = parent;
    this.workspace = this.workspaceUsers.workspace;
    this.permissions = new WorkspaceAdminPermissionsModel(this, this.workspace);
    this.repos = {
      remove: new APIRepo({ path: this.api }),
    };
    this.dependents = [this.permissions];
  }

  get id() {
    return this.data.id;
  }
  get api() {
    return `${this.workspaceUsers.api}/${this.id}`;
  }
}
