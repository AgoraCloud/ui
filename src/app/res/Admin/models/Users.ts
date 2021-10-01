import { APIRepo, CollectionModel, Model } from '@mars-man/models';
import { WorkspaceModel } from 'app/res/Workspaces/models';
import { WorkspaceAdminModel } from '.';
import { InviteWorkspaceUserFormModel } from '../forms';

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
      collections: WorkspaceUserModel,
    });
    this.repos = {
      main: new APIRepo({ path: this.api }),
    };
  }

  get api() {
    return `${this.workspace.api}/users`;
  }
}
export class WorkspaceUserModel extends Model {
  /**
   * A single workspace users
   */


  constructor(data, public workspaceUsersModel: WorkspaceUsersModel) {
    super({ data });
    this.repos = {
      remove: new APIRepo({ path: this.api }),
    };
  }

  get id() {
    return this.data.id;
  }
  get api() {
    return `${this.workspaceUsersModel.api}/${this.id}`;
  }
}
