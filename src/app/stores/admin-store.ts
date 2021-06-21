import { RootStore } from './root-store';
import { UsersModel, WorkspaceUsersModel } from 'app/workspace/user/models';
import { Workspace } from 'app/workspace';
import {
  PermissionsDialogModel,
  UserDialogModel,
  DialogModel,
} from 'app/workspace/user/models/dialog';
import { SignupFormModel } from 'app/workspace/user/forms/auth';
import {
  InWorkspaceActions,
  InWorkspaceRole,
  WorkspaceActions,
  WorkspaceRole,
} from 'app/constants';
import { InviteUserFormModel } from 'app/workspace/user/forms/invite-user';

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
