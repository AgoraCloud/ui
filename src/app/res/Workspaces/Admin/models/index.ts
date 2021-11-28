import { Model } from '@mars-man/models';
import { WorkspaceModel } from 'app/res/Workspaces/models';
import { WorkspaceUsersModel } from 'app/res/Auth';
import { DialogModel, PermissionsDialogModel } from 'app/components/dialogs';
import { reload, update } from 'app/constants/helpers';
import { InviteWorkspaceUserFormModel } from 'app/res/Workspaces/Admin';
import { WorkspaceAuditLogs } from 'app/res/AuditLogs';

/*
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
*/

export class WorkspaceAdminModel extends Model {
  /**
   * All components of the workspace admin dashboard
   */
  users: WorkspaceUsersModel;
  permissionsDialog: PermissionsDialogModel;
  inviteUserDialog: DialogModel;
  inviteUserForm: InviteWorkspaceUserFormModel;
  auditLogs: WorkspaceAuditLogs;
  constructor(public workspace: WorkspaceModel) {
    super({});

    this.inviteUserDialog = new DialogModel();
    this.inviteUserForm = new InviteWorkspaceUserFormModel(workspace);
    this.users = new WorkspaceUsersModel(this.workspace, this);
    this.auditLogs = new WorkspaceAuditLogs(this.workspace);
    this.dependents = [this.users];

    // add(this.users, this.inviteUserForm.submit)
    // cannot use update because it returns the following object
    // {users: [{id: <UID>}, {id: <UID>}]}
    // instead of full user objects
    reload(this.users, [this.inviteUserForm.submit]);
  }
}
