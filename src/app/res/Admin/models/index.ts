import { APIRepo, CollectionModel, Model } from '@mars-man/models';
import { WorkspaceModel } from 'app/res/Workspaces/models';
import { WorkspaceUsersModel } from './Users';

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
  workspaceUsers: WorkspaceUsersModel;
  constructor(public workspace: WorkspaceModel) {
    super({});

    this.workspaceUsers = new WorkspaceUsersModel(this.workspace, this);
  }
}
