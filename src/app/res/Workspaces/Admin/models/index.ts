import { APIRepo, CollectionModel, FormModel, Model } from '@mars-man/models';
import { WorkspaceModel } from 'app/res/Workspaces/models';
import { WorkspaceUsersModel } from 'app/res/Auth';
import { DialogModel, PermissionsDialogModel } from 'app/components/dialogs';
import { InWorkspaceActions, InWorkspaceRole } from 'app/constants';
import { AddWorkspaceUserDto } from '@agoracloud/common';

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


export class InviteUserFormModel extends FormModel{
  constructor(workspace: WorkspaceModel){
    super({
      data: {
        email: ''
      },
      validator: AddWorkspaceUserDto,
      submit: new APIRepo({path: `${workspace.api}/users`, method: 'PUT'})
    })
  }
}


export class WorkspaceAdminModel extends Model {
  /**
   * All components of the workspace admin dashboard
   */
  users: WorkspaceUsersModel;
  permissionsDialog: PermissionsDialogModel;
  inviteUserDialog: DialogModel
  inviteUserForm: InviteUserFormModel
  constructor(public workspace: WorkspaceModel) {
    super({});

    this.inviteUserDialog = new DialogModel();
    this.inviteUserForm = new InviteUserFormModel(workspace);
    this.users = new WorkspaceUsersModel(this.workspace, this);
    this.dependents = [
      this.users
    ]
  }
}
