import { RootStore } from './RootStore';
import {
  InWorkspaceActions,
  InWorkspaceRole,
  WorkspaceActions,
  WorkspaceRole,
} from 'app/constants';
import {
  AdminUserDialogModel,
  DialogModel,
  PermissionsDialogModel,
} from 'app/components/dialogs';
import { AdminUsersModel, SignupFormModel } from 'app/res/Auth';
import { Model } from '@mars-man/models';
import { AuditLogs } from 'app/res/AuditLogs';

export class AdminStore extends Model {
  users: AdminUsersModel;
  editUserDialog: AdminUserDialogModel;
  createUserDialog: DialogModel;
  auditLogs: AuditLogs;
  constructor(public rootStore: RootStore) {
    super();
    this.users = new AdminUsersModel();

    this.editUserDialog = new AdminUserDialogModel();
    this.auditLogs = new AuditLogs();
    this.createUserDialog = new DialogModel();
    rootStore.authStore.user.repo?.onLoad.subscribe((val) => {
      this.load();
    });
    this.dependents = [this.users];
    // makeObservable(this)
  }
}

export class WorkspaceAdminStore {
  inviteUserDialog: DialogModel;
  // inviteUserForm: InviteUserFormModel;
  // users: WorkspaceUsersModel;
  // permissionsDialog: PermissionsDialogModel;
  // constructor(public workspace: Workspace) {
  // this.users = new WorkspaceUsersModel(workspace);
  // this.inviteUserDialog = new DialogModel();
  // this.inviteUserForm = new InviteUserFormModel(workspace);
  // this.permissionsDialog = new PermissionsDialogModel(
  // InWorkspaceActions,
  // InWorkspaceRole,
  // );
  // }
}
