import { RootStore } from './root-store';
import { Workspace } from 'app/workspace/model';
import {
  PermissionsDialogModel,
  UserDialogModel,
  DialogModel,
  UsersModel,
  WorkspaceUsersModel
} from 'app/workspace/user/models';
import { SignupFormModel, InviteUserFormModel } from 'app/workspace/user/forms';
import {
  InWorkspaceActions,
  InWorkspaceRole,
  WorkspaceActions,
  WorkspaceRole,
} from 'app/constants';

export class AdminStore {
  users: UsersModel;
  permissionsDialog: PermissionsDialogModel;
  editUserDialog: UserDialogModel;
  createUserDialog: DialogModel;
  createUserForm: SignupFormModel;
  constructor(public rootStore: RootStore) {
    this.users = new UsersModel();
    this.permissionsDialog = new PermissionsDialogModel(
      WorkspaceActions,
      WorkspaceRole,
    );
    this.editUserDialog = new UserDialogModel();
    this.createUserDialog = new DialogModel();
    this.createUserForm = new SignupFormModel();
  }
}

export class WorkspaceAdminStore {
  inviteUserDialog: DialogModel;
  inviteUserForm: InviteUserFormModel;
  users: WorkspaceUsersModel;
  permissionsDialog: PermissionsDialogModel;
  constructor(public workspace: Workspace) {
    this.users = new WorkspaceUsersModel(workspace);
    this.inviteUserDialog = new DialogModel();
    this.inviteUserForm = new InviteUserFormModel(workspace);
    this.permissionsDialog = new PermissionsDialogModel(
      InWorkspaceActions,
      InWorkspaceRole,
    );
  }
}
